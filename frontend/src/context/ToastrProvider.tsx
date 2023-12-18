import React from "react";

// Snackbar
import styled from "@emotion/styled";
import { MaterialDesignContent, SnackbarProvider } from "notistack";

// context
import { useThemeContext } from "./ThemeContext";

function ToastrProvider({ children }: React.PropsWithChildren) {
  const { theme } = useThemeContext();

  // Snackbar customization
  const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
    "&.notistack-MuiContent-success": {
      backgroundColor: theme.palette.primary.main,
    },
    "&.notistack-MuiContent-error": {
      backgroundColor: theme.palette.error.main,
    },
  }));

  return (
    <SnackbarProvider
      maxSnack={3}
      Components={{
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      {children}
    </SnackbarProvider>
  );
}

export default ToastrProvider;
