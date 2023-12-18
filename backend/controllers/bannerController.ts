import { NextFunction, Request, Response } from "express";

// services
import BannerServices from "../services/bannerServices";

// error builder
import { ApiError } from "../errors/ApiError";

//type
import { TBannerSchema } from "../types/banner";

export async function findAllBanner(
  _: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const banners = await BannerServices.findAllBanner();
    res.json(banners);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function createOneBanner(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bannerData: TBannerSchema = req.body;
    const banner = await BannerServices.createOne(bannerData);
    res.status(201).json(banner);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function updateBanner(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bannerId = req.params.bannerId;
    const bannerData: TBannerSchema = req.body;
    const banner = await BannerServices.updateBanner(bannerId, bannerData);
    res.json(banner);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function deleteBanner(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bannerId = req.params.bannerId;
    const banner = await BannerServices.deleteBanner(bannerId);
    res.status(204).send(banner);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}
