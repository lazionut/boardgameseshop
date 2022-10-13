import React from "react";
import {
  Box,
  Card,
  CardActions,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import jwt_decode from "jwt-decode";

import { orderStatusDefiner, trimDateTime } from "../../utils/Utilities";
import OrderBoardgameCard from "./OrderBoardgameCard";
import OrderDialog from "./OrderDialog";
import { Constants } from "../../constants/Constants";

interface OrderItem {
  order: {
    id: number;
    fullName: string;
    address: string;
    total: number;
    status: number;
    creationDate: string;
    boardgames: {
      id: number;
      image: string;
      name: string;
      price: number;
      quantity: number;
    }[];
  };
}

export default function OrderItemsCard({ order }: OrderItem) {
  const authToken: string | null = localStorage.getItem("token");
  let accountDecoded: { [key: string]: any } | null = null;

  if (authToken !== null) {
    accountDecoded = jwt_decode(authToken);
  }

  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        bgcolor: "common.customDirtyWhite",
        p: "2%",
      }}
    >
      <Box flexDirection="row" width="100%">
        {accountDecoded?.Role === Constants.ADMIN && (
          <Box
            sx={{
              marginLeft: "auto",
            }}
          >
            <OrderDialog id={order.id} currentOrderStatus={order.status} />
          </Box>
        )}
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "left",
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography> {order.fullName}</Typography>
            <Typography>Address: </Typography>
            <Typography> {order.address}</Typography>
            <Typography mt={"5%"}>
              Ordered on: {trimDateTime(order.creationDate)}
            </Typography>
            <Chip
              variant="outlined"
              color="primary"
              sx={{ mt: "5%" }}
              label={orderStatusDefiner(order.status)}
            />
          </Box>
        </CardActions>
        <Divider />
        {order.boardgames.map((boardgame: any) => (
          <OrderBoardgameCard key={boardgame.id} boardgame={boardgame} />
        ))}
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <Chip
            variant="outlined"
            sx={{ mt: { xs: "5%", sm: "2%" } }}
            label={`Total: ${order.total}`}
          />
        </Box>
      </Box>
    </Card>
  );
}
