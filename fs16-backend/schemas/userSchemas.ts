import { z } from "zod";
import { USERROLES } from "../constants/roles";
import mongoose from "mongoose";
import { MAX_FILE_SIZE } from "../constants/server";
import { ACCEPTED_IMAGE_TYPES } from "../constants/server";
import { PermissionSchema } from "./permissionSchema";

export const UserSchema = z.strictObject({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6),
  firstName: z
    .string({
      required_error: "FirstName is required",
    })
    .min(2)
    .max(50),
  lastName: z
    .string({
      required_error: "LastName is required",
    })
    .min(2)
    .max(50),
  role: z.enum(USERROLES),
  avatar: z.string().optional(),
  phoneNumber: z.string().optional(),
  permission: z.array(z.string()).or(z.array(PermissionSchema)).optional(),
});

export const UserSchemaWithoutPassword = UserSchema.omit({ password: true });
export const UserSchemaWithPasswordOptional = UserSchema.extend({
  password: z.string().min(6).optional(),
});
export const UpdateProfileSchema = UserSchema.omit({
  password: true,
  role: true,
  email: true,
});

export const UserAvatarSchema = z.strictObject({
  avatar: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});
