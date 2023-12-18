import express from "express";

// controllers
import {
  findAllUser,
  findSingleUser,
  createUser,
  deleteUser,
  updateUserInfo,
  addPermission,
  getAllPermissions,
  updatePermission,
  deletePermission,
} from "../controllers/usersController";

// middlewares
import { validateParams } from "../middlewares/paramsValidate";
import { validateSchema } from "../middlewares/schemaValidate";
import { authenticate } from "../middlewares/authorization";
import { checkRoles } from "../middlewares/checkRoles";
import { checkPermission } from "../middlewares/checkPermission";

// schema
import {
  UserSchema,
  UserSchemaWithPasswordOptional,
} from "../schemas/userSchemas";
import { PermissionSchema } from "../schemas/permissionSchema";

//constant
import { ROLE } from "../constants/roles";

const router = express.Router();

// routes

//permissions
router.post(
  "/permissions",
  authenticate,
  checkRoles(ROLE.ADMIN),
  checkPermission("PERMISSIONS_CREATE"),
  validateSchema(PermissionSchema),
  addPermission
);
router.put(
  "/permissions/:permissionId",
  validateParams,
  authenticate,
  checkRoles(ROLE.ADMIN),
  checkPermission("PERMISSIONS_UPDATE"),
  validateSchema(PermissionSchema),
  updatePermission
);
router.get(
  "/permissions",
  authenticate,
  checkRoles(ROLE.ADMIN),
  checkPermission("PERMISSIONS_READ"),
  getAllPermissions
);
router.delete(
  "/permissions/:permissionId",
  validateParams,
  authenticate,
  checkRoles(ROLE.ADMIN),
  checkPermission("PERMISSIONS_DELETE"),
  deletePermission
);

// users
router.get(
  "/",
  authenticate,
  checkRoles(ROLE.ADMIN),
  checkPermission("USERS_READ"),
  findAllUser
);
router.post(
  "/",
  authenticate,
  checkRoles(ROLE.ADMIN),
  checkPermission("USERS_CREATE"),
  validateSchema(UserSchema),
  createUser
);
router.get(
  "/:userId",
  validateParams,
  authenticate,
  checkRoles(ROLE.ADMIN),
  checkPermission("USERS_READ"),
  findSingleUser
);
router.put(
  "/:userId",
  validateParams,
  authenticate,
  checkRoles(ROLE.ADMIN),
  // checkPermission("USERS_UPDATE"),
  validateSchema(UserSchemaWithPasswordOptional),
  updateUserInfo
);
router.delete(
  "/:userId",
  validateParams,
  authenticate,
  checkRoles(ROLE.ADMIN),
  checkPermission("USERS_DELETE"),
  deleteUser
);

export default router;
