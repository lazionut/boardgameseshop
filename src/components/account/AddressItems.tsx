import React from "react";
import { Grid, TextField, Typography } from "@mui/material";

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
  return (
    <>
      <Grid item>
        <Typography variant="h6">Address:</Typography>
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
          autoFocus
          label="Street *"
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
          autoFocus
          label="City *"
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
          autoFocus
          label="County *"
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
          autoFocus
          label="Country *"
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
          autoFocus
          label="Phone *"
        />
      </Grid>
    </>
  );
}
