import express from "express";

// controllers
import {
  createAddress,
  deleteAddress,
  findAllAddress,
  findSingleAddress,
  makeAddressDefault,
  updateAddress,
} from "../controllers/addressController";

// middlewares
import { validateParams } from "../middlewares/paramsValidate";
import { validateSchema } from "../middlewares/schemaValidate";

// schema
import { AddressSchema } from "../schemas/addressSchema";
import { authenticate } from "../middlewares/authorization";

const router = express.Router();

// routes
router.get("/", authenticate, findAllAddress);
router.post("/", authenticate, validateSchema(AddressSchema), createAddress);
router.get("/:addressId", validateParams, authenticate, findSingleAddress);
router.put(
  "/:addressId",
  authenticate,
  validateParams,
  validateSchema(AddressSchema),
  updateAddress
);
router.put(
  "/make-default/:addressId",
  authenticate,
  validateParams,
  makeAddressDefault
);
router.delete("/:addressId", validateParams, authenticate, deleteAddress);

export default router;
