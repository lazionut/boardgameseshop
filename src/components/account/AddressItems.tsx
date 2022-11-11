import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface AddressItemsProps {
  street: string;
  city: string;
  county: string;
  country: string;
  phone: string;
}

export default function AddressItems({
  street,
  city,
  county,
  country,
  phone,
}: AddressItemsProps) {
  const { t } = useTranslation();

  return (
    <>
      <Grid item>
        <Typography variant="h6">{t("address")}:</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="text"
          variant="filled"
          InputProps={{
            readOnly: true,
          }}
          value={street}
          fullWidth
          label={`${t("street")} *`}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          type="text"
          variant="filled"
          InputProps={{
            readOnly: true,
          }}
          value={city}
          fullWidth
          label={`${t("city")} *`}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          type="text"
          variant="filled"
          InputProps={{
            readOnly: true,
          }}
          value={county}
          fullWidth
          label={`${t("county")} *`}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          type="text"
          variant="filled"
          InputProps={{
            readOnly: true,
          }}
          value={country}
          fullWidth
          label={`${t("country")} *`}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          type="text"
          variant="filled"
          InputProps={{
            readOnly: true,
          }}
          value={phone}
          fullWidth
          label={`${t("phone")} *`}
        />
      </Grid>
    </>
  );
}
