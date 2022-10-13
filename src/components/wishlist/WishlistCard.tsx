import React, { useState } from "react";
import {
  Box,
  CardActions,
  Container,
  Divider,
  Grid,
  Typography,
  Button,
  Card,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { MdDelete } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { BsCartPlusFill } from "react-icons/bs";

import { trimDateTime } from "../../utils/Utilities";
import sendDataService from "../../services/sendDataService";
import { Configs } from "../../constants/Configs";
import EditWishlistModal from "./EditWishlistModal";
import { WishlistBoardgameCard } from "./WishlistBoardgameCard";
import { useCartContext } from "../../context/CartContext";

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
}

export default function WishlistCard({ wishlist }: WishlistCardProp) {
  const authToken: string | null = localStorage.getItem("token");

  const { clearCart, increaseCartItemQuantity } = useCartContext();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditWishlistOpen, setIsEditWishlistOpen] = useState<boolean>(false);

  const handleWishlistDelete = async (id: number) => {
    const deleteWishlistResponse = await sendDataService.execute({
      url: `/accounts/wishlists/${id}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (deleteWishlistResponse.status === Configs.OK_RESPONSE) {
      window.location.reload();
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
      <Card variant="outlined" sx={{ bgcolor: "common.customDirtyWhite" }}>
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
          <div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
              <DialogTitle>Add wishlist boardgames to cart</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  You current cart will be emptied and replaced with the items
                  from the wishlist.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button
                  onClick={() => {
                    handleAddWishlistToCart(wishlist.boardgames);
                    setIsOpen(false);
                  }}
                  autoFocus
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <IconButton
            sx={{ marginLeft: "auto", color: "red" }}
            onClick={() => handleWishlistDelete(wishlist.id)}
          >
            <MdDelete size={30} />
          </IconButton>
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
              Created at: {trimDateTime(wishlist.creationDate)}
            </Typography>
            <Typography mt={2}>
              Updated at: {trimDateTime(wishlist.updateDate)}
            </Typography>
          </CardActions>
        </Grid>
      </Card>
      <EditWishlistModal
        wishlist={wishlist}
        isOpen={isEditWishlistOpen}
        setIsOpen={setIsEditWishlistOpen}
      />
    </Container>
  );
}
