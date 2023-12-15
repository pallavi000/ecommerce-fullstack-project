import { NextFunction, Request, Response } from "express";

// services
import SettingService from "../services/settingService";

// error builder
import { ApiError } from "../errors/ApiError";

//type
import { TSettingSchema } from "../types/setting";

export async function findSetting(
  _: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const setting = await SettingService.findWebsiteSetting();
    res.json(setting);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function createSetting(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const settingData: TSettingSchema = req.body;
    const setting = await SettingService.createWebsiteSetting(settingData);
    res.status(201).json(setting);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function updateSetting(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const settingId = req.params.settingId;
    const settingData: TSettingSchema = req.body;
    const setting = await SettingService.updateWebsiteSetting(
      settingId,
      settingData
    );
    res.json(setting);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}
