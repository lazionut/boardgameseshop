import React from "react";

import { CardActions, IconButton } from "@mui/material";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";

import ConfirmationDialog from "../common/ConfirmationDialog";

interface AdminBoardgameActionsProps {
  isDeleteOpen: boolean;
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onEditClick: () => void;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirmationClick: () => void;
  onDeleteClick: () => void;
}

export default function AdminBoardgameActions({
  isDeleteOpen,
  onEditClick,
  setIsDeleteOpen,
  onDeleteClick,
  onConfirmationClick,
}: AdminBoardgameActionsProps) {
  const {t} = useTranslation();
   
  return (
    <CardActions>
      <IconButton sx={{ marginLeft: "auto" }} onClick={onEditClick}>
        <GrEdit size={25} />
      </IconButton>
      <IconButton
        sx={{ marginLeft: "auto", color: "red" }}
        onClick={onDeleteClick}
      >
        <MdDelete size={30} />
      </IconButton>
      <ConfirmationDialog
        title={t("delete-boardgame")}
        content={`{${t("delete-boardgame-confirmation")}?`}
        deleteAlertText={t("delete-boardgame-confirmation")}
        onClick={onConfirmationClick}
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
      />
    </CardActions>
  );
}
