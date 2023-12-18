import { z } from "zod";
import { USERROLES } from "../constants/roles";
import { PermissionSchema } from "./permissionSchema";
import { ImageSchema } from "./imageSchema";

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

export const UserAvatarSchema = z.object({
  avatar: z.array(ImageSchema),
});
