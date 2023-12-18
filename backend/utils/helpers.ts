import mongoose from "mongoose";
import bcrypt from "bcrypt";

//types
import { TProductSorting } from "../types/product";

//constant
import { PRODUCT_SORTING_OPTIONS } from "../constants/product";
import { PORT } from "../constants/server";

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

export function generateUniqueFilename(fileType: string = "jpg"): string {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 8);
  return `image_${timestamp}_${randomString}.${fileType}`;
}

export function getFileUploadedPath(filepath: string) {
  return process.env.NODE_ENV === "development"
    ? `http://localhost:${PORT}/${filepath}`
    : `/${filepath}`;
}
