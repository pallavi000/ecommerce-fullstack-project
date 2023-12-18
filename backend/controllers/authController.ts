import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import passport from "passport";

// error builder
import { ApiError } from "../errors/ApiError";

// services
import AuthService from "../services/authService";
import UserService from "../services/userService";

// types
import {
  TChangePasswordSchema,
  TUpdateProfileSchema,
  TUser,
  TUserSchema,
} from "../types/users";
import { IAuthorizationRequest } from "../types/authorization";

// utils
import { generatePasswordHash, getFileUploadedPath } from "../utils/helpers";
import { IMulterFile, IMulterRequest } from "file";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const user = await UserService.findByEmail(email);
    if (!user) {
      return next(ApiError.badRequest("Invalid email"));
    }
    const userWithPermission = await user.populate({
      path: "permission",
      select: {
        name: 1,
        _id: 0,
      },
    });

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return next(ApiError.badRequest("Incorrect password"));
    }
    const accessToken = await AuthService.generateAccessToken(
      userWithPermission
    );
    const refreshToken = await AuthService.generateRefreshToken(
      userWithPermission
    );
    await AuthService.saveRefreshToken(refreshToken);
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function googleLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate(
    "google-id-token",
    { session: false },
    async (err: any, user: TUser) => {
      if (err || !user) {
        return next(ApiError.unauthorized("Authentication failed."));
      }
      try {
        const accessToken = await AuthService.generateAccessToken(user);
        const refreshToken = await AuthService.generateRefreshToken(user);
        await AuthService.saveRefreshToken(refreshToken);
        res.status(200).json({ accessToken, refreshToken });
      } catch (error) {
        next(ApiError.internal("Internal server error"));
      }
    }
  )(req, res);
}

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newUser: TUserSchema = req.body;
    const checkUser = await UserService.findByEmail(newUser.email);
    if (checkUser) {
      return next(ApiError.badRequest("Username already exists"));
    }
    newUser.password = await generatePasswordHash(newUser.password);
    const user = await UserService.createUser(newUser);
    const userWithPermission = await user.populate({
      path: "permission",
      select: {
        name: 1,
        _id: 0,
      },
    });
    const accessToken = await AuthService.generateAccessToken(
      userWithPermission
    );
    const refreshToken = await AuthService.generateRefreshToken(
      userWithPermission
    );
    await AuthService.saveRefreshToken(refreshToken);
    const { password, ...restOfUser } = userWithPermission.toObject() as TUser;
    res.status(201).json({ user: restOfUser, accessToken, refreshToken });
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function getProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user } = req as IAuthorizationRequest;
    const userProfile = user && (await UserService.findById(user._id));
    if (!userProfile) {
      return next(ApiError.resourceNotFound("User profile not found"));
    }
    const { password, ...restOfUser } = userProfile.toObject() as TUser;
    res.json(restOfUser);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function changePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user } = req as IAuthorizationRequest;
    const data: TChangePasswordSchema = req.body;
    if (data.newPassword !== data.confirmPassword) {
      return next(ApiError.badRequest("Password did not match."));
    }
    const currentUser = await UserService.findOne(user._id);
    if (!currentUser) {
      return next(ApiError.resourceNotFound("User not found."));
    }
    const valid = await bcrypt.compare(
      data.currentPassword,
      currentUser.password
    );
    if (!valid) {
      return next(ApiError.badRequest("Current Password did not match."));
    }
    const password = await generatePasswordHash(data.newPassword);
    await UserService.updatePassword(user._id, password);
    res.send("ok");
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function updateProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user } = req as IAuthorizationRequest;
    const data: TUpdateProfileSchema = req.body;
    const updatedUser = await UserService.updateProfile(user._id, data);
    if (!updatedUser) {
      return next(ApiError.resourceNotFound("User not found."));
    }
    const { password, ...restOfUser } = updatedUser.toObject() as TUser;
    res.json(restOfUser);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function updateUserAvatar(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { files } = req as IMulterFile;
    if (!files.avatar) {
      return next(ApiError.badRequest("No file found."));
    }
    const [avatar] = files.avatar;
    const { user } = req as IAuthorizationRequest;
    const filePath = getFileUploadedPath(avatar.path);
    const updatedUser = await UserService.updateAvatar(user._id, filePath);
    if (!updatedUser) {
      return next(ApiError.resourceNotFound("User not found."));
    }
    res.json(updatedUser.avatar);
  } catch (error: any) {
    console.log(error.message);
    next(ApiError.internal("Internal server error"));
  }
}

export default {
  login,
  getProfile,
};
