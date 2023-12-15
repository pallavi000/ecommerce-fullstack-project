import merge from "lodash/merge";
import { useMemo } from "react";

// mui
import { ThemeProvider, createTheme, useTheme } from "@mui/material";

//redux
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";
//

//component props type
type Props = {
  children: React.ReactNode;
};

export default function CustomizeThemeColorContext({ children }: Props) {
  const outerTheme = useTheme();
  const setting = useSelector((state: AppState) => state.setting.data);

  const themeOptions = useMemo(
    () => ({
      palette: {
        primary: {
          main: setting?.theme?.primaryColor,
        },
        secondary: {
          main: setting?.theme?.secondaryColor,
        },
        info: {
          main: setting?.theme?.infoColor,
        },
        warning: {
          main: setting?.theme?.warningColor,
        },
        success: {
          main: setting?.theme?.successColor,
        },
        error: {
          main: setting?.theme?.errorColor,
        },
      },
    }),
    [setting]
  );

  const theme = setting?.theme
    ? createTheme(merge(outerTheme, themeOptions))
    : createTheme(outerTheme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
