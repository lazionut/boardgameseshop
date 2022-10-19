import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { NotificationToast } from "./NotificationToast";

interface ConfirmationDialogProps {
  title: string;
  content: string;
  isOpen: boolean;
  deleteAlertText: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: () => void;
}

export default function ConfirmationDialog({
  title,
  content,
  isOpen,
  deleteAlertText,
  setIsOpen,
  onClick,
}: ConfirmationDialogProps) {
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: "common.customLightYellow",
          },
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={onClick} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
