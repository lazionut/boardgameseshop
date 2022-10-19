import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { MdDelete } from "react-icons/md";
import { stockDefiner } from "../../utils/Utilities";

interface WishlistModalItemTemplateProps {
  boardgame: {
    id: number;
    image: string | null;
    name: string;
    releaseYear: number;
    quantity: number;
    price: number;
  };
  blobImage: Blob;
  localRemoveWishlistItem: (id: number) => void;
}

export function WishlistModalItemTemplate({
  boardgame,
  blobImage,
  localRemoveWishlistItem,
}: WishlistModalItemTemplateProps) {
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "common.customLightYellow",
        width: 200,
        height: "100%",
        border: 1,
        boxShadow: 12,
      }}
    >
      <CardActions>
        <IconButton
          sx={{ marginLeft: "auto", color: "red" }}
          onClick={() => localRemoveWishlistItem(boardgame.id)}
        >
          <MdDelete size={30} />
        </IconButton>
      </CardActions>
      <CardActionArea
        onClick={() => navigate(`/boardgames/${boardgame.id}`)}
        sx={{ color: "black" }}
      >
        <CardMedia
          component="img"
          image={
            blobImage && boardgame.image
              ? window.URL.createObjectURL(blobImage)
              : require("../../assets/images/no_image.jpg")
          }
          sx={{ width: "100%", height: 200, objectFit: "fill" }}
          alt="boardgame image"
        />
        <CardContent>
          <Typography variant="h5">{boardgame.name}</Typography>
          <Typography variant="body1">{boardgame.releaseYear}</Typography>
          <Typography
            variant="h5"
            sx={{ mt: "5%", mb: "5%" }}
            color="text.secondary"
          >
            {boardgame.price} RON
          </Typography>
          <Typography variant="h6">
            {stockDefiner(boardgame.quantity)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
