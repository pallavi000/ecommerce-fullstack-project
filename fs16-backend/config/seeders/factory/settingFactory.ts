import { Setting } from "../../../models/Setting";
import settingsSeedData from "../data/settingsSeedData";

export async function settingFactory() {
  await Setting.create(settingsSeedData);
  console.log("Settings created successfully.");
}
