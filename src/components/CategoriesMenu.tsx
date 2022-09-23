import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Menu, MenuItem } from "@mui/material";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AxiosRequestConfig } from "axios";

import useFetchData from "../hooks/useFetchData";
import useNavigateSearch from "../hooks/useNavigateSearch";

import { Constants } from "../constants/Constants";

export default function CategoriesMenu() {
  const navigateSearch = useNavigateSearch();

  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorElement);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElement(null);
  };

  const getCategoriesRequestConfig: { [key: string]: string } = {
    url: "/categories",
    method: "GET",
  };

  const {
    data: categories,
    loading,
    error,
  } = useFetchData(getCategoriesRequestConfig);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Button
        sx={{
          my: 2,
          backgroundColor: "white",
          color: "black",
          display: "block",
        }}
        onClick={handleClick}
      >
        Categories
        <MdKeyboardArrowDown size={20} style={{ verticalAlign: "middle" }} />
      </Button>
      <Menu anchorEl={anchorElement} open={open} onClose={handleClose}>
        {categories.map((category: any, index: number) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleClose();
              navigateSearch(`/categories/${category.id}/boardgames`, {
                pageIndex: Constants.DEFAULT_PAGE_INDEX,
                pageSize: Constants.DEFAULT_PAGE_SIZE,
                sortOrder: Constants.DEFAULT_SORT_ORDER,
              });
            }}
          >
            {category.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
