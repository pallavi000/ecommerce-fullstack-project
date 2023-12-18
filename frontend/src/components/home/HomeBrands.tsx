//mui
import { Box, Grid, Typography } from "@mui/material";

//components
import Brand from "../Brand";

// images
import BrandImg1 from "../../images/brand1.png";
import BrandImg2 from "../../images/brand2.png";
import BrandImg3 from "../../images/brand3.png";
import BrandImg4 from "../../images/brand4.png";
import BrandImg5 from "../../images/brand5.png";
import BrandImg6 from "../../images/brand6.png";

function HomeBrands() {
  // brands
  const brands = [
    BrandImg1,
    BrandImg2,
    BrandImg3,
    BrandImg4,
    BrandImg5,
    BrandImg6,
  ];

  return (
    <Box sx={{ marginBottom: 8 }}>
      <Typography variant="h4" padding={"2rem 0rem"}>
        Shop By Brand
      </Typography>
      <Grid container spacing={3} columns={12}>
        {brands.map((brand, index) => {
          return <Brand key={index} brand={brand} index={index} />;
        })}
      </Grid>
    </Box>
  );
}

export default HomeBrands;
