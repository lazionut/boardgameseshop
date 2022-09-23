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

export default function NavigationBar() {
  const navigate = useNavigate();

  const [auth, setAuth] = useState<boolean>(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box marginRight={5}>
            <IconButton color="inherit" onClick={() => navigate("/")}>
              <Gi3DMeeple size={40} />
            </IconButton>
          </Box>
          <CategoriesMenu />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <IconButton
            size="large"
            onClick={() => navigate("/login")}
            color="inherit"
          >
            <MdAccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
