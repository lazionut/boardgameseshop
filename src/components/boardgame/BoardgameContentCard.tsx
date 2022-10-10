import React from "react";
import { Box, Button, CardActions, Grid, Typography } from "@mui/material";

import { stockDefiner } from "../../utils/Utilities";
import { useCartContext } from "../../context/CartContext";
import { useWishlistContext } from "../../context/WishlistContext";

interface BoardgameContentCardProps {
  boardgame: {
    id: number;
    image: string | null;
    name: string;
    releaseYear: string;
    price: number;
    quantity: number;
  };
}

export default function BoardgameContentCard({
  boardgame,
}: BoardgameContentCardProps) {
  const { increaseCartItemQuantity } = useCartContext();
  const { addWishlistItem } = useWishlistContext();

  return (
    <Grid container display="flex" justifyContent="center">
      <Grid item xs={12} justifyContent="center">
        <img
          src={
            boardgame.image !== null
              ? boardgame.image
              : require("../../assets/images/no_image.jpg")
          }
          alt="boardgame image"
          style={
            boardgame.image !== null
              ? {
                  width: 300,
                  height: 300,
                }
              : {
                  width: 320,
                  height: 220,
                }
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{boardgame.name}</Typography>
        <Typography variant="body1">{boardgame.releaseYear}</Typography>
        <Box display="display" flexDirection="row">
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
        </Box>
      </Grid>
      <Grid item>
        <CardActions>
          <Button
            size="medium"
            variant="outlined"
            onClick={() => addWishlistItem(boardgame.id)}
          >
            Add to wishlist
          </Button>
          <Button
            size="medium"
            variant="outlined"
            onClick={() => increaseCartItemQuantity(boardgame.id)}
          >
            Buy now
          </Button>
        </CardActions>
      </Grid>
    </Grid>
  );
}
