import React, { useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { AxiosRequestConfig } from "axios";

import WishlistCard from "../components/wishlist/WishlistCard";
import useFetchData from "../hooks/useFetchData";

export default function WishlistsPage() {
  const authToken: string | null = localStorage.getItem("token");

  const wishlistsRequestConfig: AxiosRequestConfig = {
    url: "/accounts/wishlists",
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const {
    data: wishlistData,
    loading,
    error,
  } = useFetchData(wishlistsRequestConfig);

  return (
    <Container>
      <Grid
        container
        sx={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Grid item>
          <Typography variant="h5">My wishlists</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        display="flex"
        justifyContent="center"
        sx={{
          flexDirection: "row",
          alignItems: { xs: "center", sm: "normal" },
        }}
      >
        {wishlistData.map((wishlist: any) => (
          <Grid item key={wishlist.id} mt="5%" mb="2%">
            <WishlistCard wishlist={wishlist} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
