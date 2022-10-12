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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { GrEdit } from "react-icons/gr";

import { stockDefiner, trimDateTime } from "../../utils/Utilities";
import sendDataService from "../../services/sendDataService";
import { Configs } from "../../constants/Configs";
import EditWishlistModal from "./EditWishlistModal";
import useFetchData from "../../hooks/useFetchData";
import { WishlistBoardgameCard } from "./WishlistBoardgameCard";

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

  return (
    <Container sx={{ mt: "2%" }} maxWidth="xs">
      <Card variant="outlined" sx={{ bgcolor: "common.customDirtyWhite" }}>
        <CardActions>
          <IconButton
            sx={{ marginLeft: "auto" }}
            onClick={() => setIsEditWishlistOpen(true)}
          >
            <GrEdit size={25} />
          </IconButton>
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
