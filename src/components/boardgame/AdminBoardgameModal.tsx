import React from "react";
import { Box, CardHeader, IconButton, Modal } from "@mui/material";
import { IoClose } from "react-icons/io5";

import AdminBoardgameTemplate from "./AdminBoardgameTemplate";

interface AdminBoardgameModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  blobImage?: Blob;
  boardgame?: {
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

export default function AdminBoardgameModal({
  isOpen,
  setIsOpen,
  blobImage,
  boardgame,
}: AdminBoardgameModalProps) {
  return (
    <Modal hideBackdrop open={isOpen} onClose={() => setIsOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          overflow: "auto",
          transform: "translate(-50%, -50%)",
          width: { xs: "100%", lg: "50%" },
          bgcolor: "common.customLightYellow",
          height: "90%",
          border: "2px solid #000",
          boxShadow: 24,
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
        {boardgame === undefined ? (
          <AdminBoardgameTemplate templateName="Create boardgame" />
        ) : (
          <AdminBoardgameTemplate
            blobImage={blobImage}
            boardgame={boardgame}
            templateName="Edit boardgame"
          />
        )}
      </Box>
    </Modal>
  );
}
