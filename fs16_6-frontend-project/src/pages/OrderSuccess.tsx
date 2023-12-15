import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// redux
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";

// MUI
import { Box, Button, Typography, Container } from "@mui/material";

// icons
import { CheckCircleOutline } from "@mui/icons-material";

// types
import { TOrder } from "../@types/order";

function OrderSuccess() {
  const navigate = useNavigate();
  const { orderId } = useParams();

  // orders state
  const orders: TOrder[] = useSelector((state: AppState) => state.orders.data);

  // redirect if no order id
  useEffect(() => {
    if (!orderId) navigate("/not-found");
  }, [orderId]);

  // redirect if order id doesn't exist in orders
  useEffect(() => {
    if (orderId && orders.length) {
      const order = orders.find((o) => o._id === orderId);
      if (!order) navigate("/not-found");
    }
  }, [orderId, orders]);

  return (
    <Container>
      <Box
        sx={{
          padding: "4rem 0rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CheckCircleOutline sx={{ fontSize: "5rem" }} color="success" />
        <Typography variant="h4">Thankyou for your purchase</Typography>
        <Typography variant="body1">
          Your Order No is : <strong>{orderId || ""}</strong>
        </Typography>
        <Typography variant="body1">
          We will email you with order confirmation with details and tracking
          info.
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Link to={"/"}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "success.dark",
                "&:hover": {
                  bgcolor: "success.darker",
                },
              }}
            >
              Continue Shopping
            </Button>
          </Link>
          <Link to={"/account/orders"}>
            <Button variant="outlined">View Orders</Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default OrderSuccess;
