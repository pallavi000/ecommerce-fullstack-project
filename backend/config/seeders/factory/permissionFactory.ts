import { Permission } from "../../../models/Permission";
import permissionsSeedData from "../data/permissionsSeedData";

export async function permissionFactory() {
  try {
    await Permission.insertMany(permissionsSeedData);
    console.log("Permissions created successfully");
  } catch (error: any) {
    console.log("permission create failed: " + error.message);
  }
}
