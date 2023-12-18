import React from "react";
// MUI
import { Box, Card, Grid, Skeleton, Stack } from "@mui/material";

function SkeletonProductCard() {
  return (
    <Grid item xs={12} sm={6} md={3} sx={{ marginBottom: "3.85rem" }}>
      <Card>
        <Skeleton variant="rectangular" sx={{ paddingTop: "100%" }} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack spacing={0} sx={{ p: 3, width: "100%" }}>
            <Skeleton variant="text" sx={{ width: "100%" }} />
            <Skeleton variant="text" sx={{ width: "100%" }} />
            <Skeleton variant="text" sx={{ width: "100%" }} />
            <Skeleton variant="text" sx={{ width: "100%" }} />
          </Stack>
          <Stack spacing={0} sx={{ p: 3 }}>
            <Skeleton variant="circular" sx={{ width: 32, height: 32 }} />
          </Stack>
        </Box>
      </Card>
    </Grid>
  );
}

export default SkeletonProductCard;
