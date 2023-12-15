import { Types } from "mongoose";

//model
import { Setting } from "../models/Setting";

//types
import { TSettingSchema } from "../types/setting";

async function findWebsiteSetting() {
  return await Setting.findOne().sort("-_id");
}

async function createWebsiteSetting(settingData: TSettingSchema) {
  return await Setting.create(settingData);
}

async function updateWebsiteSetting(
  settingId: string | Types.ObjectId,
  settingData: TSettingSchema
) {
  return await Setting.findByIdAndUpdate(
    settingId,
    {
      ...settingData,
    },
    { new: true }
  );
}

export default {
  findWebsiteSetting,
  createWebsiteSetting,
  updateWebsiteSetting,
};
