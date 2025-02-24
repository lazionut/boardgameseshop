import {
  Box,
  CardActions,
  CardMedia,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import no_image from "src/assets/images/no_image.jpg";
import { IMAGE_TYPE } from "src/constants/Configs";
import useFetchData from "src/hooks/useFetchData";

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
  const { t } = useTranslation();

  const imageRequestConfig = {
    url: `/blobs/${boardgame.image}`,
    method: "GET",
    responseType: IMAGE_TYPE,
  };

  const [{ data: imageData, imageLoading, imageError }] =
    useFetchData(imageRequestConfig);

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
              : no_image
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
          <Typography mb={"5%"}>
            {t("quantity")}: {boardgame.quantity}
          </Typography>
          <Chip
            variant="outlined"
            label={`${t("price")}: ${boardgame.price} RON`}
          />
        </Box>
      </CardActions>
      <Divider />
    </Box>
  );
}
