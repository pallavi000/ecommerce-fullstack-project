import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BannerSchema = new Schema(
  {
    image: { type: String, required: true },
    position: { type: String, required: true },
    page: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Banner = mongoose.model("Banner", BannerSchema);
