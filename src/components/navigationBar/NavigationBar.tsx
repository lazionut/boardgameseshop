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
import { Gi3DMeeple, GiMineralHeart } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi";

import CategoriesMenu from "./CategoriesMenu";
import SwipeableTemporaryDrawer from "./SwipeableTemporaryDrawer";
import SearchBar from "./SearchBar";
import { useCartContext } from "../../context/CartContext";
import { useWishlistContext } from "../../context/WishlistContext";

export default function NavigationBar() {
  const navigate = useNavigate();
  const authToken: string | null = localStorage.getItem("token");
  const { cartQuantity, openCart } = useCartContext();
  const { wishlistItems, openWishlist } = useWishlistContext();

  return (
    <Box sx={{ mb: { xs: "10%", sm: "auto" } }}>
      <AppBar position="fixed" sx={{ bgcolor: "common.customCyan" }}>
        <Toolbar>
          {authToken && <SwipeableTemporaryDrawer />}
          <Box marginRight={"3%"}>
            <IconButton
              sx={{ color: "common.customRedOrange" }}
              onClick={() => navigate("/")}
            >
              <Gi3DMeeple size={40} />
            </IconButton>
          </Box>
          <CategoriesMenu />
          <SearchBar />
          <Box
            sx={{
              marginLeft: "auto",
            }}
          >
            <IconButton onClick={openWishlist}>
              <Badge badgeContent={wishlistItems?.length} color="secondary">
                <FaHeart color="white" size={30} />
              </Badge>
            </IconButton>
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
