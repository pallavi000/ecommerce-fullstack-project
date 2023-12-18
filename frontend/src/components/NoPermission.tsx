import React from "react";
import { Alert, AlertTitle, Box } from "@mui/material";

const NoPermission = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
      }}
    >
      <Alert severity="error">
        <AlertTitle>Not Enough Permissions</AlertTitle>
        Sorry, you don't have the required permissions to access this page.
      </Alert>
    </Box>
  );
};

export default NoPermission;
