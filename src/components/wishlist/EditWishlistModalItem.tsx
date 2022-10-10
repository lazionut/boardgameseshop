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
import { AxiosRequestConfig } from "axios";
import useFetchData from "../../hooks/useFetchData";
import { useNavigate } from "react-router-dom";

import { MdDelete } from "react-icons/md";
import { stockDefiner } from "../../utils/Utilities";

interface EditWishlistModalItemProps {
  boardgame: {
    id: number;
    image: string | null;
    name: string;
    releaseYear: number;
    quantity: number;
    price: number;
  };
  localRemoveWishlistItem: (id: number) => void;
}

export function EditWishlistModalItem({
  boardgame,
  localRemoveWishlistItem,
}: EditWishlistModalItemProps) {
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "common.customDirtyWhite",
        width: 200,
        height: "100%",
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
