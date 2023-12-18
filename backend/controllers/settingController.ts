import { NextFunction, Request, Response } from "express";

// services
import SettingService from "../services/settingService";

// error builder
import { ApiError } from "../errors/ApiError";

//type
import { TSettingSchema } from "../types/setting";
import { IMulterFile } from "../types/file";
import { getFileUploadedPath } from "../utils/helpers";

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
    const { files } = req as IMulterFile;
    // logo uploads
    if (files?.logo) {
      const [logo] = files.logo;
      settingData.logoUrl = getFileUploadedPath(logo.path);
    }
    if (files?.logoDark) {
      const [logoDark] = files.logoDark;
      settingData.logoDarkUrl = getFileUploadedPath(logoDark.path);
    }
    if (files?.favicon) {
      const [favicon] = files.favicon;
      settingData.faviconUrl = getFileUploadedPath(favicon.path);
    }
    // stringified theme object
    if (settingData.theme) {
      settingData.theme = JSON.parse(settingData.theme);
    }
    const setting = await SettingService.updateWebsiteSetting(
      settingId,
      settingData
    );
    res.json(setting);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}
