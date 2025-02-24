import { useState } from "react";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
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

interface BoardgameCardProps {
  boardgame: {
    id: number;
    image: string | null;
    name: string;
    releaseYear: number;
    price: number;
    description: string | null;
    link: string | null;
    quantity: number;
    categoryId: number;
  };
  setIsBoardgameDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BoardgameCard({
  boardgame,
  setIsBoardgameDeleted,
}: BoardgameCardProps) {
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
    const archiveBoardgameResponse = await sendDataService.execute({
      url: `/boardgames/${id}/archive`,
      method: "delete",
    });

    if (archiveBoardgameResponse.status === Configs.OK_RESPONSE) {
      navigate("/");
    }
  };

  return (
    <>
      <Card
        raised
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 500,
          transition: "transform 0.3s, border 0.3s",
          "&:hover": {
            borderColor: "inherit",
            transform: "translateY(-2px)",
          },
          "& > *": { minWidth: "clamp(0px, (360px - 100%) * 999,100%)" },
          bgcolor: "common.customLightYellow",
          boxShadow: 12,
        }}
      >
        {accountDecoded?.Role === Constants.ADMIN && (
          <AdminBoardgameActions
            isDeleteOpen={isDeleteDialogOpen}
            setIsEditOpen={setIsEditModalOpen}
            onEditClick={() => setIsEditModalOpen(true)}
            setIsDeleteOpen={setIsDeleteDialogOpen}
            onConfirmationClick={() => {
              handleBoardgameArchive(boardgame.id);
              setIsDeleteDialogOpen(false);
              setIsBoardgameDeleted(true);
            }}
            onDeleteClick={() => setIsDeleteDialogOpen(true)}
          />
        )}
        <CardActionArea
          sx={{ color: "black" }}
          onClick={() => navigate(`/boardgames/${boardgame.id}`)}
        >
          {loading === false ? (
            <CardMedia
              component="img"
              image={
                blobImage && boardgame.image !== null
                  ? window.URL.createObjectURL(blobImage)
                  : no_image
              }
              sx={{ objectFit: "fill", width: "100%", height: 400 }}
              alt="boardgame image"
            />
          ) : (
            <LoadingCircle widthParam="100%" heightParam="400" />
          )}
          <CardContent>
            <Typography variant="h5">{boardgame.name}</Typography>
            <Typography variant="body1">{boardgame.releaseYear}</Typography>
            <Typography
              variant="h5"
              sx={{ mt: "2%", mb: "2%" }}
              color="text.secondary"
            >
              {boardgame.price} RON
            </Typography>
            <Typography variant="h6">
              {accountDecoded?.Role !== "Admin"
                ? stockDefiner(boardgame.quantity)
                : `${t("quantity")}: ` + boardgame.quantity}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{
            justifyContent: "center",
            alignItems: "flex-end",
            marginBottom: "5%",
          }}
        >
          <Button
            size="large"
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
            size="large"
            sx={{ mt: "5%" }}
            onClick={() => increaseCartItemQuantity(boardgame.id)}
          >
            {t("add-to-cart")}
          </Button>
        </CardActions>
      </Card>
      <AdminBoardgameModal
        boardgame={boardgame}
        blobImage={blobImage}
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
      />
    </>
  );
}
