import { useState } from "react";

import { Box, IconButton, MenuItem, Typography } from "@mui/material";
import jwt_decode from "jwt-decode";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

import useNavigateSearch from "../../hooks/useNavigateSearch";
import { Constants, ConstantsArrays } from "../../constants/Constants";
import sendDataService from "../../services/sendDataService";
import { Configs } from "../../constants/Configs";
import AdminCategoryModal from "./AdminCategoryModal";

interface CategoryMenuItemProps {
  category: {
    id: number;
    name: string;
  };
}

export default function CategoryMenuItem({ category }: CategoryMenuItemProps) {
  const navigateSearch = useNavigateSearch();
  const authToken: string | null = localStorage.getItem("token");
  let accountDecoded: { [key: string]: any } | null = null;
  if (authToken !== null) {
    accountDecoded = jwt_decode(authToken);
  }

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCategoryDelete = async (id: number) => {
    const deleteCategoryResponse = await sendDataService.execute({
      url: `/categories/${id}`,
      method: "delete"
    });

    if (deleteCategoryResponse.status === Configs.OK_RESPONSE) {
      window.location.reload();
    }
  };

  return (
    <>
      <MenuItem
        key={category.id}
        sx={{
          justifyContent: "space-between",
          minWidth: 130,
        }}
      >
        <Typography
          onClick={() => {
            navigateSearch(`/categories/${category.id}/boardgames`, {
              pageIndex: Constants.DEFAULT_PAGE_INDEX,
              pageSize: Constants.DEFAULT_PAGE_SIZE,
              sortOrder: ConstantsArrays.SORT_OPTIONS[0],
            });
          }}
        >
          {category.name}
        </Typography>
        {accountDecoded?.Role === Constants.ADMIN && (
          <>
            <Box justifyContent="center">
              <IconButton
                sx={{ marginLeft: "auto" }}
                onClick={() => setIsOpen(true)}
              >
                <GrEdit size={25} />
              </IconButton>
              <IconButton
                sx={{ marginLeft: "auto", color: "red" }}
                onClick={() => handleCategoryDelete(category.id)}
              >
                <MdDelete size={30} />
              </IconButton>
            </Box>
            <AdminCategoryModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              category={category}
            />
          </>
        )}
      </MenuItem>
    </>
  );
}
