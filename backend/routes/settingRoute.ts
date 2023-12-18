import express from "express";

// middlewares
import { authenticate } from "../middlewares/authorization";
import { checkRoles } from "../middlewares/checkRoles";
import { checkPermission } from "../middlewares/checkPermission";
import { validateParams } from "../middlewares/paramsValidate";
import { validateSchema } from "../middlewares/schemaValidate";

//controllers
import {
  createSetting,
  findSetting,
  updateSetting,
} from "../controllers/settingController";

//schema
import { SettingSchema } from "../schemas/settingSchema";

//constant
import { ROLE } from "../constants/roles";
import { fileUploadMiddleware } from "../middlewares/fileUpload";

const router = express.Router();

// routes
router.get("/", findSetting);
router.post(
  "/",
  authenticate,
  checkRoles(ROLE.ADMIN),
  checkPermission("SETTINGS_CREATE"),
  validateSchema(SettingSchema),
  createSetting
);

router.put(
  "/:settingId",
  validateParams,
  authenticate,
  checkRoles(ROLE.ADMIN),
  checkPermission("SETTINGS_UPDATE"),
  fileUploadMiddleware("logo", "logoDark", "favicon"),
  validateSchema(SettingSchema),
  updateSetting
);

export default router;
