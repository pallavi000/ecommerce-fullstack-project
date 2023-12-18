import mongoose, { Schema } from "mongoose";

//types
import { TUser, TUserSchema } from "../types/users";

//constant
import { USERROLES } from "../constants/roles";

const UserSchema = new Schema<TUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: USERROLES, default: "USER" },
    avatar: { type: String },
    permission: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
    phoneNumber: { type: String },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", UserSchema);
