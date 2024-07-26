import { Typography, List, ListItem, ListItemText, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

import ReviewDetailItem from "./ReviewDetailItem";
import { CartItemType, useCartContext } from "../../../context/CartContext";

export interface ReviewDetailsProps {
  orderItems: any;
  orderName: string;
  orderAddress: string;
}

export default function ReviewDetails({
  orderItems,
  orderName,
  orderAddress,
}: ReviewDetailsProps) {
  const { t } = useTranslation();
  const { cartItems } = useCartContext();

  const cartTotal = cartItems.reduce((total, cartItem) => {
    const searchedItem = orderItems.find(
      (item: CartItemType) => item.id === cartItem.id
    );

    if (searchedItem !== undefined) {
      return Number(
        (total + searchedItem.price * cartItem.quantity).toFixed(2)
      );
    }

    return total;
  }, 0);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {t("order-summary")}
      </Typography>
      <List disablePadding>
        {cartItems.map((cartItem) => (
          <ReviewDetailItem key={cartItem.id} cartItem={cartItem} />
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {cartTotal} RON
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            {t("shipping-address")}
          </Typography>
          <Typography gutterBottom>{orderName}</Typography>
          <Typography gutterBottom>{orderAddress}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            {t("payment-details")}
          </Typography>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography gutterBottom>{t("pay-cash")}</Typography>
            </Grid>
          </Grid>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            {t("shipping-details")}
          </Typography>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography gutterBottom> {t("delivery-by-courier")}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
