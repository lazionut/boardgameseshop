import React, { useEffect, useState } from "react";
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
import useFetchData from "../../hooks/useFetchData";

import { useCartContext } from "../../context/CartContext";
import { FaMinusCircle } from "react-icons/fa";
import { BsPlusCircleFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

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
    setCartItemQuantity,
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
      paddingX="5%"
    >
      <Box marginTop="5%">
        <img
          src={
            boardgameData.image
              ? boardgameData.image
              : require("../../assets/images/no_image.jpg")
          }
          width="110"
          height="80"
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
            "Price: " +
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
