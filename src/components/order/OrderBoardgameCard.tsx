import React from "react";
import {
  Box,
  CardActions,
  CardMedia,
  Typography,
  Chip,
  Divider,
} from "@mui/material";

interface OrderBoardgameCardProps {
  boardgame: {
    name: string;
    quantity: number;
    price: number;
  };
}

export default function OrderBoardgameCard({
  boardgame,
}: OrderBoardgameCardProps) {
  return (
    <Box sx={{ ml: "0.5%" }}>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <CardMedia
          component="img"
          image={require("../../assets/images/no_image.jpg")}
          alt="no image"
          sx={{ width: 90, height: 70 }}
        />
        <Typography fontSize="lg" ml={"2%"} sx={{ marginRight: "auto" }}>
          {boardgame.name}
        </Typography>
        <Box>
          <Typography mb={"5%"}>Quantity: {boardgame.quantity}</Typography>
          <Chip variant="outlined" label={`Price: ${boardgame.price}`} />
        </Box>
      </CardActions>
      <Divider />
    </Box>
  );
}
