import React from "react";
import { Grid, TextField, Typography } from "@mui/material";

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
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6" align="justify">
          Profile:
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
          label="First Name *"
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
          label="Last Name *"
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
