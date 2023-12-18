import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//mui
import { Avatar, Box } from "@mui/material";
//redux
import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";

function HomeBanner() {
  const { banners } = useSelector((state: AppState) => ({
    banners: state.banner.data,
  }));

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  return (
    <Slider {...settings}>
      {banners.map((banner) => {
        return (
          <Box
            key={banner._id}
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: "250px",
              marginBottom: 8,
            }}
          >
            <Avatar
              src={banner?.image}
              alt={banner?.page}
              sx={{ height: "auto", width: "100%", maxHeight: "250px" }}
              variant="square"
            />
          </Box>
        );
      })}
    </Slider>
  );
}

export default HomeBanner;
