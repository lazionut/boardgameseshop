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
import { useNavigate } from "react-router-dom";

import { stockDefiner } from "../../utils/Utilities";
import { useCartContext } from "../../context/CartContext";
import { useWishlistContext } from "../../context/WishlistContext";

interface Boardgame {
  boardgame: {
    id: number;
    image: string | null;
    name: string;
    releaseYear: number;
    price: number;
    quantity: number;
  };
}

export default function BoardgameCard({ boardgame }: Boardgame) {
  const navigate = useNavigate();
  const { increaseCartItemQuantity } = useCartContext();
  const { addWishlistItem } = useWishlistContext();

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "clamp(0px, (100% - 360px + 32px) * 999, 16px)",
        transition: "transform 0.3s, border 0.3s",
        "&:hover": {
          borderColor: "inherit",
          transform: "translateY(-2px)",
        },
        "& > *": { minWidth: "clamp(0px, (360px - 100%) * 999,100%)" },
        bgcolor: "common.customDirtyWhite",
      }}
    >
      <CardActionArea onClick={() => navigate(`/boardgames/${boardgame.id}`)}>
        <CardMedia
          component="img"
          image={
            boardgame.image !== null
              ? boardgame.image
              : require("../../assets/images/no_image.jpg")
          }
          alt="boardgame image"
        />
        <CardContent>
          <Typography variant="h5">{boardgame.name}</Typography>
          <Typography variant="body1">{boardgame.releaseYear}</Typography>
          <Typography
            variant="h5"
            sx={{ mt: "2%", mb: "2%" }}
            color="text.secondary"
          >
            {boardgame.price} RON
          </Typography>
          <Typography variant="h6">
            {stockDefiner(boardgame.quantity)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          bottom: 0,
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Button size="large" onClick={() => addWishlistItem(boardgame.id)}>
          Add to wishlist
        </Button>
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
