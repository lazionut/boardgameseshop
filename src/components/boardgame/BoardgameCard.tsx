import React, { useState } from "react";
import Button from "@mui/material/Button";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { stockDefiner } from "../../utils/Utilities";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";

interface Boardgame {
  boardgame: {
    id: number;
    image: string | null;
    name: string;
    price: number;
    quantity: number;
  };
}

export default function BoardgameCard({ boardgame }: Boardgame) {
  const navigate = useNavigate();
  const { increaseCartItemQuantity } = useCartContext();

  return (
    <Card
      variant="outlined"
      style={{ height: "fit-content" }}
      sx={{
        gap: "clamp(0px, (100% - 360px + 32px) * 999, 16px)",
        transition: "transform 0.3s, border 0.3s",
        "&:hover": {
          borderColor: "inherit",
          transform: "translateY(-2px)",
        },
        "& > *": { minWidth: "clamp(0px, (360px - 100%) * 999,100%)" },
      }}
    >
      <CardActionArea onClick={() => navigate(`/boardgames/${boardgame.id}`)}>
        <CardMedia
          component="img"
          image={
            boardgame.image === null
              ? require("../../assets/images/no_image.jpg")
              : boardgame.image
          }
          alt="no image"
        />
        <CardContent>
          <Typography variant="h5">{boardgame.name}</Typography>
          <Typography sx={{ mb: "2%" }} color="text.secondary">
            {boardgame.price} RON
          </Typography>
          <Typography variant="body2">
            {stockDefiner(boardgame.quantity)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="large"
          onClick={() => increaseCartItemQuantity(boardgame.id)}
        >
          Buy now
        </Button>
      </CardActions>
    </Card>
  );
}
