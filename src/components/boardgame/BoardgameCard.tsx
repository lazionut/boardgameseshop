import React, { useState } from "react";
import Button from "@mui/material/Button";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import jwt_decode from "jwt-decode";

import { stockDefiner } from "../../utils/Utilities";
import { useCartContext } from "../../context/CartContext";
import { useWishlistContext } from "../../context/WishlistContext";
import useFetchData from "../../hooks/useFetchData";
import sendDataService from "../../services/sendDataService";
import EditBoardgameModal from "./AdminBoardgameModal";

interface Boardgame {
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
}

export default function BoardgameCard({ boardgame }: Boardgame) {
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
    const createWishlistResponse = await sendDataService.execute({
      url: `/boardgames/${id}/archive`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (createWishlistResponse?.data !== undefined) {
      window.location.reload();
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
          gap: "clamp(0px, (100% - 360px + 32px) * 999, 16px)",
          transition: "transform 0.3s, border 0.3s",
          "&:hover": {
            borderColor: "inherit",
            transform: "translateY(-2px)",
          },
          "& > *": { minWidth: "clamp(0px, (360px - 100%) * 999,100%)" },
          bgcolor: "common.customDirtyWhite",
        }}
      >
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
        <CardActionArea onClick={() => navigate(`/boardgames/${boardgame.id}`)}>
          <CardMedia
            component="img"
            image={
              blobImage && boardgame.image !== null
                ? window.URL.createObjectURL(blobImage)
                : require("../../assets/images/no_image.jpg")
            }
            sx={{ objectFit: "fill", width: "100%", height: 400 }}
            alt="boardgame image"
          />
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
              {stockDefiner(boardgame.quantity)}
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
            Add to wishlist
          </Button>
          <Button
            size="large"
            sx={{ mt: "5%" }}
            onClick={() => increaseCartItemQuantity(boardgame.id)}
          >
            Buy now
          </Button>
        </CardActions>
      </Card>
      <EditBoardgameModal
        boardgame={boardgame}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
