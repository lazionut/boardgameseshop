import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosRequestConfig } from "axios";
import useFetchData from "../../../hooks/useFetchData";

import { useCartContext } from "../../../context/CartContext";
import { FaMinusCircle } from "react-icons/fa";
import { BsPlusCircleFill } from "react-icons/bs";

interface CartItemProps {
  id: number;
  quantity: number;
  localCartItems: any;
  setLocalCartItems: React.Dispatch<React.SetStateAction<any>>;
}

export function CartItem({
  id,
  localCartItems,
  setLocalCartItems,
}: CartItemProps) {
  const {
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    removeCartItem,
    getCartItemQuantity,
  } = useCartContext();

  const boardgameRequestConfig: AxiosRequestConfig = {
    url: `/boardgames/${id}`,
    method: "GET",
  };

  const {
    data: boardgameData,
    loading,
    error,
  } = useFetchData(boardgameRequestConfig);

  useEffect(() => {
    setLocalCartItems([...localCartItems, boardgameData]);
  }, [boardgameData]);

  return (
    <Stack
      display="flex"
      direction="row"
      alignItems="center"
      mb="5%"
      justifyContent="center"
      paddingX="5%"
    >
      <img
        src={
          boardgameData.image
            ? boardgameData.image
            : require("../../../assets/images/no_image.jpg")
        }
        width="110"
        height="80"
      />
      <Box width="35%">
        <Grid container item justifyContent="center">
          <Typography>{boardgameData.name}</Typography>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Button onClick={() => decreaseCartItemQuantity(boardgameData.id)}>
              <FaMinusCircle size={25} />
            </Button>
            <Typography>{getCartItemQuantity(boardgameData.id)}</Typography>
            <Button onClick={() => increaseCartItemQuantity(boardgameData.id)}>
              <BsPlusCircleFill size={25} />
            </Button>
          </Box>
        </Grid>
      </Box>
      <Box display="flex" flexDirection="column" marginLeft="auto">
        <Chip label={boardgameData.price + " RON"} sx={{ mb: "10%" }} />
        <Chip
          label={
            "Total price: " +
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
