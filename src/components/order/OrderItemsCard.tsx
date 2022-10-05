import React from "react";
import Card from "@mui/joy/Card";
import {
  Box,
  CardActions,
  CardMedia,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { orderStatusDefiner } from "../../utils/Utilities";
import OrderBoardgameCard from "./OrderBoardgameCard";

interface OrderItem {
  order: {
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
  return (
    <Card
      variant="outlined"
      row
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box flexDirection="row" width="100%">
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
            <Typography mt={"5%"}>Ordered on: {order.creationDate}</Typography>
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
