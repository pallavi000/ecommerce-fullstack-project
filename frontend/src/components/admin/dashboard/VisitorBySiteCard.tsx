import React from "react";

// MUI
import { Box, Paper, Typography } from "@mui/material";

// types
import { TVistorsBySite } from "../../../@types/dashboard";

type VisitorBySiteCardProps = { site: TVistorsBySite };

function VisitorBySiteCard({ site }: VisitorBySiteCardProps) {
  return (
    <Paper
      key={site.name}
      variant="outlined"
      sx={{ py: 2.5, textAlign: "center" }}
    >
      <Box sx={{ mb: 0.5 }}>{site.icon}</Box>

      <Typography variant="h6">300</Typography>

      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {site.name}
      </Typography>
    </Paper>
  );
}

export default VisitorBySiteCard;
