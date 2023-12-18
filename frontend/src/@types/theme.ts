import { Theme } from "@mui/material";

export type ThemeMode = "light" | "dark";

export type ThemeContextStates = {
  theme: Theme;
  themeMode: ThemeMode;
  onThemeModeChange: (mode: ThemeMode) => void;
};

export type TThemeInputs = {
  primaryColor?: string;
  secondaryColor?: string;
  infoColor?: string;
  warningColor?: string;
  successColor?: string;
  errorColor?: string;
};

export type ColorVariant =
  | "primary"
  | "info"
  | "warning"
  | "error"
  | "secondary"
  | "success";
