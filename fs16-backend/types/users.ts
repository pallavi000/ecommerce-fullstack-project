import { z } from "zod";

import {
  UpdateProfileSchema,
  UserSchema,
  UserSchemaWithoutPassword,
} from "../schemas/userSchemas";
import { IPermissionObj } from "./permission";
import { ROLE } from "../constants/roles";
import { ChangePasswordSchema } from "../schemas/authSchema";

export type TUserSchema = z.infer<typeof UserSchema>;

export type TUser = TUserSchema & {
  _id: string;
};

export type TChangePasswordSchema = z.infer<typeof ChangePasswordSchema>;
export type TUpdateProfileSchema = z.infer<typeof UpdateProfileSchema>;

export type TUserWithoutPassword = z.infer<typeof UserSchemaWithoutPassword>;

export type TRole = keyof typeof ROLE;
