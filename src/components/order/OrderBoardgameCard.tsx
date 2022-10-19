import React from "react";
import {
  Box,
  CardActions,
  CardMedia,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
import jwt_decode from "jwt-decode";

import useFetchData from "../../hooks/useFetchData";

interface OrderBoardgameCardProps {
  boardgame: {
    image: string;
    name: string;
    quantity: number;
    price: number;
  };
}

export default function OrderBoardgameCard({
  boardgame,
}: OrderBoardgameCardProps) {
  const authToken: string | null = localStorage.getItem("token");
  let accountDecoded: { [key: string]: any } | null = null;

  if (authToken !== null) {
    accountDecoded = jwt_decode(authToken);
  }

  const imageType: any = "arraybuffer";

  const imageRequestConfig = {
    url: `/blobs/${boardgame.image}`,
    method: "GET",
    responseType: imageType,
  };

  const {
    data: imageData,
    imageLoading,
    imageError,
  } = useFetchData(imageRequestConfig);

  const blobImage = new Blob([new Uint8Array(imageData)], { type: "image" });

  return (
    <Box sx={{ ml: "0.5%" }}>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
        }}
      >
        <CardMedia
          component="img"
          image={
            blobImage && boardgame.image !== null
              ? window.URL.createObjectURL(blobImage)
              : require("../../assets/images/no_image.jpg")
          }
          alt="boardgame image"
          sx={{ width: 130, height: 150, objectFit: "contain" }}
        />
        <Box sx={{ marginRight: { xs: 0, sm: "auto" } }}>
          <Typography fontSize="lg" ml={"2%"}>
            {boardgame.name}
          </Typography>
        </Box>
        <Box>
          <Typography mb={"5%"}>Quantity: {boardgame.quantity}</Typography>
          <Chip variant="outlined" label={`Price: ${boardgame.price}`} />
        </Box>
      </CardActions>
      <Divider />
    </Box>
  );
}
