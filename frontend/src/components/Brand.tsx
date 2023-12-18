// MUI
import { Box, Grid } from "@mui/material";

// component props type
type BrandProps = { brand: string; index: number };

function Brand({ brand, index }: BrandProps) {
  return (
    <Grid item xs={12} sm={6} md={3} lg={2}>
      <Box sx={{ cursor: "pointer", height: "168px", width: "168px" }}>
        <img
          alt={`brand_img_${index}`}
          src={brand}
          height={"100%"}
          width={"100%"}
        />
      </Box>
    </Grid>
  );
}

export default Brand;
