import { Category } from "../../../models/Category";
import categoriesSeedData from "../data/categoriesSeedData";

export async function categoryFactory() {
  await Category.insertMany(categoriesSeedData);
  console.log("categories created successfully.");
}
