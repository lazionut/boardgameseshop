import React, { useState } from "react";
import {
  Box,
  Button,
  CardActions,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import { stockDefiner } from "../../utils/Utilities";
import { useCartContext } from "../../context/CartContext";
import { useWishlistContext } from "../../context/WishlistContext";
import useFetchData from "../../hooks/useFetchData";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { MdDelete } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import sendDataService from "../../services/sendDataService";
import EditBoardgameModal from "./AdminBoardgameModal";
import { Configs } from "../../constants/Configs";

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
  const authToken: string | null = localStorage.getItem("token");
  let accountDecoded: { [key: string]: any } | null = null;

  if (authToken !== null) {
    accountDecoded = jwt_decode(authToken);
  }

  const { increaseCartItemQuantity } = useCartContext();
  const { addWishlistItem } = useWishlistContext();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const imageType: any = "arraybuffer";

  const imageRequestConfig = {
    url: `/blobs/${boardgame.image}`,
    method: "GET",
    responseType: imageType,
  };

  const { data: imageData, loading, error } = useFetchData(imageRequestConfig);

  const blobImage = new Blob([new Uint8Array(imageData)], { type: "image" });

  const handleBoardgameArchive = async (id: number) => {
    const deleteBoardgameResponse = await sendDataService.execute({
      url: `/boardgames/${id}/archive`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (deleteBoardgameResponse.status === Configs.OK_RESPONSE) {
      navigate("/", { state: { isBoardgameDeleted: true } });
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
          {accountDecoded?.Role === "Admin" && (
            <CardActions>
              <IconButton
                sx={{ marginLeft: "auto" }}
                onClick={() => setIsOpen(true)}
              >
                <GrEdit size={25} />
              </IconButton>
              <IconButton
                sx={{ marginLeft: "auto", color: "red" }}
                onClick={() => handleBoardgameArchive(boardgame.id)}
              >
                <MdDelete size={30} />
              </IconButton>
            </CardActions>
          )}
          <CardMedia
            component="img"
            image={
              blobImage && boardgame.image !== null
                ? window.URL.createObjectURL(blobImage)
                : require("../../assets/images/no_image.jpg")
            }
            alt="boardgame image"
            sx={{ height: 500, objectFit: "contain" }}
          />
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
              {stockDefiner(boardgame.quantity)}
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
              Add to wishlist
            </Button>
            <Button
              size="medium"
              variant="outlined"
              onClick={() => increaseCartItemQuantity(boardgame.id)}
            >
              Buy now
            </Button>
          </CardActions>
        </Grid>
      </Grid>
      <EditBoardgameModal
        boardgame={boardgame}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
