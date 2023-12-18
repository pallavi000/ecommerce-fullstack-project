import React from "react";
import { Link } from "react-router-dom";

// MUI
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

// types
import { TProduct } from "../@types/product";

// component props type
type ProductProps = { product: TProduct };

function Product({ product }: ProductProps) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Box sx={{ height: "412px" }}>
        <Link to={`/product-detail/${product._id}`}>
          <Card>
            <CardContent sx={{ padding: 0 }}>
              <Avatar
                src={product.image}
                alt={product.name}
                variant="square"
                sx={{ height: 250, width: "auto" }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "1rem",
                  paddingLeft: 2,
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Typography
                    variant="body1"
                    noWrap
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    width={"90%"}
                  >
                    {product.name}
                  </Typography>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    marginRight={1}
                  >
                    <Typography variant="body2" color={"text.secondary"}>
                      {product.category?.name}
                    </Typography>
                    <Chip
                      label={product.size.name}
                      size="small"
                      sx={{ fontSize: 12 }}
                    />
                  </Stack>
                  <Typography variant="subtitle1">${product.price}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Link>
      </Box>
    </Grid>
  );
}

export default Product;
