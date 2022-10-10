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

import { useCartContext } from "../../context/CartContext";
import { FaMinusCircle } from "react-icons/fa";
import { BsPlusCircleFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useWishlistContext } from "../../context/WishlistContext";
import { stockDefiner } from "../../utils/Utilities";

interface WishlistModalItemProps {
  id: number;
}

export function WishlistModalItem({ id }: WishlistModalItemProps) {
  const navigate = useNavigate();
  const { removeWishlistItem, wishlistItems } = useWishlistContext();

  const boardgameRequestConfig: AxiosRequestConfig = {
    url: `/boardgames/${id}`,
    method: "GET",
  };

  const {
    data: boardgameData,
    loading,
    error,
  } = useFetchData(boardgameRequestConfig);

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
            boardgameData.image !== null
              ? boardgameData.image
              : require("../../assets/images/no_image.jpg")
          }
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
