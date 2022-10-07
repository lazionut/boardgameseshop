import React from "react";
import { Box, Button, CardActions, Grid, Typography } from "@mui/material";

import { stockDefiner } from "../../utils/Utilities";
import { useCartContext } from "../../context/CartContext";

interface BoardgameContentCardProps {
  boardgame: {
    id: number;
    image: string;
    name: string;
    price: number;
  };
}

export default function BoardgameContentCard({
  boardgame,
}: BoardgameContentCardProps) {
  const { cartItems, increaseCartItemQuantity, decreaseCartItemQuantity } =
    useCartContext();

  console.log(JSON.stringify(cartItems));

  return (
    <Grid container display="flex" justifyContent="center">
      <Grid item xs={12} justifyContent="center">
        <img
          src={
            boardgame.image
              ? boardgame.image
              : require("../../assets/images/no_image.jpg")
          }
          alt="boardgame image"
          style={
            boardgame.image
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
        <Box display="display" flexDirection="row">
          <Typography color="text.secondary">{boardgame.price} RON</Typography>
          <Typography variant="body2">
            {stockDefiner(boardgame.price)}
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <CardActions>
          <Button size="medium" variant="outlined">
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
