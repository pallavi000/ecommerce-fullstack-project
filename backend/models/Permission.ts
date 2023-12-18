import mongoose, { Schema } from "mongoose";

const permissionSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    description: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Permission = mongoose.model("Permission", permissionSchema);
