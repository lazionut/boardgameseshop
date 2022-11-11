import React, { useState } from "react";
import { Grid, Card, ListItem, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import ConfirmationDialog from "../common/ConfirmationDialog";
import sendDataService from "../../services/sendDataService";
import { Configs } from "../../constants/Configs";

interface AdminAccountProps {
  account: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function AdminAccountCard({ account }: AdminAccountProps) {
  const authToken: string | null = localStorage.getItem("token");
  const {t} = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDeleteAccount = async (id: number) => {
    const deleteAccountResponse = await sendDataService.execute({
      url: `/accounts/${id}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (deleteAccountResponse.status === Configs.OK_RESPONSE) {
      window.location.reload();
    }
  };

  return (
    <Grid container item justifyContent="center" mb="1%">
      <Card
        sx={{
          width: "70%",
          bgcolor: "common.customLightYellow",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid
          item
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
        >
          <ListItem>{account.firstName + " " + account.lastName}</ListItem>
          <ListItem>{account.email}</ListItem>
          <Button
            variant="contained"
            color="error"
            onClick={() => setIsOpen(true)}
          >
            {t("delete-account")}
          </Button>
          <ConfirmationDialog
            title={t("confirm-delete")}
            content={`${t("account-deleted")}.`}
            deleteAlertText={t("account-deleted-message")}
            onClick={() => handleDeleteAccount(account.id)}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </Grid>
      </Card>
    </Grid>
  );
}
