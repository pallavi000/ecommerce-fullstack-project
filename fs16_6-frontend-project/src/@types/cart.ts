import { TProduct } from "./product";
import { TUser } from "./user";

export type TCart = {
  _id: string;
  product: TProduct;
  quantity: number;
  user: TUser;
  total: number;
  createdAt?: string;
  updatedAt?: string;
};

export type TCartInput = {
  product: string;
  quantity: number;
  user: string;
  total: number;
};
