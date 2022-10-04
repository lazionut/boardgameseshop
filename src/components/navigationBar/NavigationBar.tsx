import React from "react";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { MdAccountCircle } from "react-icons/md";
import { Gi3DMeeple } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

import CategoriesMenu from "../CategoriesMenu";
import SwipeableTemporaryDrawer from "./SwipeableTemporaryDrawer";

export default function NavigationBar() {
  const navigate = useNavigate();
  const authToken: string | null = localStorage.getItem("token");

  return (
    <AppBar position="fixed">
      <Toolbar>
        <SwipeableTemporaryDrawer />
        <Box marginRight={"3%"}>
          <IconButton color="inherit" onClick={() => navigate("/")}>
            <Gi3DMeeple size={40} />
          </IconButton>
        </Box>
        <CategoriesMenu />
        {authToken === null && (
          <Box
            sx={{
              marginLeft: "auto",
            }}
          >
            <IconButton
              size="large"
              onClick={() => navigate("/login")}
              color="inherit"
              sx={{ flexWrap: "wrap" }}
            >
              <MdAccountCircle />
              <Typography>Login </Typography>
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
