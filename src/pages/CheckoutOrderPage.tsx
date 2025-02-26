import { useEffect, useRef, useState } from "react";

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
import { useTranslation } from "react-i18next";
import { GiMeepleKing } from "react-icons/gi";
import { useLocation } from "react-router-dom";

import AddressDetailsForm from "src/components/order/checkout/AddressDetailsForm";
import PaymentShippingDetails from "src/components/order/checkout/PaymentShippingDetails";
import ReviewDetails from "src/components/order/checkout/ReviewDetails";
import { useCartContext } from "src/context/CartContext";
import sendDataService from "src/services/sendDataService";

export default function CheckoutOrderPage() {
  const { state } = useLocation();
  const { clearCart, cartItems } = useCartContext();
  const { t } = useTranslation();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [orderId, setOrderId] = useState<number | undefined>();
  const [orderName, setOrderName] = useState<string>("");
  const [orderAddress, setOrderAddress] = useState<any>({});

  const [isFormValidated, setIsFormValidated] = useState<boolean>(false);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const steps = [
    `${t("shipping-address")}`,
    `${t("payment-and-shipping-details")}`,
    `${t("review-order")}`,
  ];

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <AddressDetailsForm
            setNameDetails={setOrderName}
            setAddressDetails={setOrderAddress}
            setIsFormValidated={setIsFormValidated}
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
      });

      setOrderId(placeOrderResponse?.data.id);
    };

    if (activeStep === steps.length) {
      placeOrder();
      clearCart();
    }
  }, [activeStep]);

  useEffect(() => {
    if (isFormValidated) {
      setIsFormValidated(false);
      handleNext();
    }
  }, [isFormValidated]);

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: "6%" }}>
      <Paper
        variant="outlined"
        sx={{
          my: { xs: 3, md: 6 },
          p: { xs: 2, md: 3 },
          bgcolor: "common.customLightYellow",
        }}
      >
        <Typography component="h1" variant="h4" align="center">
          {t("checkout")}
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
            <>
              {orderId !== undefined ? (
                <>
                  <GiMeepleKing size={75} />
                  <Typography variant="h5" gutterBottom>
                    {t("thanks-order")}!
                  </Typography>
                  <Typography variant="subtitle1">
                    {t("order-number")} #{orderId}.
                  </Typography>
                </>
              ) : (
                <Typography color="red" variant="h5">
                  {t("no-enough-stock")}!
                </Typography>
              )}
            </>
          ) : (
            <>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    {t("back")}
                  </Button>
                )}
                {activeStep === 1 && (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {t("next")}
                  </Button>
                )}
                {activeStep === 2 && (
                  <Button
                    variant="contained"
                    onClick={() => handleNext()}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {t("place-order")}
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
