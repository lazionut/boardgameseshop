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

  const imageType: any = "arraybuffer";

  const imageRequestConfig = {
    url: `/blobs/${boardgame.image}`,
    method: "GET",
    responseType: imageType,
  };

  const { data: imageData, loading, error } = useFetchData(imageRequestConfig);

  const blobImage = new Blob([new Uint8Array(imageData)], { type: "image" });

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
