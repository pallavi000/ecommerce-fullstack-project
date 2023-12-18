import React, { useState } from "react";

// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../redux/store";

// MUI
import {
  Alert,
  Box,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

// components
import ShippingStep from "../components/checkout/ShippingStep";
import BillingStep from "../components/checkout/BillingStep";
import PaymentStep from "../components/checkout/PaymentStep";
import { TOrderData, TPaymentMethodData } from "../@types/order";
import { createOrder } from "../redux/reducers/orderReducer";
import { useNavigate } from "react-router-dom";
import { emptyCart } from "../redux/reducers/cartReducer";

// form stepper steps
const steps = ["Shipping Address", "Billing Address", "Payment Details"];

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // cart items state
  const cart = useSelector((state: AppState) => state.cart);
  const { items: cartItems } = cart;

  // active step
  const [activeStep, setActiveStep] = React.useState(0);
  // address
  const [shippingId, setShippingId] = useState<string | null>(null);
  const [billingId, setBillingId] = useState<string | null>(null);

  // handle next step in stepper
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // submit handler
  const handleSubmit = async (paymentData: TPaymentMethodData) => {
    if (!shippingId || !billingId) return;
    const formData: TOrderData = {
      cart: cartItems.map((c) => c._id),
      payment: paymentData,
      shipping: shippingId,
      billing: billingId,
      total: cart.totalPrice,
    };
    const { payload } = await dispatch(createOrder(formData));
    dispatch(emptyCart());
    navigate(`/order-success/${payload._id}`);
  };

  return (
    <Container maxWidth="sm">
      {cartItems.length ? (
        <Box sx={{ width: "100%" }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            Checkout - {steps[activeStep]}
          </Typography>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <Box sx={{ paddingTop: 4 }}>
            {/* <AddressForm handleNext={handleNext} /> */}
            {activeStep === 0 ? (
              <ShippingStep
                shippingId={shippingId}
                setShippingId={setShippingId}
                handleNext={handleNext}
              />
            ) : activeStep === 1 ? (
              <BillingStep
                billingId={billingId}
                setBillingId={setBillingId}
                handleNext={handleNext}
              />
            ) : (
              <PaymentStep handleSubmit={handleSubmit} />
            )}
          </Box>
        </Box>
      ) : (
        <Alert severity="error" sx={{ marginTop: "2rem" }}>
          No item added in your shopping cart!
        </Alert>
      )}
    </Container>
  );
}

export default Checkout;
