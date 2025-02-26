import { useEffect, useState } from "react";

import { Box, IconButton, Menu } from "@mui/material";
import Button from "@mui/material/Button";
import { AxiosRequestConfig } from "axios";
import { useTranslation } from "react-i18next";
import { AiFillPlusSquare } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";

import AdminCategoryModal from "src/components/category/AdminCategoryModal";
import CategoryMenuItem from "src/components/category/CategoryMenuItem";
import { Constants } from "src/constants/Constants";
import { useAuthContext } from "src/context/AuthContext";
import useFetchData from "src/hooks/useFetchData";

export default function CategoriesMenu() {
  const { t } = useTranslation();
  const { accountDecoded } = useAuthContext();

  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<
    boolean | undefined
  >();
  const [isCategoryCreated, setIsCategoryCreated] = useState<boolean>(false);
  const [isCategoryEdited, setIsCategoryEdited] = useState<boolean>(false);
  const [isCategoryDeleted, setIsCategoryDeleted] = useState<boolean>(false);

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

  const [{ data: categories, loading, error }, refetchData] = useFetchData(
    getCategoriesRequestConfig
  );

  useEffect(() => {
    if (isCategoryCreated) {
      setIsCategoryCreated(false);
      refetchData();
    }
  }, [isCategoryCreated]);

  useEffect(() => {
    if (isCategoryEdited) {
      setIsCategoryEdited(false);
      refetchData();
    }
  }, [isCategoryEdited]);

  useEffect(() => {
    if (isCategoryDeleted) {
      setIsCategoryDeleted(false);
      refetchData();
    }
  }, [isCategoryDeleted]);

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
          <IconButton
            color="primary"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <AiFillPlusSquare size={35} />
          </IconButton>
        )}
        {categories.map((category: any) => (
          <CategoryMenuItem
            key={JSON.stringify(category)}
            category={category}
            setIsCategoryDeleted={setIsCategoryDeleted}
            setIsCategoryEdited={setIsCategoryEdited}
          />
        ))}
      </Menu>
      <AdminCategoryModal
        isOpen={isCreateModalOpen}
        setIsOpen={setIsCreateModalOpen}
        setIsCategoryCreated={setIsCategoryCreated}
      />
    </Box>
  );
}
