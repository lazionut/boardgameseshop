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
import authenticationService from "../../services/authenticationService";

export default function SwipeableTemporaryDrawer() {
  const authToken: string | null = localStorage.getItem("token");
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {authToken && (
        <div>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={() => setOpen(true)}
          >
            <MdMenu />
          </IconButton>
          <SwipeableDrawer
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <Box
              sx={{ width: { xs: 150, sm: 250 } }}
              onClick={() => setOpen(false)}
            >
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate("/account")}>
                    <ListItemText primary={"My account"} />
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
      )}
    </>
  );
}
