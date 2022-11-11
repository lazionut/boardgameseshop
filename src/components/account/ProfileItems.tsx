import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ProfileItemsProps {
  firstName: string;
  lastName: string;
  email: string;
}

export default function ProfileItems({
  firstName,
  lastName,
  email,
}: ProfileItemsProps) {
  const { t } = useTranslation();

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6" align="justify">
          {t("profile")}:
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          type="text"
          variant="filled"
          InputProps={{
            readOnly: true,
          }}
          value={firstName}
          fullWidth
          label={`${t("first-name")} *`}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          type="text"
          variant="filled"
          InputProps={{
            readOnly: true,
          }}
          value={lastName}
          fullWidth
          label={`${t("last-name")} *`}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="text"
          variant="filled"
          InputProps={{
            readOnly: true,
          }}
          value={email}
          fullWidth
          label="Email *"
        />
      </Grid>
    </>
  );
}
