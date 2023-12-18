import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SettingSchema = new Schema(
  {
    websiteName: { type: String, required: true },
    websiteTagline: { type: String },
    websiteDescription: { type: String },
    defaultCurrency: { type: String, required: true },
    logoUrl: { type: String, required: true },
    logoDarkUrl: { type: String, required: true },
    faviconUrl: { type: String, required: true },
    theme: {
      primaryColor: { type: String },
      secondaryColor: { type: String },
      infoColor: { type: String },
      warningColor: { type: String },
      successColor: { type: String },
      errorColor: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

export const Setting = mongoose.model("Setting", SettingSchema);
