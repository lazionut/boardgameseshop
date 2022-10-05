import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosRequestConfig } from "axios";

import useFetchData from "../hooks/useFetchData";
import ProfileItems from "../components/account/ProfileItems";
import AddressItems from "../components/account/AddressItems";
import { NotificationToast } from "../components/common/NotificationToast";

export default function AccountPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const authToken: string | null = localStorage.getItem("token");

  const accountRequestConfig: AxiosRequestConfig = {
    url: "/accounts/me",
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const {
    data: accountData,
    loading,
    error,
  } = useFetchData(accountRequestConfig);

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
        }}
      >
        <Typography variant="h5">My account</Typography>
        {accountData.address && (
          <Grid container spacing={"3%"} sx={{ mt: { xs: "3%" } }}>
            <ProfileItems
              firstName={accountData.firstName}
              lastName={accountData.lastName}
              email={accountData.email}
            />
            <AddressItems
              street={accountData.address.details}
              city={accountData.address.city}
              county={accountData.address.county}
              country={accountData.address.country}
              phone={accountData.address.phone}
            />
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="medium"
                sx={{ mt: "5%" }}
                onClick={() =>
                  navigate("/account/profile/edit", {
                    state: {
                      firstName: accountData.firstName,
                      lastName: accountData.lastName,
                      email: accountData.email,
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
                sx={{ my: "5%" }}
                onClick={() =>
                  navigate("/account/address/edit", {
                    state: {
                      addressId: accountData.address.id,
                      details: accountData.address.details,
                      city: accountData.address.city,
                      county: accountData.address.county,
                      country: accountData.address.country,
                      phone: accountData.address.phone,
                    },
                  })
                }
              >
                Edit address
              </Button>
            </Grid>
          </Grid>
        )}
      </Box>
      {state?.isEditedProfile === true && (
        <NotificationToast
          toastText="Succesfully edited profile"
          isSuccessful={true}
        />
      )}
      {state?.isEditedAddress === true && (
        <NotificationToast
          toastText="Succesfully edited address"
          isSuccessful={true}
        />
      )}
    </Container>
  );
}
