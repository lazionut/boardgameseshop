import { Box, CardHeader, IconButton, Modal } from "@mui/material";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <Modal hideBackdrop open={isOpen} onClose={() => setIsOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          overflow: "auto",
          transform: "translate(-50%, -50%)",
          width: { xs: "100%", sm: "70%", lg: "50%" },
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
          <AdminBoardgameTemplate
            templateName={t("add-boardgame")}
            setIsOpen={setIsOpen}
          />
        ) : (
          <AdminBoardgameTemplate
            blobImage={blobImage}
            boardgame={boardgame}
            templateName={t("edit-boardgame")}
            setIsOpen={setIsOpen}
          />
        )}
      </Box>
    </Modal>
  );
}
