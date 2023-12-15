import React from "react";
// MUI
import { Card, Skeleton, Stack } from "@mui/material";

function SkeletonCategoryCard() {
  return (
    <Card>
      <Skeleton variant="rectangular" sx={{ paddingTop: "100%" }} />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Skeleton variant="text" sx={{ width: "100%" }} />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Skeleton variant="circular" sx={{ width: 32, height: 32 }} />
          <Skeleton variant="circular" sx={{ width: 32, height: 32 }} />
        </Stack>
      </Stack>
    </Card>
  );
}

export default SkeletonCategoryCard;
