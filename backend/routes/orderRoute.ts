import express from "express";

//controllers
import {
  createOrder,
  findAllOrder,
  findOrderById,
  findOrderByUser,
} from "../controllers/orderController";

//middleware
import { validateParams } from "../middlewares/paramsValidate";
import { authenticate } from "../middlewares/authorization";
import { validateSchema } from "../middlewares/schemaValidate";

//schema
import { OrderBodySchema } from "../schemas/orderBodySchema";

const router = express.Router();

router.get("/", authenticate, findAllOrder);
router.get("/user", authenticate, findOrderByUser);
router.get("/:orderId", authenticate, validateParams, findOrderById);
router.post("/", authenticate, validateSchema(OrderBodySchema), createOrder);

export default router;
