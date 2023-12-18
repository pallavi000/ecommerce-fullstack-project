import express from "express";

// controllers
import {
  changePassword,
  getProfile,
  googleLogin,
  login,
  registerUser,
  updateProfile,
  updateUserAvatar,
} from "../controllers/authController";

//middlewares
import { authenticate } from "../middlewares/authorization";
import { validateSchema } from "../middlewares/schemaValidate";
import { fileUploadMiddleware } from "../middlewares/fileUpload";

// schemas
import { ChangePasswordSchema, LoginSchema } from "../schemas/authSchema";
import {
  UpdateProfileSchema,
  UserAvatarSchema,
  UserSchema,
} from "../schemas/userSchemas";

const router = express.Router();

// routes
router.post("/login", validateSchema(LoginSchema), login);
router.post("/register", validateSchema(UserSchema), registerUser);
router.get("/profile", authenticate, getProfile);
router.put(
  "/change-password",
  authenticate,
  validateSchema(ChangePasswordSchema),
  changePassword
);
router.put(
  "/update-profile",
  authenticate,
  validateSchema(UpdateProfileSchema),
  updateProfile
);
router.put(
  "/avatar",
  authenticate,
  fileUploadMiddleware("avatar"),
  validateSchema(UserAvatarSchema),
  updateUserAvatar
);
router.post("/login/google", googleLogin);

export default router;
