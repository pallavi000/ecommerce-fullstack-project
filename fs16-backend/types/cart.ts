import { z } from "zod";

import { CartQuantityUpdateSchema, CartSchema } from "../schemas/cartSchema";

export type TCartSchema = z.infer<typeof CartSchema>;
export type TCart = TCartSchema & { _id: string };
export type TCartQuantityUpdateSchema = z.infer<
  typeof CartQuantityUpdateSchema
>;
