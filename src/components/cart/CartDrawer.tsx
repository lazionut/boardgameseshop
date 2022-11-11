import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

import { useCartContext } from "../../context/CartContext";
import { CartItem } from "./CartItem";
import { useTranslation } from "react-i18next";

interface CartProps {
  isOpen: boolean;
}

export default function CartDrawer({ isOpen }: CartProps) {
  const navigate = useNavigate();
  const { closeCart, cartItems } = useCartContext();
  const { t } = useTranslation();

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

  return (
    <Grid
      container
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={closeCart}
        PaperProps={{
          sx: {
            bgcolor: "common.customLightYellow",
          },
        }}
      >
        <Box
          sx={{
            width: { sm: 600 },
          }}
          textAlign="center"
          role="presentation"
        >
          <List>
            <Box textAlign="right">
              <IconButton onClick={closeCart}>
                <IoClose size={40} />
              </IconButton>
            </Box>
            <Typography variant="h4" mb="7%">
              {t("cart")}
            </Typography>
            {cartItems.length === 0 ? (
              <Typography variant="h5">{t("empty-cart")}.</Typography>
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
                <Box mt="10%">
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
                    {t("proceed-checkout")}
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
