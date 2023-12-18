import { Types } from "mongoose";

//model
import { Banner } from "../models/Banner";

// types
import { TBannerSchema } from "../types/banner";

async function findAllBanner() {
  return await Banner.find().lean();
}

async function createOne(banner: TBannerSchema) {
  const newSize = new Banner(banner);
  return await newSize.save();
}

async function updateBanner(
  bannerId: string | Types.ObjectId,
  data: TBannerSchema
) {
  return await Banner.findByIdAndUpdate(bannerId, data, {
    new: true,
  });
}

async function deleteBanner(bannerId: string | Types.ObjectId) {
  return await Banner.findByIdAndDelete(bannerId);
}

export default {
  findAllBanner,
  createOne,
  updateBanner,
  deleteBanner,
};
