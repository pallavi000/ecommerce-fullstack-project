import { z } from "zod";
import { BannerSchema } from "../schemas/bannerSchema";

export type TBannerSchema = z.infer<typeof BannerSchema>;

export type TBanner = TBannerSchema & { _id: string };
