import { z } from "zod";
import { PAYMENT_METHOD, PAYMENT_STATUS } from "../constants/order";

export const OrderBodySchema = z.object({
  cart: z.array(
    z.string({
      required_error: "Cart Ids are required",
    })
  ),
  payment: z.object({
    method: z.enum(PAYMENT_METHOD),
    status: z.enum(PAYMENT_STATUS),
  }),
  shipping: z.string({
    required_error: "shipping id is required",
  }),
  billing: z.string({
    required_error: "billing id is required",
  }),
  total: z.number().min(0),
});
