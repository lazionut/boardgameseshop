import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { MdAccountCircle } from "react-icons/md";
import { Gi3DMeeple } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

import CategoriesMenu from "./CategoriesMenu";
import { Menu, MenuItem } from "@mui/material";

export default function NavigationBar() {
  const navigate = useNavigate();

  const [auth, setAuth] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    navigate("/login");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1, mb: { xs: "22%", sm: "3%", md: "5%", lg: "5%" } }}>
      <AppBar position="fixed">
        <Toolbar>
          <Box marginRight={5}>
            <IconButton color="inherit" onClick={() => navigate("/")}>
              <Gi3DMeeple size={40} />
            </IconButton>
          </Box>
          <CategoriesMenu />
          <Typography sx={{ flexGrow: 1 }}></Typography>

          <IconButton
            size="large"
            onClick={handleMenu}
            color="inherit"
            sx={{ flexWrap: "wrap" }}
          >
            <MdAccountCircle />
            <Typography>Login </Typography>
          </IconButton>
          {auth && (
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Log out</MenuItem>
            </Menu>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
