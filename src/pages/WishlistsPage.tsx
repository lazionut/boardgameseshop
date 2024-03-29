import { Container, Grid, Typography } from "@mui/material";
import { AxiosRequestConfig } from "axios";
import { useTranslation } from "react-i18next";

import WishlistCard from "../components/wishlist/WishlistCard";
import useFetchData from "../hooks/useFetchData";
import EmptyTemplate from "../components/common/EmptyTemplate";

export default function WishlistsPage() {
  const authToken: string | null = localStorage.getItem("token");
  const { t } = useTranslation();

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
          <Typography variant="h5">{t("my-wishlists")}</Typography>
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
        <>
          {wishlistData.length > 0 ? (
            <>
              {wishlistData.map((wishlist: any) => (
                <Grid item key={wishlist.id} mt="5%" mb="2%">
                  <WishlistCard wishlist={wishlist} />
                </Grid>
              ))}
            </>
          ) : (
            <EmptyTemplate pageText={t("no-wishlists")} />
          )}
        </>
      </Grid>
    </Container>
  );
}
