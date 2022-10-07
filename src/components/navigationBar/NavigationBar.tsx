import React from "react";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { MdAccountCircle } from "react-icons/md";
import { Gi3DMeeple } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi";

import CategoriesMenu from "./CategoriesMenu";
import SwipeableTemporaryDrawer from "./SwipeableTemporaryDrawer";
import SearchBar from "./SearchBar";
import { useCartContext } from "../../context/CartContext";

export default function NavigationBar() {
  const navigate = useNavigate();
  const authToken: string | null = localStorage.getItem("token");
  const { cartQuantity, openCart } = useCartContext();

  return (
    <Box sx={{ mb: { xs: "10%", sm: "auto" } }}>
      <AppBar position="fixed">
        <Toolbar>
          {authToken && <SwipeableTemporaryDrawer />}
          <Box marginRight={"3%"}>
            <IconButton color="inherit" onClick={() => navigate("/")}>
              <Gi3DMeeple size={40} color="yellow"/>
            </IconButton>
          </Box>
          <CategoriesMenu />
          <SearchBar />
          <Box
            sx={{
              marginLeft: "auto",
            }}
          >
            <IconButton onClick={openCart}>
              <Badge badgeContent={cartQuantity} color="secondary">
                <HiShoppingBag color="white" size={35} />
              </Badge>
            </IconButton>
            {authToken === null && (
              <IconButton
                size="large"
                onClick={() => navigate("/login")}
                color="inherit"
                sx={{ flexWrap: "wrap" }}
              >
                <MdAccountCircle />
                <Typography>Login </Typography>
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
