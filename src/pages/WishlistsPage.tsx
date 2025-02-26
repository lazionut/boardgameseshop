
import { useEffect, useState } from "react";

import { Container, Grid, Typography } from "@mui/material";
import { AxiosRequestConfig } from "axios";
import { useTranslation } from "react-i18next";

import EmptyTemplate from "src/components/common/EmptyTemplate";
import WishlistCard from "src/components/wishlist/WishlistCard";
import { useAuthContext } from "src/context/AuthContext";
import useFetchData from "src/hooks/useFetchData";

export default function WishlistsPage() {
  const { authToken } = useAuthContext();
  const { t } = useTranslation();

  const [isWishlistDeleted, setIsWishlistDeleted] = useState<boolean>(false);
  const [isWishlistEdited, setIsWishlistEdited] = useState<boolean>(false);

  const wishlistsRequestConfig: AxiosRequestConfig = {
    url: "/accounts/wishlists",
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const [{ data: wishlistData, loading, error }, refetchData] = useFetchData(
    wishlistsRequestConfig
  );

  useEffect(() => {
    if (isWishlistDeleted === true) {
      setIsWishlistDeleted(false);
      refetchData();
    }
  }, [isWishlistDeleted]);

  useEffect(() => {
    if (isWishlistEdited === true) {
      setIsWishlistEdited(false);
      refetchData();
    }
  }, [isWishlistEdited]);

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
                  <WishlistCard
                    wishlist={wishlist}
                    setIsWishlistDeleted={setIsWishlistDeleted}
                    setIsWishlistEdited={setIsWishlistEdited}
                  />
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
