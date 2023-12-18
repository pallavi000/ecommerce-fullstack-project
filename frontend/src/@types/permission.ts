import { TUser } from "./user";

export type TPermission = {
  _id: string;
  name: string;
  user: TUser;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TPermissionInput = {
  name: string;
  action: string;
  description?: string;
};
export interface IPermissionInputData
  extends Omit<TPermissionInput, "action"> {}

export type TPermissionResource =
  | "USERS"
  | "PRODUCTS"
  | "CATEGORIES"
  | "SIZES"
  | "PERMISSIONS"
  | "ORDERS"
  | "BANNERS"
  | "SETTINGS"
  | "DASHBOARD";

export type TPermissionAction = "DELETE" | "UPDATE" | "READ" | "CREATE";

export type TUserPermission = `${TPermissionResource}_${TPermissionAction}`;
