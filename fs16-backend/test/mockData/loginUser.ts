import users from "./usersData";
import authService from "../../services/authService";
import { TUserPermission } from "permission";
import UserService from "../../services/userService";

export async function loginUserByPermission(...permissions: TUserPermission[]) {
  const userData = users[0];
  // add dummy permission
  userData.permission = permissions.map((permission) => ({
    _id: "1",
    name: permission,
  }));
  const accessToken = await authService.generateAccessToken(userData);
  return accessToken;
}
