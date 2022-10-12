import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosRequestConfig } from "axios";
import useFetchData from "../../hooks/useFetchData";
import { useNavigate } from "react-router-dom";

import { MdDelete } from "react-icons/md";
import { useWishlistContext } from "../../context/WishlistContext";
import { stockDefiner } from "../../utils/Utilities";

interface WishlistModalItemProps {
  id: number;
}

export function WishlistModalItem({ id }: WishlistModalItemProps) {
  const navigate = useNavigate();
  const { removeWishlistItem, wishlistItems } = useWishlistContext();

  const [imageRequestConfig, setImageRequestConfig] =
    useState<AxiosRequestConfig>({});

  const boardgameRequestConfig: AxiosRequestConfig = {
    url: `/boardgames/${id}`,
    method: "GET",
  };

  const {
    data: boardgameData,
    boardgameLoading,
    boardgameError,
  } = useFetchData(boardgameRequestConfig);

  useEffect(() => {
    if (boardgameData.image) {
      setImageRequestConfig({
        url: `/blobs/${boardgameData.image}`,
        method: "GET",
        responseType: imageType,
      });
    }
  }, [boardgameData]);

  const imageType: any = "arraybuffer";

  const {
    data: imageData,
    imageLoading,
    imageError,
  } = useFetchData(imageRequestConfig);

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
          onClick={() => removeWishlistItem(boardgameData.id)}
        >
          <MdDelete size={30} />
        </IconButton>
      </CardActions>
      <CardActionArea
        onClick={() => navigate(`/boardgames/${boardgameData.id}`)}
      >
        <CardMedia
          component="img"
          image={
            blobImage && boardgameData.image
              ? window.URL.createObjectURL(blobImage)
              : require("../../assets/images/no_image.jpg")
          }
          sx={{ width: "100%", height: 200, objectFit: "fill" }}
          alt="boardgame image"
        />
        <CardContent>
          <Typography variant="h5">{boardgameData.name}</Typography>
          <Typography variant="body1">{boardgameData.releaseYear}</Typography>
          <Typography
            variant="h5"
            sx={{ mt: "5%", mb: "5%" }}
            color="text.secondary"
          >
            {boardgameData.price} RON
          </Typography>
          <Typography variant="h6">
            {stockDefiner(boardgameData.quantity)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
