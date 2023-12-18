import { z } from "zod";

export const LoginSchema = z.strictObject({
  email: z.string({
    required_error: "Email is required",
  }),
  password: z.string({
    required_error: "Password is required",
  }),
});

export const ChangePasswordSchema = z.strictObject({
  currentPassword: z.string({
    required_error: "Current Password is required",
  }),
  newPassword: z.string({
    required_error: "New Password is required",
  }),
  confirmPassword: z.string({
    required_error: "Confirm Password is required",
  }),
});
