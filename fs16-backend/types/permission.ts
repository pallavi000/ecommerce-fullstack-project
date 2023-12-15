import { z } from "zod";
import mongoose, { Types } from "mongoose";

import { PermissionSchema } from "../schemas/permissionSchema";

export type TPermissionSchema = z.infer<typeof PermissionSchema>;

export type TPermission = TPermissionSchema & {
  _id: string;
  user?: Types.ObjectId;
};

export interface IPermissionObj extends TPermission {}

export type TPermissionResource =
  | "USERS"
  | "PRODUCTS"
  | "CATEGORIES"
  | "SIZES"
  | "PERMISSIONS"
  | "BANNERS"
  | "DASHBOARD"
  | "ORDERS"
  | "SETTINGS";

export type TPermissionAction = "DELETE" | "UPDATE" | "READ" | "CREATE";

export type TUserPermission = `${TPermissionResource}_${TPermissionAction}`;
