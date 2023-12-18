import mongoose from "mongoose";

//types
import { TOrderSchema } from "../types/order";

//constant
import { PAYMENT_METHOD, PAYMENT_STATUS } from "../constants/order";

const Schema = mongoose.Schema;

const OrderSchema = new Schema<TOrderSchema>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    payment: {
      method: {
        type: String,
        enum: PAYMENT_METHOD,
      },
      status: {
        type: String,
        enum: PAYMENT_STATUS,
      },
    },
    shipping: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderAddress",
    },
    billing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderAddress",
    },
    total: Number,
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", OrderSchema);
