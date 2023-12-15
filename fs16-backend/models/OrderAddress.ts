import mongoose from "mongoose";

//constant
import { ORDER_ADDRESS_TYPE } from "../constants/order";

const Schema = mongoose.Schema;

const OrderAddressSchema = new Schema(
  {
    address: {
      fullname: { type: String },
      country: { type: String },
      city: { type: String },
      street: { type: String },
      phone: { type: String },
      zipCode: { type: String },
    },
    method: { type: String },
    cost: { type: String },
    type: { type: String, enum: ORDER_ADDRESS_TYPE, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export const OrderAddress = mongoose.model("OrderAddress", OrderAddressSchema);
