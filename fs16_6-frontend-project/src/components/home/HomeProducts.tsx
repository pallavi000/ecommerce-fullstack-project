import React from "react";
import { Link } from "react-router-dom";

//mui
import { Box, Button, Grid, Typography } from "@mui/material";

//redux
import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";

//components
import SkeletonProductCard from "../skeleton/SkeletonProductCard";
import Product from "../Product";

//types
import { TProduct } from "../../@types/product";

function HomeProducts({
  title,
  startIndex = 0,
  endIndex = 8,
}: {
  title: string;
  startIndex?: number;
  endIndex?: number;
}) {
  // products state
  const { products, isLoading } = useSelector((state: AppState) => ({
    products: state.products.data,
    isLoading: state.products.isLoading,
  }));
  return (
    <Box marginBottom={8}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h4">{title}</Typography>
        <Button>
          <Link to="/products">View All</Link>
        </Button>
      </Box>
      <Box bgcolor={"background.neutral"} color="text.primary" padding={"1rem"}>
        <Grid container columnSpacing={6} rowSpacing={0} columns={12}>
          {isLoading && !products?.length
            ? [...Array(5)].map((_, index) => (
                <SkeletonProductCard key={index} />
              ))
            : products?.slice(startIndex, endIndex).map((product: TProduct) => {
                return <Product key={product._id} product={product} />;
              })}
        </Grid>
      </Box>
    </Box>
  );
}

export default HomeProducts;
