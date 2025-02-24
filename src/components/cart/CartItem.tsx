import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosRequestConfig } from "axios";
import { useTranslation } from "react-i18next";
import { BsPlusCircleFill } from "react-icons/bs";
import { FaMinusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import no_image from "src/assets/images/no_image.jpg";
import { CartItemType, useCartContext } from "src/context/CartContext";
import useFetchData from "src/hooks/useFetchData";

interface CartItemProps {
  id: number;
  setLocalCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;
}

export function CartItem({ id, setLocalCartItems }: CartItemProps) {
  const { t } = useTranslation();
  const {
    setCartItemQuantity,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    removeCartItem,
    getCartItemQuantity,
  } = useCartContext();

  const [imageRequestConfig, setImageRequestConfig] =
    useState<AxiosRequestConfig>({});

  const boardgameRequestConfig: AxiosRequestConfig = {
    url: `/boardgames/${id}`,
    method: "GET",
  };

  const [{ data: boardgameData, boardgameLoading, boardgameError }] =
    useFetchData(boardgameRequestConfig);

  useEffect(() => {
    setLocalCartItems((previousBoardgames: CartItemType[]) => [
      ...previousBoardgames,
      boardgameData,
    ]);

    if (boardgameData.image) {
      setImageRequestConfig({
        url: `/blobs/${boardgameData.image}`,
        method: "GET",
      });
    }
  }, [boardgameData]);

  const [{ data: imageData, imageLoading, imageError }] =
    useFetchData(imageRequestConfig);

  const blobImage = new Blob([new Uint8Array(imageData)], { type: "image" });

  return (
    <Stack
      display="flex"
      direction="row"
      alignItems="center"
      mb="5%"
      paddingX="5%"
    >
      <Box marginTop="5%">
        <Box
          component="img"
          sx={{
            width: 90,
            height: 100,
          }}
          src={
            blobImage && boardgameData.image
              ? window.URL.createObjectURL(blobImage)
              : no_image
          }
          alt="boardgame image"
        />
      </Box>
      <Box width="35%">
        <Grid container item justifyContent="center">
          <Typography>{boardgameData.name}</Typography>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Button onClick={() => decreaseCartItemQuantity(boardgameData.id)}>
              <FaMinusCircle size={25} />
            </Button>
            <TextField
              type="tel"
              size="small"
              sx={{ minWidth: 40 }}
              value={getCartItemQuantity(boardgameData.id)}
              onChange={(e) => {
                if (Number(e.target.value) > 0) {
                  setCartItemQuantity(boardgameData.id, Number(e.target.value));
                } else {
                  setCartItemQuantity(boardgameData.id, 1);
                }
              }}
            />
            <Button onClick={() => increaseCartItemQuantity(boardgameData.id)}>
              <BsPlusCircleFill size={25} />
            </Button>
          </Box>
        </Grid>
      </Box>
      <Box display="flex" flexDirection="column" marginLeft="auto">
        <IconButton
          sx={{ marginLeft: "auto", color: "red" }}
          onClick={() => removeCartItem(boardgameData.id)}
        >
          <MdDelete size={30} />
        </IconButton>
        <Chip label={boardgameData.price + " RON"} sx={{ mb: "10%" }} />
        <Chip
          label={
            `${t("price")}: ` +
            (
              boardgameData.price * getCartItemQuantity(boardgameData.id)
            ).toFixed(2) +
            " RON"
          }
        />
      </Box>
    </Stack>
  );
}
