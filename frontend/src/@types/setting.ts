import { TThemeInputs } from "./theme";

export type TSettingInputs = {
  websiteName: string;
  defaultCurrency: string;
  logoUrl: string;
  logoDarkUrl: string;
  faviconUrl: string;
  websiteTagline?: string;
  websiteDescription?: string;
  theme?: TThemeInputs;
  logo?: any;
  logoDark?: any;
  favicon?: any;
};

export type TSetting = TSettingInputs & {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
};
