import mongoose, { Schema } from "mongoose";

//types
import { TTokenSchema } from "../types/token";

const TokenSchema = new Schema<TTokenSchema>(
  {
    refreshToken: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Token = mongoose.model("Token", TokenSchema);
