import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../redux/store";

// MUI
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Rating,
  Typography,
} from "@mui/material";

// icons
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CheckIcon from "@mui/icons-material/CheckCircle";

// types
import { TProduct } from "../@types/product";
import { ProductState } from "../@types/reduxState";
import { TCartInput } from "../@types/cart";

// components
import Product from "../components/Product";
import BreadCrumb from "../components/Breadcrumb";

// reducers
import { fetchProductById } from "../redux/reducers/productReducer";
import { addToCart } from "../redux/reducers/cartReducer";

// helpers
import { showCustomToastr } from "../utils/helper";
import SkeletonProductDetail from "../components/skeleton/SkeletonProductDetail";

// routes
import { ROUTES } from "../routes/routers";

// icons
import { Add, Remove } from "@mui/icons-material";

function ProductDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [quantityCount, setQuantityCount] = useState<number>(1);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);

  // app dispatch
  const dispatch = useAppDispatch();

  // current product id
  const productId = params.id;

  // current product state
  const {
    data: product,
    isLoading,
    error,
  }: ProductState = useSelector((state: AppState) => ({
    data: state.product.data,
    isLoading: state.product.isLoading,
    error: state.product.error,
  }));

  // products state
  const products: TProduct[] | [] = useSelector(
    (state: AppState) => state.products.data
  );

  // auth state
  const user = useSelector((state: AppState) => state.auth.user);

  // cart state
  const cartItem = useSelector((state: AppState) => state.cart);
  const isAlreadyInCart = cartItem.items.find(
    (item) => item.product._id === product?._id && item.user?._id === user?._id
  );

  // get current product
  useEffect(() => {
    dispatch(fetchProductById({ id: productId }));
  }, [productId]);

  // Quantity change handler
  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase") setQuantityCount((prev) => prev + 1);
    if (action === "decrease" && quantityCount > 1)
      setQuantityCount((prev) => prev - 1);
  };

  // handle add to cart
  const handleCart = async () => {
    if (user && product) {
      const cartItem: TCartInput = {
        product: product._id,
        quantity: quantityCount,
        user: user._id,
        total: product.price * quantityCount,
      };
      setIsAddingToCart(true);
      await dispatch(addToCart(cartItem));
      setIsAddingToCart(false);
    } else {
      navigate(ROUTES.SIGN_IN);
    }
  };

  return (
    <Container maxWidth={"xl"} sx={{ padding: "0rem 1rem 0rem 1rem" }}>
      {isLoading && !product ? (
        <SkeletonProductDetail />
      ) : (
        <Box sx={{ marginBottom: 8 }}>
          <BreadCrumb label={product?.name || "Product Detail"} />
          <Grid container marginTop={0} spacing={6}>
            <Grid item xs={12} md={6} lg={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ height: "500px" }}>
                  <Avatar
                    src={product?.image}
                    alt={product?.name}
                    variant="square"
                    sx={{ height: "100%", width: "100%" }}
                  />
                  {/* <img
                    src={product?.image}
                    alt={`product_${product?._id}`}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "1rem",
                    }}
                  /> */}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <Box>
                  <Typography variant="h4">{product?.name}</Typography>
                  <Chip
                    label={product?.category.name}
                    size="small"
                    sx={{ marginTop: "0.5rem", marginBottom: "1rem" }}
                  />
                  <Typography variant="h6">{product?.description}</Typography>
                </Box>

                <Rating name="read-only" value={3} readOnly />
                <Typography variant="h4" marginBottom={"1rem"}>
                  {" "}
                  ${product?.price}
                </Typography>
              </Box>
              <Divider />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginTop: "2rem",
                }}
              >
                <Typography variant="h6">Quantity : </Typography>

                <ButtonGroup variant="contained" disableElevation>
                  <Button
                    color="inherit"
                    disabled={
                      isAlreadyInCart || quantityCount <= 1 ? true : false
                    }
                    onClick={() => handleQuantityChange("decrease")}
                  >
                    <Remove fontSize="small" />
                  </Button>
                  <Button disabled>
                    {isAlreadyInCart ? isAlreadyInCart.quantity : quantityCount}
                  </Button>
                  <Button
                    color="inherit"
                    disabled={isAlreadyInCart ? true : false}
                    onClick={() => handleQuantityChange("increase")}
                  >
                    <Add fontSize="small" />
                  </Button>
                </ButtonGroup>
              </Box>

              <Grid container spacing={3} columns={12} marginTop={"2rem"}>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    sx={{ width: "100%", padding: "1rem" }}
                    onClick={handleCart}
                    disabled={isAlreadyInCart ? true : false}
                  >
                    {isAddingToCart ? (
                      <CircularProgress size={24} />
                    ) : isAlreadyInCart ? (
                      <CheckIcon color="primary" sx={{ marginRight: "1rem" }} />
                    ) : (
                      <>
                        <ShoppingBagOutlinedIcon
                          fontSize={"small"}
                          sx={{ marginRight: "1rem" }}
                        />
                        Add to Bag
                      </>
                    )}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {!isAddingToCart && isAlreadyInCart ? (
                    <Link to={ROUTES.CART}>
                      <Button
                        variant="contained"
                        sx={{ width: "100%", padding: "1rem" }}
                      >
                        <ShoppingBagOutlinedIcon
                          fontSize={"small"}
                          sx={{ marginRight: "1rem" }}
                        />{" "}
                        View in Cart
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="outlined"
                      sx={{ width: "100%", padding: "1rem" }}
                      onClick={() => {
                        showCustomToastr("Feature not yet enabled.", "error");
                      }}
                    >
                      <FavoriteBorderOutlinedIcon
                        fontSize={"small"}
                        sx={{ marginRight: "1rem" }}
                      />{" "}
                      Add to Wishlist
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}
      <Typography
        variant="h4"
        padding={"3rem 0rem 2rem 0rem"}
        color={"primary.main"}
      >
        Related Products
      </Typography>
      <Grid container columnSpacing={6} rowSpacing={0} columns={12}>
        {products.slice(0, 8).map((product: TProduct) => {
          return <Product key={product._id} product={product} />;
        })}
      </Grid>
    </Container>
  );
}

export default ProductDetail;
