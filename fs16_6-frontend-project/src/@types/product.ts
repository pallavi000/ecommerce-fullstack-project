import { TCategory } from "./category";
import { TSize } from "./size";

export type TProduct = {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: TCategory;
  size: TSize;
  image: string;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
};

export interface TProductInputs {
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
  size: string;
}

export type TProductSortingOption =
  | "newest"
  | "price_low_to_high"
  | "price_high_to_low";
