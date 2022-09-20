import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Menu, MenuItem } from "@mui/material";
import { AxiosRequestConfig } from "axios";

import useFetchData from "../hooks/fetchData";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CategoriesMenu() {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getCategoriesRequestConfig: AxiosRequestConfig = {
    url: "/categories",
    method: "GET",
  };

  const {
    data: categories,
    loading,
    error,
  } = useFetchData(getCategoriesRequestConfig);

  return (
    <div>
      <Button
        sx={{ my: 2, color: "white", display: "block" }}
        onClick={handleClick}
      >
        Categories
      </Button>
      <Menu id="basic-menu" open={open} onClose={handleClose}>
        {categories.map((category: any, index: number) => (
          <MenuItem key={index} onClick={handleClose}>
            {category.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
