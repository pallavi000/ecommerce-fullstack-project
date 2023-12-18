import express from "express";

// controllers
import { findAllBanner } from "../controllers/bannerController";
import { createOneBanner } from "../controllers/bannerController";
import { updateBanner } from "../controllers/bannerController";
import { deleteBanner } from "../controllers/bannerController";

// middlewares
import { validateSchema } from "../middlewares/schemaValidate";
import { validateParams } from "../middlewares/paramsValidate";
import { authenticate } from "../middlewares/authorization";
import { checkRoles } from "../middlewares/checkRoles";
import { checkPermission } from "../middlewares/checkPermission";

// schema
import { BannerSchema } from "../schemas/bannerSchema";

//constant
import { ROLE } from "../constants/roles";

const router = express.Router();

// routes
router.get(
  "/",
  // authenticate,
  // checkRoles(ROLE.ADMIN),
  // checkPermission("BANNERS_READ"),
  findAllBanner
);
router.post(
  "/",
  authenticate,
  checkRoles(ROLE.ADMIN),
  checkPermission("BANNERS_CREATE"),
  validateSchema(BannerSchema),
  createOneBanner
);

router.put(
  "/:bannerId",
  validateParams,
  authenticate,
  checkRoles(ROLE.ADMIN),
  checkPermission("BANNERS_UPDATE"),
  validateSchema(BannerSchema),
  updateBanner
);
router.delete(
  "/:bannerId",
  validateParams,
  authenticate,
  checkRoles(ROLE.ADMIN),
  checkPermission("BANNERS_DELETE"),
  deleteBanner
);

export default router;
