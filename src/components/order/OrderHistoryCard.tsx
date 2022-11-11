import React from "react";
import { Box, Chip, CardActions, Grid, Typography, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useTranslation } from "react-i18next";

import { orderStatusDefiner, trimDateTime } from "../../utils/Utilities";
import OrderDialog from "./OrderDialog";
import { Constants } from "../../constants/Constants";

interface OrderHistoryCardProps {
  order: {
    id: number;
    creationDate: string;
    total: number;
    status: number;
  };
}

export default function OrderHistoryCard({ order }: OrderHistoryCardProps) {
  const authToken: string | null = localStorage.getItem("token");
  let accountDecoded: { [key: string]: any } | null = null;
  if (authToken !== null) {
    accountDecoded = jwt_decode(authToken);
  }
  const navigate = useNavigate();
  const {t} = useTranslation();

  return (
    <Grid item key={order.id} mt="2%" mb="2%">
      <Card
        variant="outlined"
        sx={{
          gap: "clamp(0px, (100% - 360px + 32px) * 999, 16px)",
          bgcolor: "common.customLightYellow",
          p: "2%",
        }}
      >
        {accountDecoded?.Role === Constants.ADMIN && (
          <Box
            sx={{
              marginLeft: "auto",
            }}
          >
            <OrderDialog id={order.id} currentOrderStatus={order.status} />
          </Box>
        )}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(`/orders/${order.id}`)}
        >
          <Typography variant="h6">{t("order")} #{order.id}</Typography>
          <Typography>
            {t("ordered-at")}: {trimDateTime(order.creationDate)}
          </Typography>
          <Box
            sx={{
              marginLeft: "auto",
            }}
          >
            <Chip variant="outlined" label={`Total: ${order.total} RON`} />
          </Box>
        </Box>
        <CardActions
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              marginLeft: "auto",
            }}
          >
            <Chip
              variant="outlined"
              color="primary"
              label={orderStatusDefiner(order.status)}
            />
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
}
