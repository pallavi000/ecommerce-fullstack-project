import mongoose from "mongoose";

//types
import { TProductSchema } from "../types/product";

const Schema = mongoose.Schema;

const ProductSchema = new Schema<TProductSchema>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, ref: "Category", required: true },
    stock: { type: Number, required: true },
    size: {
      type: String,
      ref: "Size",
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", ProductSchema);
