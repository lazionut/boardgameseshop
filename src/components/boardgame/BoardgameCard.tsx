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
  const navigate = useNavigate();

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
      onClick={() => navigate(`/boardgame/${id}`)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={
            image === null
              ? require("../../assets/images/no_image.jpg")
              : { image }
          }
          alt="no image"
        />
        <CardContent>
          <Typography variant="h5">{name}</Typography>
          <Typography sx={{ mb: "2%" }} color="text.secondary">
            {price} RON
          </Typography>
          <Typography variant="body2">{stockDefiner(quantity)}</Typography>
        </CardContent>
        <CardActions>
          <Button size="large">Buy now</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
