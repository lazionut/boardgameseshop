import { Typography, ListItem, ListItemText, Box } from "@mui/material";
import { AxiosRequestConfig } from "axios";
import { useTranslation } from "react-i18next";

import { CartItemType, useCartContext } from "../../../context/CartContext";
import useFetchData from "../../../hooks/useFetchData";

interface ReviewDetailItemProps {
  cartItem: CartItemType;
}

export default function ReviewDetailItem({ cartItem }: ReviewDetailItemProps) {
  const { t } = useTranslation();
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
        <Typography variant="body2" marginLeft="auto">
          {boardgameData.price} RON
        </Typography>
        <Typography variant="body2">
          {`${t("shipping-details")}: `}
          {(
            boardgameData.price * getCartItemQuantity(boardgameData.id)
          ).toFixed(2)}{" "}
          RON
        </Typography>
      </Box>
    </ListItem>
  );
}
