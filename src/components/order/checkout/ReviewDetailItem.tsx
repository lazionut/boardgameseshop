import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Box,
} from "@mui/material";
import { CartItemType, useCartContext } from "../../../context/CartContext";
import { AxiosRequestConfig } from "axios";
import useFetchData from "../../../hooks/useFetchData";

interface ReviewDetailItemProps {
  cartItem: CartItemType;
}

export default function ReviewDetailItem({ cartItem }: ReviewDetailItemProps) {
  const { getCartItemQuantity } = useCartContext();

  const boardgameRequestConfig: AxiosRequestConfig = {
    url: `/boardgames/${cartItem.id}`,
    method: "GET",
  };

  const {
    data: boardgameData,
    loading,
    error,
  } = useFetchData(boardgameRequestConfig);

  return (
    <ListItem sx={{ py: 1, px: 0 }}>
      <ListItemText
        primary={boardgameData.name}
        secondary={"x " + getCartItemQuantity(boardgameData.id)}
      />
      <Box display="flex" flexDirection="column">
        <Typography variant="body2" marginLeft="auto">{boardgameData.price} RON</Typography>
        <Typography variant="body2">
          {"Total price: "}
          {(
            boardgameData.price * getCartItemQuantity(boardgameData.id)
          ).toFixed(2)} RON
        </Typography>
      </Box>
    </ListItem>
  );
}
