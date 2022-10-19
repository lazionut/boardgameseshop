import React from "react";
import { Typography, List, ListItem, ListItemText, Grid } from "@mui/material";

import { useCartContext } from "../../../context/CartContext";
import ReviewDetailItem from "./ReviewDetailItem";

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
  const { cartItems } = useCartContext();

  const cartTotal = cartItems.reduce((total, cartItem) => {
    const searchedItem = orderItems.find(
      (item: any) => item.id === cartItem.id
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
        Order summary
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
            Shipping
          </Typography>
          <Typography gutterBottom>{orderName}</Typography>
          <Typography gutterBottom>{orderAddress}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography gutterBottom>Pay cash</Typography>
            </Grid>
          </Grid>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping details
          </Typography>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography gutterBottom>Delivery by courier</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
