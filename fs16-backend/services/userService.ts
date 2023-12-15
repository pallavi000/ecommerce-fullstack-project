import mongoose, { Types } from "mongoose";

// model
import { User } from "../models/User";
import { Permission } from "../models/Permission";

// type
import { TUpdateProfileSchema, TUser, TUserSchema } from "../types/users";
import { TPermissionSchema } from "../types/permission";

async function findAllUser() {
  return await User.find().populate("permission");
}

async function findById(userId: string | Types.ObjectId) {
  return await User.findById(userId).select("-password").populate("permission");
}
async function findOne(userId: string | Types.ObjectId) {
  return await User.findById(userId).populate("permission");
}

async function findByEmail(email: string) {
  return await User.findOne({ email });
}

async function createUser(user: TUserSchema) {
  const newUser = await User.create(user);
  return await newUser.populate("permission");
}

async function deleteUser(userId: string | Types.ObjectId) {
  return await User.findByIdAndDelete(userId);
}

async function updateUserInfo(
  userId: string | Types.ObjectId,
  data: TUserSchema
) {
  return await User.findByIdAndUpdate(userId, data, {
    new: true,
  }).populate("permission");
}

async function updateProfile(
  userId: string | Types.ObjectId,
  data: TUpdateProfileSchema
) {
  return await User.findByIdAndUpdate(userId, data, {
    new: true,
  }).populate("permission");
}

async function updatePassword(
  userId: string | Types.ObjectId,
  password: string
) {
  return await User.findByIdAndUpdate(
    userId,
    {
      password,
    },
    {
      new: true,
    }
  );
}

async function updateAvatar(userId: string | Types.ObjectId, path: string) {
  return await User.findByIdAndUpdate(
    userId,
    {
      avatar: path,
    },
    { new: true }
  );
}

async function createPermission(
  userId: string | Types.ObjectId,
  permission: TPermissionSchema
) {
  const newPermission = await Permission.create({
    ...permission,
    user: userId,
  });
  return await newPermission.populate("user");
}

async function findAllPermissions() {
  return await Permission.find().populate("user").lean().sort("name").exec();
}

async function updatePermission(
  userId: string | Types.ObjectId,
  permissionId: string | Types.ObjectId,
  permission: TPermissionSchema
) {
  return await Permission.findByIdAndUpdate(
    permissionId,
    {
      ...permission,
      user: userId,
    },
    { new: true }
  ).populate("user");
}

async function deletePermission(permissionId: string | Types.ObjectId) {
  return await Permission.findByIdAndDelete(permissionId);
}

export default {
  findById,
  findAllUser,
  createUser,
  deleteUser,
  updateUserInfo,
  findByEmail,
  createPermission,
  findAllPermissions,
  findOne,
  updatePassword,
  updatePermission,
  deletePermission,
  updateProfile,
  updateAvatar,
};
