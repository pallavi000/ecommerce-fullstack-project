import { z } from "zod";
import mongoose from "mongoose";
import { PAYMENT_METHOD, PAYMENT_STATUS } from "../constants/order";

export const OrderSchema = z.object({
  user: z.instanceof(mongoose.Schema.Types.ObjectId),
  products: z.array(z.instanceof(mongoose.Schema.Types.ObjectId)),
  shipping: z.instanceof(mongoose.Schema.Types.ObjectId),
  billing: z.instanceof(mongoose.Schema.Types.ObjectId),
  payment: z.object({
    method: z.enum(PAYMENT_METHOD),
    status: z.enum(PAYMENT_STATUS),
  }),
  total: z.number().min(0),
});

export const requestSchema = z.object({
  body: OrderSchema,
});
