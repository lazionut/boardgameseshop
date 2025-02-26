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

import { WishlistModalItem } from "src/components/wishlist/WishlistModalItem";
import { requiredFieldRule } from "src/constants/Rules";
import { useWishlistContext } from "src/context/WishlistContext";
import sendDataService from "src/services/sendDataService";

interface WishlistModalProps {
  isOpen: boolean;
}

export default function WishlistModal({ isOpen }: WishlistModalProps) {
  const { wishlistItems, closeWishlist, clearWishlist } = useWishlistContext();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFormSubmission = async (data: { [key: string]: string }) => {
    const wishlistInput = {
      name: data["wishlist-name"],
      boardgameIds: wishlistItems.map((wishlistItem) => wishlistItem.id),
    };

    const createWishlistResponse = await sendDataService.execute({
      url: "/wishlists ",
      method: "post",
      data: wishlistInput,
    });

    if (createWishlistResponse?.data !== undefined) {
      reset({ "wishlist-name": "" });
      clearWishlist();
      closeWishlist();
    }
  };

  return (
    <Modal hideBackdrop open={isOpen} onClose={closeWishlist}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          overflow: "auto",
          transform: "translate(-50%, -50%)",
          width: "80%",
          border: "2px solid #000",
          boxShadow: 24,
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
            <IconButton onClick={closeWishlist}>
              <IoClose size={40} />
            </IconButton>
          }
        />
        {wishlistItems.length === 0 ? (
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
              {wishlistItems.map((item) => (
                <Grid item key={item.id}>
                  <WishlistModalItem {...item} />
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
