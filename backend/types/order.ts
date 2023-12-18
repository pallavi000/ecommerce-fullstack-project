import { z } from "zod";
import { OrderSchema } from "../schemas/orderSchema";
import { OrderBodySchema } from "../schemas/orderBodySchema";
import { ORDER_ADDRESS_TYPE } from "../constants/order";

export type TOrderSchema = z.infer<typeof OrderSchema>;
export type TOrder = TOrderSchema & { _id: string };
export type TOrderBodySchema = z.infer<typeof OrderBodySchema>;
export type TOrderAddressType = typeof ORDER_ADDRESS_TYPE[number];
