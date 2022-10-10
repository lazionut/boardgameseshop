import React, { useState } from "react";
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
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";

import { requiredFieldRule } from "../../constants/Rules";
import sendDataService from "../../services/sendDataService";
import { EditWishlistModalItem } from "./EditWishlistModalItem";

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
};

export default function EditWishlistModal({
  wishlist,
  isOpen,
  setIsOpen,
}: EditWishlist) {
  const authToken: string | null = localStorage.getItem("token");

  const [localWishlistItems, setLocalWishlistItems] = useState(
    wishlist.boardgames
  );
  const [localWishlistName, setLocalWishlistName] = useState<string>(
    wishlist.name
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
  } = useForm();

  const handleFormSubmission = async (data: { [key: string]: string }) => {
    const wishlistInput = {
      name: data["wishlist-name"],
      boardgameIds: localWishlistItems.map((wishlistItem) => wishlistItem.id),
    };

    const createWishlistResponse = await sendDataService.execute({
      url: `/accounts/wishlists/${wishlist.id}`,
      method: "put",
      data: wishlistInput,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (createWishlistResponse?.data !== undefined) {
      window.location.reload();
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
          overflow: "scroll",
          transform: "translate(-50%, -50%)",
          width: "80%",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          pt: 2,
          px: 4,
          pb: 3,
          height: "80%",
          mt: "2rem",
        }}
      >
        <CardHeader
          action={
            <IconButton onClick={() => setIsOpen(false)}>
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
            <Typography variant="h4">Wishlist is empty.</Typography>
          </Box>
        ) : (
          <form onSubmit={handleSubmit(handleFormSubmission)}>
            <Box justifyContent="center" display="flex" mb="3%">
              <TextField
                variant="outlined"
                label="Wishlist name *"
                value={localWishlistName}
                error={!!errors["wishlist-name"]}
                helperText={
                  errors["wishlist-name"]?.message !== undefined &&
                  String(errors["wishlist-name"]?.message)
                }
                {...register("wishlist-name", { ...requiredFieldRule })}
                onChange={(e) => setLocalWishlistName(e.target.value)}
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
                <Grid item>
                  <EditWishlistModalItem
                    key={boardgame.id}
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
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Box>
    </Modal>
  );
}
