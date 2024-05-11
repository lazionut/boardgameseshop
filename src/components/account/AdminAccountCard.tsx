import { useState } from "react";

import { Grid, Card, ListItem, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import { Configs } from "../../constants/Configs";
import sendDataService from "../../services/sendDataService";
import ConfirmationDialog from "../common/ConfirmationDialog";

interface AdminAccountProps {
  account: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  setIsAccountDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AdminAccountCard({
  account,
  setIsAccountDeleted,
}: AdminAccountProps) {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(false);
     
  const handleDeleteAccount = async (id: number) => {
    const deleteAccountResponse = await sendDataService.execute({
      url: `/accounts/${id}`,
      method: "delete",
    });

    if (deleteAccountResponse.status === Configs.OK_RESPONSE) {
      setIsAccountDeleted(true);
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
            onClick={() => handleDeleteAccount(account.id)}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </Grid>
      </Card>
    </Grid>
  );
}
