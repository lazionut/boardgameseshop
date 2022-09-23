import React, { useState } from "react";
import Button from "@mui/material/Button";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { stockDefiner } from "../utils/Utilities";

interface Boardgame {
  id: number;
  image: string | null;
  name: string;
  price: number;
  quantity: number;
}

export default function BoardgameCard({
  id,
  image,
  name,
  price,
  quantity,
}: Boardgame) {
  return (
    <Card variant="outlined" style={{ height: "fit-content" }}>
      <CardMedia
        component="img"
        image={
          image === null ? require("../assets/images/no-image.jpg") : { image }
        }
        alt="no image"
      />
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {price} RON
        </Typography>
        <Typography variant="body2">{stockDefiner(quantity)}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Buy now</Button>
      </CardActions>
    </Card>
  );
}
