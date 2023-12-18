import { Box } from "@mui/material";
import React from "react";

// image
import BannerImg from "../images/category.png";

function BannerContainer() {
  return (
    <Box sx={{ height: "auto", maxHeight: "250px", width: "100%" }}>
      <img
        src={BannerImg}
        alt="banner_img"
        style={{
          height: "100%",
          maxHeight: "250px",
          width: "100%",
          objectFit: "cover",
          borderRadius: "0.5rem",
        }}
      />
    </Box>
  );
}

export default BannerContainer;
