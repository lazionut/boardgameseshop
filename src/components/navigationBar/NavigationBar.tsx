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
import { FaHeart, FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import CategoriesMenu from "../category/CategoriesMenu";
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
    <Box sx={{ mb: { xs: 5, sm: "auto", lg: "1%" } }}>
      <AppBar position="fixed" sx={{ bgcolor: "common.customCavernClay" }}>
        <Toolbar>
          {authToken && <SwipeableTemporaryDrawer />}
          <Box marginRight={"3%"}>
            <IconButton
              sx={{ color: "common.customDarkTurqoise" }}
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
            <IconButton
              onClick={() => {
                if (authToken) {
                  openWishlist();
                } else {
                  navigate("login");
                }
              }}
            >
              <Badge badgeContent={wishlistItems?.length} color="secondary">
                <Box sx={{ color: "common.customDarkTurqoise" }}>
                  <FaHeart size={30} />
                </Box>
              </Badge>
            </IconButton>
            <IconButton onClick={openCart}>
              <Badge badgeContent={cartQuantity} color="secondary">
                <Box sx={{ color: "common.customDarkTurqoise" }}>
                  <FaShoppingBag size={30} />
                </Box>
              </Badge>
            </IconButton>
            {authToken === null && (
              <IconButton
                size="large"
                onClick={() => navigate("/login")}
                color="inherit"
                sx={{ flexWrap: "wrap" }}
              >
                <Box
                  sx={{ flex: "display", color: "common.customDarkTurqoise" }}
                >
                  <MdAccountCircle />
                  <Typography>Login </Typography>
                </Box>
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
