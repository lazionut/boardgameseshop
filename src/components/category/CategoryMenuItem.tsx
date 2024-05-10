import { Box, IconButton, MenuItem, Typography } from "@mui/material";
import jwt_decode from "jwt-decode";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

import useNavigateSearch from "../../hooks/useNavigateSearch";
import { Constants, ConstantsArrays } from "../../constants/Constants";
import sendDataService from "../../services/sendDataService";
import { Configs } from "../../constants/Configs";
import AdminCategoryModal from "./AdminCategoryModal";
import { useState } from "react";

interface CategoryMenuItemProps {
  category: {
    id: number;
    name: string;
  };
  setIsCategoryDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCategoryEdited: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CategoryMenuItem({
  category,
  setIsCategoryDeleted,
  setIsCategoryEdited,
}: CategoryMenuItemProps) {
  const navigateSearch = useNavigateSearch();
  const authToken: string | null = localStorage.getItem("token");
  let accountDecoded: { [key: string]: any } | null = null;
  if (authToken !== null) {
    accountDecoded = jwt_decode(authToken);
  }

  const [isModalOpen, setIsModalOpen] = useState<boolean | undefined>(false);

  const handleCategoryDelete = async (id: number) => {
    const deleteCategoryResponse = await sendDataService.execute({
      url: `/categories/${id}`,
      method: "delete",
    });

    if (deleteCategoryResponse.status === Configs.OK_RESPONSE) {
      setIsCategoryDeleted(true);
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
                onClick={() => setIsModalOpen(true)}
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
              isOpen={isModalOpen}
              setIsOpen={setIsModalOpen}
              category={category}
              setIsCategoryEdited={setIsCategoryEdited}
            />
          </>
        )}
      </MenuItem>
    </>
  );
}
