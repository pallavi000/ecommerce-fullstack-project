import React from "react";
import { Link } from "react-router-dom";

// MUI
import { Avatar, Box, Grid, Typography } from "@mui/material";

// types
import { TCategory } from "../@types/category";

// component props type
type CategoryProps = { category: TCategory };

function Category({ category }: CategoryProps) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Box sx={{ height: "100%", position: "relative" }}>
        <Link to={`/category/${category._id}/products`}>
          <Avatar
            src={category.image}
            alt={category.name}
            variant="square"
            sx={{ height: 250, width: "auto" }}
          />
          {/* <img
            src={category.image}
            alt={category.name}
            height={250}
            style={{
              objectFit: "cover",
              width: "100%",
              borderRadius: "0.5rem",
            }}
          /> */}
          <Typography
            variant="h5"
            sx={{
              position: "absolute",
              top: "80%",
              transform: "translate(50%,-50%)",
              right: "50%",
              background: "rgba(0,0,0,0.4)",
              width: "100%",
              textAlign: "center",
              color: "whitesmoke",
              fontWeight: "normal",
            }}
          >
            {category.name}
          </Typography>
        </Link>
      </Box>
    </Grid>
  );
}

export default Category;
