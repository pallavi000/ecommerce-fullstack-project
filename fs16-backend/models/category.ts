import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model("Category", CategorySchema);
