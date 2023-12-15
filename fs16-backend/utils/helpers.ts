import mongoose from "mongoose";
import bcrypt from "bcrypt";

//types
import { TProductSorting } from "../types/product";

//constant
import { PRODUCT_SORTING_OPTIONS } from "../constants/product";

export function isNumber(param: any): boolean {
  return !isNaN(parseFloat(param)) && isFinite(param);
}

export function convertStringToMongooseId(id: string) {
  return new mongoose.Types.ObjectId(id);
}

export async function generatePasswordHash(password: string, saltRound = 10) {
  const salt = await bcrypt.genSalt(saltRound);
  return await bcrypt.hash(password, salt);
}

export function stringToProductSorting(sorting: string): TProductSorting {
  if (sorting === PRODUCT_SORTING_OPTIONS.PRICE_LOW_TO_HIGH) {
    return "price";
  } else if (sorting === PRODUCT_SORTING_OPTIONS.PRICE_HIGH_TO_LOW) {
    return "-price";
  } else {
    return "-_id";
  }
}
