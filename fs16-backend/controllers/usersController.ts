import { Request, Response, NextFunction } from "express";

// services
import UserService from "../services/userService";

// error builder
import { ApiError } from "../errors/ApiError";

//type
import { TUser, TUserSchema } from "../types/users";
import { TPermissionSchema } from "../types/permission";
import { IAuthorizationRequest } from "../types/authorization";

//utils
import { generatePasswordHash } from "../utils/helpers";

export async function findAllUser(
  _: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await UserService.findAllUser();
    res.json(users);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function findSingleUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;
    const user = await UserService.findById(userId);
    if (!user) {
      next(ApiError.resourceNotFound("User not found."));
      return;
    }
    const { password, ...restOfUser } = user.toObject() as TUser;
    res.json(restOfUser);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newUser: TUserSchema = req.body;
    const checkUser = await UserService.findByEmail(newUser.email);
    if (checkUser) {
      return res.status(400).json("Username already exists");
    }
    newUser.password = await generatePasswordHash(newUser.password);
    const user = await UserService.createUser(newUser);
    const { password, ...restOfUser } = user.toObject() as TUser;
    res.status(201).json(restOfUser);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;
    await UserService.deleteUser(userId);
    res.status(204).send();
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function updateUserInfo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;
    const userData: TUserSchema = req.body;
    if (userData.password) {
      userData.password = await generatePasswordHash(userData.password);
    }
    const updatedUser = await UserService.updateUserInfo(userId, userData);
    const { password, ...restOfUser } = updatedUser?.toObject() as TUser;
    res.json(restOfUser);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function getAllPermissions(
  _: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const permissions = await UserService.findAllPermissions();
    res.json(permissions);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function addPermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user } = req as IAuthorizationRequest;
    const newPermission: TPermissionSchema = req.body;
    const permission = await UserService.createPermission(
      user._id,
      newPermission
    );
    res.status(201).json(permission);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function updatePermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user } = req as IAuthorizationRequest;
    const permissionId = req.params.permissionId;
    const permissionData: TPermissionSchema = req.body;
    const permission = await UserService.updatePermission(
      user._id,
      permissionId,
      permissionData
    );
    res.status(201).json(permission);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function deletePermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const permissionId = req.params.permissionId;
    await UserService.deletePermission(permissionId);
    res.status(204).send();
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export default {
  findAllUser,
  findSingleUser,
  createUser,
  deleteUser,
  updateUserInfo,
};
