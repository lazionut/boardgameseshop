import { Box, CardHeader, IconButton, Modal } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";

import AdminCategoryTemplate from "./AdminCategoryTemplate";

interface EditCategoryModalProps {
  isOpen: boolean | undefined;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  category?: {
    id: number;
    name: string;
  };
  setIsCategoryCreated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCategoryEdited?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AdminCategoryModal({
  isOpen,
  setIsOpen,
  category,
  setIsCategoryCreated,
  setIsCategoryEdited,
}: EditCategoryModalProps) {
  const { t } = useTranslation();

  return (
    <Modal hideBackdrop open={isOpen ?? false} onClose={() => setIsOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "30%",
          left: "50%",
          overflow: "auto",
          transform: "translate(-50%, -50%)",
          width: { xs: "100%", sm: "60%", md: "40%" },
          height: "40%",
          bgcolor: "common.customLightYellow",
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
        {category === undefined ? (
          <AdminCategoryTemplate
            templateName={t("create-category")}
            setIsModalOpen={setIsOpen}
            setIsCategoryCreated={setIsCategoryCreated}
          />
        ) : (
          <AdminCategoryTemplate
            category={category}
            templateName={t("edit-category")}
            setIsModalOpen={setIsOpen}
            setIsCategoryEdited={setIsCategoryEdited}
          />
        )}
      </Box>
    </Modal>
  );
}
