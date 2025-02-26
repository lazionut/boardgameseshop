import { useState } from "react";

import {
  Box,
  Button,
  CardActions,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import no_image from "src/assets/images/no_image.jpg";
import AdminBoardgameActions from "src/components/boardgame/AdminBoardgameActions";
import AdminBoardgameModal from "src/components/boardgame/AdminBoardgameModal";
import { LoadingCircle } from "src/components/common/LoadingCircle";
import { Configs, IMAGE_TYPE } from "src/constants/Configs";
import { Constants } from "src/constants/Constants";
import { useAuthContext } from "src/context/AuthContext";
import { useCartContext } from "src/context/CartContext";
import { useWishlistContext } from "src/context/WishlistContext";
import useFetchData from "src/hooks/useFetchData";
import sendDataService from "src/services/sendDataService";
import { stockDefiner } from "src/utils/Utilities";

interface BoardgameContentCardProps {
  boardgame: {
    id: number;
    image: string | null;
    name: string;
    releaseYear: number;
    price: number;
    quantity: number;
    description: string | null;
    link: string | null;
    categoryId: number;
  };
}

export default function BoardgameContentCard({
  boardgame,
}: BoardgameContentCardProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { authToken, accountDecoded } = useAuthContext();
  const { increaseCartItemQuantity } = useCartContext();
  const { addWishlistItem } = useWishlistContext();

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const imageRequestConfig = {
    url: `/blobs/${boardgame.image}`,
    method: "GET",
    responseType: IMAGE_TYPE,
  };

  const [{ data: imageData, loading, error }] =
    useFetchData(imageRequestConfig);

  const blobImage = new Blob([new Uint8Array(imageData)], { type: "image" });

  const handleBoardgameArchive = async (id: number) => {
    const deleteBoardgameResponse = await sendDataService.execute({
      url: `/boardgames/${id}/archive`,
      method: "delete",
    });

    if (deleteBoardgameResponse.status === Configs.OK_RESPONSE) {
      navigate("/", { state: { isSuccesfullyDeleted: true } });
    }
  };

  return (
    <>
      <Grid
        container
        display="flex"
        justifyContent="center"
        sx={{ mt: { xs: "-5%", sm: "auto" }, mb: { xs: "-5%", sm: "auto" } }}
      >
        <Grid item xs={12}>
          {accountDecoded?.Role === Constants.ADMIN && (
            <AdminBoardgameActions
              isDeleteOpen={isDeleteDialogOpen}
              setIsEditOpen={setIsEditModalOpen}
              onEditClick={() => setIsEditModalOpen(true)}
              setIsDeleteOpen={setIsDeleteDialogOpen}
              onConfirmationClick={() => {
                handleBoardgameArchive(boardgame.id);
                setIsDeleteDialogOpen(false);
                navigate("/", { state: { isSuccessfullyEdited: true } });
              }}
              onDeleteClick={() => setIsDeleteDialogOpen(true)}
            />
          )}
          {loading === false ? (
            <CardMedia
              component="img"
              image={
                blobImage && boardgame.image !== null
                  ? window.URL.createObjectURL(blobImage)
                  : no_image
              }
              alt="boardgame image"
              sx={{
                maxHeight: 500,
                objectFit: "contain",
              }}
            />
          ) : (
            <LoadingCircle widthParam="100%" />
          )}
        </Grid>
        <Grid item xs={12} sx={{ mt: "1.5%" }}>
          <Typography variant="h5">{boardgame.name}</Typography>
          <Typography variant="body1">{boardgame.releaseYear}</Typography>
          <Box display="display" flexDirection="row">
            <Typography
              variant="h5"
              sx={{ mt: "1%", mb: "1%" }}
              color="text.secondary"
            >
              {boardgame.price} RON
            </Typography>
            <Typography variant="h6">
              {accountDecoded?.Role !== "Admin"
                ? stockDefiner(boardgame.quantity)
                : `${t("quantity")}: ` + boardgame.quantity}
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <CardActions>
            <Button
              size="medium"
              variant="outlined"
              onClick={() => {
                if (authToken !== null) {
                  addWishlistItem(boardgame.id);
                } else {
                  navigate("/login");
                }
              }}
            >
              {t("add-to-wishlist")}
            </Button>
            <Button
              size="medium"
              variant="outlined"
              onClick={() => increaseCartItemQuantity(boardgame.id)}
            >
              {t("add-to-cart")}
            </Button>
          </CardActions>
        </Grid>
      </Grid>
      <AdminBoardgameModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        blobImage={blobImage}
        boardgame={boardgame}
      />
    </>
  );
}
