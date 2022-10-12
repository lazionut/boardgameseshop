import React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { stockDefiner } from "../../utils/Utilities";
import useFetchData from "../../hooks/useFetchData";

interface WishlistBoardgameCardProps {
  boardgame: {
    id: number;
    image: string | null;
    name: string;
    price: number;
    quantity: number;
  };
}

export function WishlistBoardgameCard({
  boardgame,
}: WishlistBoardgameCardProps) {
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
    <Grid item key={boardgame.id} sx={{ p: "2%" }}>
      <Box
        sx={{
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={
            blobImage && boardgame.image
              ? window.URL.createObjectURL(blobImage)
              : require("../../assets/images/no_image.jpg")
          }
          alt="boardgame image"
          width="150"
          height="180"
          style={{ objectFit: "contain" }}
        />
      </Box>
      <Typography fontSize="lg">{boardgame.name}</Typography>
      <Typography fontSize="lg">{boardgame.price}</Typography>
      <Typography fontSize="lg">{stockDefiner(boardgame.quantity)}</Typography>
      <Button
        variant="contained"
        size="small"
        onClick={() => navigate(`/boardgames/${boardgame.id}`)}
      >
        View details
      </Button>
    </Grid>
  );
}
