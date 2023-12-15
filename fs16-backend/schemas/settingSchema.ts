import { z } from "zod";

// schema
const ThemeSchema = z.strictObject({
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  infoColor: z.string().optional(),
  warningColor: z.string().optional(),
  successColor: z.string().optional(),
  errorColor: z.string().optional(),
});

export const SettingSchema = z.strictObject({
  websiteName: z.string({
    required_error: "Website Name is required",
  }),
  defaultCurrency: z.string({
    required_error: "Default Currency is required",
  }),
  logoUrl: z.string({
    required_error: "Logo Url is required",
  }),
  logoDarkUrl: z.string({
    required_error: "Dark Mode logo url is required",
  }),
  faviconUrl: z.string({
    required_error: "Favicon URL is required",
  }),
  websiteTagline: z.string().optional(),
  websiteDescription: z.string().optional(),
  theme: ThemeSchema.optional(),
});
