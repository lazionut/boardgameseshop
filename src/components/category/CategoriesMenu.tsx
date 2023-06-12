import React, { useState } from "react";

import Button from "@mui/material/Button";
import { Box, IconButton, Menu } from "@mui/material";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AxiosRequestConfig } from "axios";
import jwt_decode from "jwt-decode";
import { AiFillPlusSquare } from "react-icons/ai";
import { useTranslation } from "react-i18next";

import useFetchData from "../../hooks/useFetchData";
import CategoryMenuItem from "./CategoryMenuItem";
import AdminCategoryModal from "./AdminCategoryModal";
import { Constants } from "../../constants/Constants";

export default function CategoriesMenu() {
  const authToken: string | null = localStorage.getItem("token");
  let accountDecoded: { [key: string]: any } | null = null;
  if (authToken !== null) {
    accountDecoded = jwt_decode(authToken);
  }
  const { t } = useTranslation();

  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = Boolean(anchorElement);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElement(null);
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
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Button
        sx={{
          bgcolor: "common.customLightYellow",
          color: "black",
          display: "block",
        }}
        onClick={handleClick}
      >
        {t("categories")}
        <MdKeyboardArrowDown size={20} style={{ verticalAlign: "middle" }} />
      </Button>
      <Menu anchorEl={anchorElement} open={open} onClose={handleClose}>
        {accountDecoded?.Role === Constants.ADMIN && (
          <IconButton color="primary" onClick={() => setIsOpen(true)}>
            <AiFillPlusSquare size={35} />
          </IconButton>
        )}
        {categories.map((category: any) => (
          <CategoryMenuItem key={category} category={category} />
        ))}
      </Menu>
      <AdminCategoryModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </Box>
  );
}
