import React, { useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import { MdMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { GiTabletopPlayers } from "react-icons/gi";

import authenticationService from "../../services/authenticationService";

export default function SwipeableTemporaryDrawer() {
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        sx={{ mr: "5%" }}
        onClick={() => setOpen(true)}
      >
        <MdMenu />
      </IconButton>
      <SwipeableDrawer
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        PaperProps={{
          sx: {
            bgcolor: "#e8e4c9",
          },
        }}
      >
        <Box
          sx={{ width: { xs: 150, sm: 250 } }}
          onClick={() => setOpen(false)}
        >
          <List>
            <ListItem sx={{ ml: "-0.5vw", justifyContent: "center" }}>
              <GiTabletopPlayers size={100} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/")}>
                <ListItemText primary={"Home"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/account")}>
                <ListItemText primary={"My account"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/wishlists")}>
                <ListItemText primary={"My wishlists"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/orders")}>
                <ListItemText primary={"Order history"} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  authenticationService.logout();
                  navigate("/");
                }}
              >
                <ListItemText primary={"Sign out"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </SwipeableDrawer>
    </div>
  );
}
