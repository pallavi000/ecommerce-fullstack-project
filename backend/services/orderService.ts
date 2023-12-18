import mongoose, { Types } from "mongoose";

//model
import { Order } from "../models/Order";
import { OrderProduct } from "../models/OrderProduct";
import { OrderAddress } from "../models/OrderAddress";

//type
import { TOrderAddressType, TOrderBodySchema } from "../types/order";
import { TProduct } from "../types/product";
import { TAddress } from "../types/address";

//constant
import { PAYMENT_STATUS } from "../constants/order";

//find All order
async function findAll(limit: number, page: number, sort: string) {
  return await Order.find()
    .populate({
      path: "user",
      select: {
        firstName: 1,
        lastName: 1,
        email: 1,
        phoneNumber: 1,
      },
    })
    .populate("products")
    .limit(Number(limit))
    .skip(Number(limit) * (page - 1))
    .sort(sort);
}

//find  order by User
async function findByUser(
  userId: string | Types.ObjectId,
  limit: number,
  page: number,
  sort: string
) {
  return await Order.find({ user: userId })
    .populate({
      path: "user",
      select: {
        firstName: 1,
        lastName: 1,
        email: 1,
        phoneNumber: 1,
      },
    })
    .populate("products")
    .limit(Number(limit))
    .skip(Number(limit) * (page - 1))
    .sort(sort);
}

//find by id
async function findById(orderId: string | Types.ObjectId) {
  return await Order.findById(orderId)
    .populate({
      path: "user",
      select: {
        firstName: 1,
        lastName: 1,
        email: 1,
        phoneNumber: 1,
      },
    })
    .populate("products")
    .populate("shipping")
    .populate("billing");
}

async function createOne(
  userId: string | Types.ObjectId,
  products: string[] | Types.ObjectId[],
  orderBody: TOrderBodySchema
) {
  let order = new Order({
    user: userId,
    products: products,
    total: orderBody.total,
    payment: orderBody.payment,
    shipping: orderBody.shipping,
    billing: orderBody.billing,
  });
  order = await order.save();
  return order;
}

async function createOrderAddress(type: TOrderAddressType, address: TAddress) {
  const { _id, user, isDefault, ...addressData } = address;
  const orderAddress = await OrderAddress.create({
    user: user,
    address: addressData,
    type: type,
  });
  return orderAddress;
}

async function filterOrderByStatus(
  limit: number,
  page: number,
  sort: string,
  status: (typeof PAYMENT_STATUS)[number]
) {
  const orders = await Order.find({
    "payment.status": status,
  })
    .populate({
      path: "user",
      select: {
        firstName: 1,
        lastName: 1,
        email: 1,
        phoneNumber: 1,
      },
    })
    .populate("products")
    .limit(Number(limit))
    .skip(Number(limit) * (page - 1))
    .sort(sort);
  return orders;
}

async function createOrderProduct(
  product: TProduct,
  orderId: string | Types.ObjectId,
  userId: string | Types.ObjectId,
  quantity: number
) {
  var orderProduct = new OrderProduct({
    user: userId,
    order: orderId,
    product: product._id,
    name: product.name,
    price: product.price,
    description: product.description,
    image: product.image,
    quantity: quantity,
  });
  await orderProduct.save();
  return orderProduct;
}

export default {
  createOne,
  findAll,
  findByUser,
  findById,
  filterOrderByStatus,
  createOrderProduct,
  createOrderAddress,
};
