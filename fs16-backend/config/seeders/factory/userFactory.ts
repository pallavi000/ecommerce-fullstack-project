import { User } from "../../../models/User";
import { connectMongoDB, disconnectMongoDb } from "../../mongoose";
import { TUserSchema } from "users";
import { generatePasswordHash } from "../../../utils/helpers";
import UserService from "../../../services/userService";
import { Permission } from "../../../models/Permission";

export async function userFactory() {
  // Create a super admin user
  const permissions = await Permission.find();
  const superAdminData: TUserSchema = {
    email: "admin@gmail.com",
    password: await generatePasswordHash("12345678", 10),
    role: "ADMIN",
    firstName: "admin",
    lastName: "admin",
    permission: permissions.map((p) => p._id.toString()),
  };
  // Check if the super admin already exists
  const existingSuperAdmin = await UserService.findByEmail(
    superAdminData.email
  );
  if (!existingSuperAdmin) {
    const superAdmin = new User(superAdminData);
    await superAdmin.save();
    console.log("Super admin created successfully.");
  } else {
    console.log("Super admin already exists.");
  }
}
