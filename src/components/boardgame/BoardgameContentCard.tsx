import React from "react";
import { Box, Button, CardActions, Grid, Typography } from "@mui/material";

import { stockDefiner } from "../../utils/Utilities";

interface BoardgameContentCardProps {
  image: string;
  name: string;
  price: number;
}

export default function BoardgameContentCard({
  image,
  name,
  price,
}: BoardgameContentCardProps) {
  return (
    <Grid container display="flex" justifyContent="center">
      <Grid item xs={12} justifyContent="center">
        <img
          src={image ? image : require("../../assets/images/no_image.jpg")}
          alt="boardgame image"
          style={
            image
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
        <Typography variant="h5">{name}</Typography>
        <Box display="display" flexDirection="row">
          <Typography color="text.secondary">{price} RON</Typography>
          <Typography variant="body2">{stockDefiner(price)}</Typography>
        </Box>
      </Grid>
      <Grid item>
        <CardActions>
          <Button size="medium" variant="outlined">
            Add to wishlist
          </Button>
          <Button size="medium" variant="outlined">
            Buy now
          </Button>
        </CardActions>
      </Grid>
    </Grid>
  );
}
