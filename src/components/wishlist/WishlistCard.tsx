import { useState } from "react";

import {
  Box,
  CardActions,
  Container,
  Divider,
  Grid,
  Typography,
  Card,
  IconButton,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { BsCartPlusFill } from "react-icons/bs";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

import EditWishlistModal from "./EditWishlistModal";
import { WishlistBoardgameCard } from "./WishlistBoardgameCard";
import { Configs } from "../../constants/Configs";
import { useCartContext } from "../../context/CartContext";
import sendDataService from "../../services/sendDataService";
import { trimDateTime } from "../../utils/Utilities";
import ConfirmationDialog from "../common/ConfirmationDialog";

interface WishlistCardProp {
  wishlist: {
    id: number;
    name: string;
    creationDate: string;
    updateDate: string;
    boardgames: {
      id: number;
      image: null;
      name: string;
      quantity: number;
      releaseYear: number;
      description: string;
      price: number;
      link: string;
    }[];
  };
  setIsWishlistDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  setIsWishlistEdited: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WishlistCard({
  wishlist,
  setIsWishlistDeleted,
  setIsWishlistEdited,
}: WishlistCardProp) {
  const { t } = useTranslation();
  const { clearCart, increaseCartItemQuantity } = useCartContext();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isEditWishlistOpen, setIsEditWishlistOpen] = useState<boolean>(false);

  const handleWishlistDelete = async (id: number) => {
    const deleteWishlistResponse = await sendDataService.execute({
      url: `/accounts/wishlists/${id}`,
      method: "delete",
    });

    if (deleteWishlistResponse.status === Configs.OK_RESPONSE) {
      setIsWishlistDeleted(true);
    }
  };

  const handleAddWishlistToCart = (boardgames: any) => {
    clearCart();

    const boardgamesLength = boardgames.length;
    for (let index = 0; index < boardgamesLength; ++index) {
      increaseCartItemQuantity(boardgames[index].id);
    }
  };

  return (
    <Container sx={{ mt: "2%" }} maxWidth="xs">
      <Card variant="outlined" sx={{ bgcolor: "common.customLightYellow" }}>
        <CardActions>
          <IconButton
            sx={{ marginLeft: "auto" }}
            onClick={() => setIsOpen(true)}
          >
            <BsCartPlusFill size={30} />
          </IconButton>
          <IconButton
            sx={{ marginLeft: "auto" }}
            onClick={() => setIsEditWishlistOpen(true)}
          >
            <GrEdit size={25} />
          </IconButton>
          <ConfirmationDialog
            title={t("add-wishlist-boardgames")}
            content={t("current-cart-emptied")}
            onClick={() => {
              handleAddWishlistToCart(wishlist.boardgames);
              setIsOpen(false);
            }}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <IconButton
            sx={{ marginLeft: "auto", color: "red" }}
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <MdDelete size={30} />
          </IconButton>
          <ConfirmationDialog
            title={t("delete-wishlist")}
            content={t("delete-wishlist-confirmation")}
            onClick={() => {
              handleWishlistDelete(wishlist.id);
              setIsOpen(false);
            }}
            isOpen={isDeleteDialogOpen}
            setIsOpen={setIsDeleteDialogOpen}
          />
        </CardActions>
        <Box>
          <Typography variant="h5"> {wishlist.name}</Typography>
        </Box>
        <Divider />
        <Grid
          container
          flexDirection="row"
          justifyContent="center"
          alignContent="center"
          alignItems="center"
        >
          {wishlist.boardgames.map((boardgame: any) => (
            <WishlistBoardgameCard key={boardgame.id} boardgame={boardgame} />
          ))}
        </Grid>
        <Divider />
        <Grid container flexDirection="column">
          <CardActions
            sx={{
              flexDirection: "column",
            }}
          >
            <Typography mt={2}>
              {t("created-at")}: {trimDateTime(wishlist.creationDate)}
            </Typography>
            <Typography mt={2}>
              {t("updated-at")}: {trimDateTime(wishlist.updateDate)}
            </Typography>
          </CardActions>
        </Grid>
      </Card>
      <EditWishlistModal
        wishlist={wishlist}
        isOpen={isEditWishlistOpen}
        setIsOpen={setIsEditWishlistOpen}
        setIsWishlistEdited={setIsWishlistEdited}
      />
    </Container>
  );
}
