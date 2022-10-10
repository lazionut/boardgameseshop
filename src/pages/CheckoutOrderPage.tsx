import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
} from "@mui/material";
import { useLocation } from "react-router-dom";

import PaymentShippingDetails from "../components/order/checkout/PaymentShippingDetails";
import AddressDetailsForm from "../components/order/checkout/AddressDetailsForm";
import ReviewDetails from "../components/order/checkout/ReviewDetails";
import { useCartContext } from "../context/CartContext";
import sendDataService from "../services/sendDataService";

export default function CheckoutOrderPage() {
  const { state } = useLocation();
  const { clearCart, cartItems } = useCartContext();
  const authToken: string | null = localStorage.getItem("token");

  const [activeStep, setActiveStep] = useState<number>(0);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [orderName, setOrderName] = useState<string>("");
  const [orderAddress, setOrderAddress] = useState<any>({});

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const steps = [
    "Shipping address",
    "Payment and shipping details",
    "Review your order",
  ];

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <AddressDetailsForm
            setNameDetails={setOrderName}
            setAddressDetails={setOrderAddress}
          />
        );
      case 1:
        return <PaymentShippingDetails />;
      case 2:
        return (
          <ReviewDetails
            orderItems={state?.cartItems}
            orderName={orderName}
            orderAddress={orderAddress}
          />
        );
    }
  }

  useEffect(() => {
    const orderBoardgameIds = cartItems.map((boardgame) => boardgame.id);
    const orderBoardgameQuantities = cartItems.map(
      (boardgame) => boardgame.quantity
    );

    const orderInput = {
      fullName: orderName,
      address: orderAddress,
      boardgameIds: orderBoardgameIds,
      boardgameQuantities: orderBoardgameQuantities,
    };

    const placeOrder = async () => {
      const placeOrderResponse = await sendDataService.execute({
        url: "/orders",
        method: "post",
        data: orderInput,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setOrderId(placeOrderResponse.data.id);
    };

    if (activeStep === steps.length) {
      placeOrder();
      clearCart();
    }
  }, [activeStep]);

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: "6%" }}>
      <Paper
        variant="outlined"
        sx={{
          my: { xs: 3, md: 6 },
          p: { xs: 2, md: 3 },
          bgcolor: "common.customDirtyWhite",
        }}
      >
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <>
          {activeStep === steps.length && orderId !== null ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #{orderId}.
              </Typography>
            </React.Fragment>
          ) : (
            <>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                {activeStep !== steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => handleNext()}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Place order
                  </Button>
                )}
              </Box>
            </>
          )}
        </>
      </Paper>
    </Container>
  );
}
