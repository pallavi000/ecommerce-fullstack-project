import { Banner } from "../../../models/Banner";
import bannersSeedData from "../data/bannersSeedData";

export async function bannerFactory() {
  await Banner.insertMany(bannersSeedData);
  console.log("banner created successfully.");
}
