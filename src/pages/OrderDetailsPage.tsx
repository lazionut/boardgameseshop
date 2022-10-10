import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

import OrderItemsCard from "../components/order/OrderItemsCard";
import NavigateBackButton from "../components/common/NavigateBackButton";
import { useLocation } from "react-router-dom";

export default function OrderDetailsPage() {
  const { state } = useLocation();

  return (
    <Container sx={{ mb: { xs: "5%", md: "auto" } }}>
      <Box
        sx={{
          mt: { xs: "5%", md: "2%" },
          mb: { xs: "5%", md: "auto" },
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <NavigateBackButton to="/orders" />
      </Box>
      <Typography variant="h5" sx={{ textDecoration: "underline" }} mt="2%">
        Order #{state.order.id}
      </Typography>
      <Box sx={{ mt: "3%" }}>
        <Grid container flexDirection="row">
          <OrderItemsCard order={state.order} />
        </Grid>
      </Box>
    </Container>
  );
}
