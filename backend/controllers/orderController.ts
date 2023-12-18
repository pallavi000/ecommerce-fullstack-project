import { Request, Response, NextFunction } from "express";

//error builder
import { ApiError } from "../errors/ApiError";

//services
import OrderService from "../services/orderService";
import CartService from "../services/cartService";

//type
import { TOrderBodySchema } from "../types/order";
import { IAuthorizationRequest } from "../types/authorization";

//constant
import { PAYMENT_STATUS } from "../constants/order";
import AddressService from "../services/addressService";

//find all order
export async function findAllOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const sort = req.query.sort || "created_at: -1";
  const status = req.query.status as (typeof PAYMENT_STATUS)[number];
  try {
    let orders;
    if (status) {
      // demo api route localhost:8080/api/v1/orders?status=Paid&page=1&limit=10&sort=-1
      orders = await OrderService.filterOrderByStatus(
        Number(limit),
        Number(page),
        sort.toLocaleString(),
        status
      );
    } else {
      orders = await OrderService.findAll(
        Number(limit),
        Number(page),
        sort.toLocaleString()
      );
    }
    res.json(orders);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

//find order by userId
export async function findOrderByUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { user } = req as IAuthorizationRequest;
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const sort = req.query.sort || "-_id";

  try {
    const orders = await OrderService.findByUser(
      user._id,
      Number(limit),
      Number(page),
      sort.toLocaleString()
    );

    res.json(orders);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

//find single order
export async function findOrderById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const orderId = req.params.orderId;
    const order = await OrderService.findById(orderId);
    if (!order) {
      next(ApiError.resourceNotFound("Order not found!."));
      return;
    }
    res.json(order);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

//Post /orders
export async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user } = req as IAuthorizationRequest;
    const orderBody: TOrderBodySchema = req.body;
    const carts = await CartService.findCartItemsByUserIdAndItemIds(
      user._id,
      orderBody.cart
    );
    if (!carts?.length) {
      return next(ApiError.badRequest("Invalid cart ids."));
    }
    const productIds = carts.map((cart) => cart.product._id);

    // shipping
    const shippingAddress = await AddressService.findOne(orderBody.shipping);
    if (!shippingAddress) {
      return next(ApiError.badRequest("Invalid shipping id."));
    }
    // billing
    const billingAddress = await AddressService.findOne(orderBody.billing);
    if (!billingAddress) {
      return next(ApiError.badRequest("Invalid billing id."));
    }
    const shipping = await OrderService.createOrderAddress(
      "shipping",
      shippingAddress.toObject()
    );
    const billing = await OrderService.createOrderAddress(
      "billing",
      billingAddress.toObject()
    );
    orderBody.shipping = String(shipping._id);
    orderBody.billing = String(billing._id);

    // create
    const order = await OrderService.createOne(user._id, productIds, orderBody);
    // delete from cart if order is created
    await CartService.deleteCartItemsByUserIdAndItemIds(
      user._id,
      orderBody.cart
    );
    res.status(201).json(order);
  } catch (error: any) {
    next(ApiError.internal("Internal server error"));
  }
}
