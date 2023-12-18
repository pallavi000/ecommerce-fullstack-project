import React from "react";

//MUI
import { Box } from "@mui/material";

//types
import { TPaymentMethodData } from "../../@types/order";

//components
import PaymentForm from "../PaymentForm";

type PaymentStepProps = {
  handleSubmit: (data: TPaymentMethodData) => Promise<void>;
};

function PaymentStep({ handleSubmit }: PaymentStepProps) {
  return (
    <Box>
      <PaymentForm handleSubmit={handleSubmit} />
    </Box>
  );
}

export default PaymentStep;
