import { Box, Container, Grid, Typography } from "@mui/material";
import { AxiosRequestConfig } from "axios";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import NavigateBackButton from "src/components/common/NavigateBackButton";
import OrderItemsCard from "src/components/order/OrderItemsCard";
import { useAuthContext } from "src/context/AuthContext";
import useFetchData from "src/hooks/useFetchData";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const { authToken } = useAuthContext();
  const { t } = useTranslation();

  const orderRequestConfig: AxiosRequestConfig = {
    url: `/orders/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const [{ data: orderData, loading, error }] =
    useFetchData(orderRequestConfig);

  return (
    <>
      {orderData.boardgames && (
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
            {t("order")} #{orderData.id}
          </Typography>
          <Box sx={{ mt: "3%" }}>
            <Grid container flexDirection="row">
              <OrderItemsCard order={orderData} />
            </Grid>
          </Box>
        </Container>
      )}
    </>
  );
}
