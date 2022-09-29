import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AxiosRequestConfig } from "axios";

import useFetchData from "../hooks/useFetchData";

export default function AccountPage() {
  const navigate = useNavigate();

  const [authToken, setAuthToken] = useState<string>();

  const {
    register,
    formState: { errors },
  } = useForm();

  const accountRequestConfig: AxiosRequestConfig = {
    url: "accounts/me",
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const { data: account, loading, error } = useFetchData(accountRequestConfig);

  console.log(JSON.stringify(account));

  useEffect(()=>{
    setAuthToken(localStorage.get("token"));
  },[])

  return (
    <Container
      sx={{
        maxWidth: { xs: "xs", sm: "sm", md: "xs" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        <Typography variant="h5">My profile</Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              variant="filled"
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              autoFocus
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
              value={account.lastName}
              fullWidth
              autoFocus
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
              value={account.email}
              fullWidth
              autoFocus
              label="Email *"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              variant="filled"
              InputProps={{
                readOnly: true,
              }}
              value={account.address.details}
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
              value={account.address.city}
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
              value={account.address.county}
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
              value={account.address.country}
              fullWidth
              autoFocus
              label="Country *"
              error={!!errors["country"]}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              variant="filled"
              InputProps={{
                readOnly: true,
              }}
              value={account.address.phone}
              fullWidth
              autoFocus
              label="Phone *"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="medium"
              sx={{ mt: 2 }}
              onClick={() =>
                navigate("/edit-account", {
                  state: {
                    firstName: account.firstName,
                    lastName: account.lastName,
                    email: account.email,
                  },
                })
              }
            >
              Edit profile
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="medium"
              sx={{ mt: 2, mb: 2 }}
              onClick={() =>
                navigate("/edit-address", {
                  state: {
                    addressId: account.address.id,
                    details: account.address.details,
                    city: account.address.city,
                    county: account.address.county,
                    country: account.address.country,
                    phone: account.address.phone,
                  },
                })
              }
            >
              Edit address
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
