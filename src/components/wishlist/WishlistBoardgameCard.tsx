import { Grid, Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { IMAGE_TYPE } from "../../constants/Configs";
import useFetchData from "../../hooks/useFetchData";
import { stockDefiner } from "../../utils/Utilities";
import { LoadingCircle } from "../common/LoadingCircle";

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

  const {t} = useTranslation();

  const imageRequestConfig = {
    url: `/blobs/${boardgame.image}`,
    method: "GET",
    responseType: IMAGE_TYPE,
  };

  const [{ data: imageData, loading, error }] = useFetchData(imageRequestConfig);

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
        {loading === false ? (
          <Box
            component="img"
            sx={{
              width: 150,
              height: 180,
              objectFit: "contain",
            }}
            src={
              blobImage && boardgame.image
                ? window.URL.createObjectURL(blobImage)
                : require("../../assets/images/no_image.jpg")
            }
            alt="boardgame image"
          />
        ) : (
          <LoadingCircle widthParam="150" heightParam="180" />
        )}
      </Box>
      <Typography fontSize="lg">{boardgame.name}</Typography>
      <Typography fontSize="lg">{boardgame.price}</Typography>
      <Typography fontSize="lg">{stockDefiner(boardgame.quantity)}</Typography>
      <Button
        variant="contained"
        size="small"
        onClick={() => navigate(`/boardgames/${boardgame.id}`)}
      >
        {t("view-details")}
      </Button>
    </Grid>
  );
}
