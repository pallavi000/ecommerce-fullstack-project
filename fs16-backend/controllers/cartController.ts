import { NextFunction, Request, Response } from "express";

// services
import CartService from "../services/cartService";
import ProductService from "../services/productService";

// error builder
import { ApiError } from "../errors/ApiError";

//type
import { TCartQuantityUpdateSchema, TCartSchema } from "../types/cart";
import { IAuthorizationRequest } from "../types/authorization";

export async function findAllCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cartItems = await CartService.findAll();
    res.json(cartItems);
  } catch (error) {
    ApiError.resourceNotFound("CartItem is empty");
  }
}

export async function findUserCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user } = req as IAuthorizationRequest;
    const cartItems =
      user && (await CartService.findCartItemsByUserId(user._id));
    res.json(cartItems);
  } catch (error) {
    ApiError.resourceNotFound("CartItem is empty");
  }
}

export async function addToCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newCartItemData: TCartSchema = req.body;
    const { user } = req as IAuthorizationRequest;
    // check if product exists
    const product = await ProductService.findById(newCartItemData.product);

    if (!product) {
      return next(ApiError.resourceNotFound("Product not found"));
    }
    // check if product is in stock
    const existingCartItem =
      user &&
      (await CartService.findCartItemByProductIdUserId(
        newCartItemData.product,
        user._id
      ));
    // calculate available stock
    const availableStock = existingCartItem
      ? product.stock - existingCartItem.quantity
      : product.stock;
    if (availableStock <= 0) {
      return next(ApiError.resourceNotFound("Product is out of stock"));
    }
    // update cart quantity if already exist
    if (existingCartItem) {
      const updatedCartItem = await CartService.updateCartQuantity(
        existingCartItem._id,
        existingCartItem.quantity + newCartItemData.quantity,
        (existingCartItem.total += newCartItemData.total)
      );
      return res.json(updatedCartItem);
    }
    // create new
    const newCartItem =
      user && (await CartService.addToCart(user._id, newCartItemData));
    res.status(201).json(newCartItem);
  } catch (error: any) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function updateCartQuantity(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cartId = req.params.cartId;
    const { user } = req as IAuthorizationRequest;
    const { quantity } = req.body as TCartQuantityUpdateSchema;
    // check if cart exists
    const cartItem = await CartService.fineOneByCartIdAndUserId(
      cartId,
      user._id
    );
    if (!cartItem) return next(ApiError.resourceNotFound("Invalid cart id"));
    // check quantity
    if (quantity <= 0) return next(ApiError.badRequest("Invalid action"));
    // check if product has enough stock
    const product = await ProductService.findById(cartItem.product._id);
    if (!product) return next(ApiError.resourceNotFound("Product not found"));
    const availableStock = product.stock - cartItem.quantity;
    if (availableStock <= 0)
      return next(ApiError.resourceNotFound("Product is out of stock"));
    // update quantity
    const total = product.price * quantity;
    const updatedCartItem = await CartService.updateCartQuantity(
      cartId,
      quantity,
      total
    );
    res.json(updatedCartItem);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function deleteFromCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user } = req as IAuthorizationRequest;
    const cartId = req.params.cartId;
    await CartService.deleteCartItemsByUserIdAndItemIds(user._id, [cartId]);
    res.status(204).send();
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}
