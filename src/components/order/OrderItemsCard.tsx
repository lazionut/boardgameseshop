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
            <Typography mt={2}>Ordered on: {order.creationDate}</Typography>
            <Chip
              variant="outlined"
              color="primary"
              sx={{ mt: 2 }}
              label={orderStatusDefiner(order.status)}
            />
          </Box>
        </CardActions>
        <Divider />
        {order.boardgames.map((boardgame: any, index: number) => (
          <Box key={index} sx={{ ml: 0.5 }}>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <CardMedia
                component="img"
                image={require("../../assets/images/no-image.jpg")}
                alt="no image"
                sx={{ width: 90, height: 70 }}
              />
              <Typography
                fontSize="lg"
                ml={2}
                mb={0.5}
                sx={{ marginRight: "auto" }}
              >
                {boardgame.name}
              </Typography>
              <Box>
                <Typography mb={1}>Quantity: {boardgame.quantity}</Typography>
                <Chip variant="outlined" label={`Price: ${boardgame.price}`} />
              </Box>
            </CardActions>
            <Divider />
          </Box>
        ))}
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <Chip
            variant="outlined"
            sx={{ mt: 2 }}
            label={`Total: ${order.total}`}
          />
        </Box>
      </Box>
    </Card>
  );
}
