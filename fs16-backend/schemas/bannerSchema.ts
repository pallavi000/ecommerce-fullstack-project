import { z } from "zod";

// schema
export const BannerSchema = z.strictObject({
  image: z.string({
    required_error: "Banner Image is required",
  }),
  position: z.string({ required_error: "Banner Position is required" }),
  page: z.string({ required_error: "Banner Page is required" }),
});
