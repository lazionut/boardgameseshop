import React, { useState } from "react";
import { Box, Button, Drawer, Grid, List, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useCartContext } from "../../../context/CartContext";
import { CartItem } from "./CartItem";

interface CartProps {
  isOpen: boolean;
  getCartTotal?: () => void;
}

export default function CartDrawer({ isOpen, getCartTotal }: CartProps) {
  const navigate = useNavigate();
  const { closeCart, cartItems } = useCartContext();
  const [localCartItems, setLocalCartItems] = useState<any>([{}]);

  const cartTotal = cartItems.reduce((total, cartItem) => {
    const searchedItem = localCartItems.find(
      (item: any) => item.id === cartItem.id
    );

    if (searchedItem !== undefined) {
      return Number(
        (total + searchedItem.price * cartItem.quantity).toFixed(2)
      );
    }

    return total;
  }, 0);

  console.log("Local cart items are: " + JSON.stringify(localCartItems));

  return (
    <Grid
      container
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Drawer anchor="right" open={isOpen} onClose={closeCart}>
        <Box width="270" textAlign="center" role="presentation">
          <List sx={{ width: "100%" }}>
            <Typography variant="h4" mb="7%">
              Cart
            </Typography>
            {cartItems.length === 0 ? (
              <Typography variant="h5">No items in cart.</Typography>
            ) : (
              <>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    {...item}
                    localCartItems={localCartItems}
                    setLocalCartItems={setLocalCartItems}
                  />
                ))}
                <Box mt="5%">
                  <Typography variant="h4">Total: {cartTotal} RON</Typography>
                  <Button
                    variant="contained"
                    onClick={() => {
                      closeCart();
                      navigate("/orders/checkout", {
                        state: { cartItems: localCartItems },
                      });
                    }}
                  >
                    Proceed to checkout
                  </Button>
                </Box>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </Grid>
  );
}
