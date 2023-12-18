import { SettingSchema } from "../schemas/settingSchema";
import { z } from "zod";

export type TSettingSchema = z.infer<typeof SettingSchema>;

export type TSetting = TSettingSchema & { _id: string };
