import { Size } from "../../../models/Size";
import sizesSeedData from "../data/sizesSeedData";

export async function sizeFactory() {
  await Size.insertMany(sizesSeedData);
  console.log("size created successfully.");
}
