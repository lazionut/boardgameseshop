import { useState } from "react";

import {
  Grid,
  Modal,
  Box,
  Button,
  CardHeader,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";

import { EditWishlistModalItem } from "./EditWishlistModalItem";
import { requiredFieldRule } from "../../constants/Rules";
import sendDataService from "../../services/sendDataService";

type EditWishlist = {
  wishlist: {
    id: number;
    name: string;
    boardgames: {
      id: number;
      image: string | null;
      name: string;
      releaseYear: number;
      quantity: number;
      price: number;
    }[];
  };
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsWishlistEdited: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditWishlistModal({
  wishlist,
  isOpen,
  setIsOpen,
  setIsWishlistEdited,
}: EditWishlist) {
  const { t } = useTranslation();

  const [localWishlistItems, setLocalWishlistItems] = useState(
    wishlist.boardgames
  );

  const localRemoveWishlistItem = (id: number) => {
    setLocalWishlistItems((currentItems) => {
      return currentItems.filter((item: any) => item.id !== id);
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { "wishlist-name": wishlist.name } });

  const handleFormSubmission = async (data: { [key: string]: string }) => {
    const wishlistInput = {
      name: data["wishlist-name"],
      boardgameIds: localWishlistItems.map((wishlistItem) => wishlistItem.id),
    };

    const updateWishlistResponse = await sendDataService.execute({
      url: `/accounts/wishlists/${wishlist.id}`,
      method: "put",
      data: wishlistInput,
    });

    if (updateWishlistResponse?.data !== undefined) {
      setIsWishlistEdited(true);
      setIsOpen(false);
    }
  };

  return (
    <Modal
      hideBackdrop
      open={isOpen}
      onClose={() => {
        setLocalWishlistItems(wishlist.boardgames);
        setIsOpen(false);
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          overflow: "auto",
          transform: "translate(-50%, -50%)",
          width: "80%",
          border: "2px solid #000",
          boxShadow: 22,
          pt: 2,
          px: 4,
          pb: 3,
          height: "80%",
          mt: "2rem",
          bgcolor: "common.customDirtyWhite",
        }}
      >
        <CardHeader
          action={
            <IconButton
              onClick={() => {
                setLocalWishlistItems(wishlist.boardgames);
                setIsOpen(false);
              }}
            >
              <IoClose size={40} />
            </IconButton>
          }
        />
        {wishlist.boardgames.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4">{t("empty-wishlist")}.</Typography>
          </Box>
        ) : (
          <form onSubmit={handleSubmit(handleFormSubmission)}>
            <Box justifyContent="center" display="flex" mb="3%">
              <TextField
                variant="outlined"
                label={`${t("wishlist-name")} *`}
                error={!!errors["wishlist-name"]}
                helperText={
                  errors["wishlist-name"]?.message !== undefined &&
                  String(errors["wishlist-name"]?.message)
                }
                {...register("wishlist-name", { ...requiredFieldRule })}
              />
            </Box>
            <Grid
              container
              sx={{
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "center", sm: "stretch" },
                justifyContent: "center",
              }}
              spacing={"3%"}
              p={"2%"}
            >
              {localWishlistItems.map((boardgame) => (
                <Grid item key={boardgame.id}>
                  <EditWishlistModalItem
                    boardgame={boardgame}
                    localRemoveWishlistItem={localRemoveWishlistItem}
                  />
                </Grid>
              ))}
            </Grid>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mt="3%"
            >
              <Button size="large" type="submit" variant="contained">
                {t("submit")}
              </Button>
            </Box>
          </form>
        )}
      </Box>
    </Modal>
  );
}
