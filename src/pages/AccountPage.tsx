import { useState } from "react";

import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { AxiosRequestConfig } from "axios";
import { useTranslation } from "react-i18next";
import { MdDelete } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

import AddressItems from "src/components/account/AddressItems";
import ProfileItems from "src/components/account/ProfileItems";
import ConfirmationDialog from "src/components/common/ConfirmationDialog";
import NotificationToast from "src/components/common/NotificationToast";
import { Configs } from "src/constants/Configs";
import { useAuthContext } from "src/context/AuthContext";
import useFetchData from "src/hooks/useFetchData";
import sendDataService from "src/services/sendDataService";

export default function AccountPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { authToken } = useAuthContext();
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const accountRequestConfig: AxiosRequestConfig = {
    url: "/accounts/me",
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const [{ data: accountData, loading, error }] =
    useFetchData(accountRequestConfig);

  const handleAccountArchive = async () => {
    const archiveAccountResponse = await sendDataService.execute({
      url: `/accounts/archive`,
      method: "delete",
    });

    if (archiveAccountResponse.status === Configs.OK_RESPONSE) {
      navigate("/", { state: { isBoardgameDeleted: true } });
    }
  };

  return (
    <>
      {accountData.address && (
        <Container
          sx={{
            maxWidth: { xs: "xs", sm: "sm", md: "xs" },
            mb: "5%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              variant="outlined"
              color="error"
              sx={{ marginLeft: "auto", color: "red", mb: "5%" }}
              onClick={() => setIsOpen(true)}
            >
              <Typography>{t("delete-account")}</Typography>
              <MdDelete size={30} />
            </Button>
            <ConfirmationDialog
              title={t("confirm-delete")}
              content={`${t("account-deleted")}.`}
              onClick={() => {
                handleAccountArchive();
                setIsOpen(false);
              }}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
            <Typography variant="h5">{t("my-account")}</Typography>
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
                  {t("edit-profile")}
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
                  {t("edit-address")}
                </Button>
              </Grid>
            </Grid>
          </Box>
          {state?.isEditedProfile === true && (
            <NotificationToast
              toastText={t("sucessfully-edited-profile")}
              isSuccessful={true}
            />
          )}
          {state?.isEditedAddress === true && (
            <NotificationToast
              toastText={t("sucessfully-edited-address")}
              isSuccessful={true}
            />
          )}
        </Container>
      )}
    </>
  );
}
