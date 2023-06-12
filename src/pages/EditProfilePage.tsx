import React, { useState, useEffect } from "react";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { emailFieldRule, requiredFieldRule } from "../constants/Rules";
import NavigateBackButton from "../components/common/NavigateBackButton";
import { Configs } from "../constants/Configs";
import sendDataService from "../services/sendDataService";
import { NotificationToast } from "../components/common/NotificationToast";
import useTimeout from "../hooks/useTimeout";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const authToken: string | null = localStorage.getItem("token");
  const { t } = useTranslation();

  const [shownFirstName, setShownFirstName] = useState<string | undefined>(
    state?.firstName
  );
  const [shownLastName, setShownLastName] = useState<string | undefined>(
    state?.lastName
  );
  const [shownEmail, setShownEmail] = useState<string | undefined>(
    state?.email
  );
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    if (
      state?.firstName === undefined ||
      state?.lastName === undefined ||
      state?.email === undefined
    ) {
      navigate("/account");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmission = async (data: { [key: string]: string }) => {
    const editAccountInput = {
      firstName: data["first-name"],
      lastName: data["last-name"],
      email: data["email"],
    };

    const editProfileResponse = await sendDataService.execute({
      url: "/accounts",
      method: "patch",
      data: editAccountInput
    });

    if (editProfileResponse.status === Configs.NO_CONTENT_RESPONSE) {
      navigate("/account", { state: { isEditedProfile: true } });
    } else {
      setShowAlert(true);
    }
  };

  useTimeout(showAlert, setShowAlert);

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmission)}>
        <Container
          sx={{
            maxWidth: { xs: "xs", sm: "sm", md: "xs" },
          }}
        >
          <Box sx={{ mt: "5%", display: "flex", justifyContent: "flex-start" }}>
            <NavigateBackButton to="/account" />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            <Typography variant="h5">Edit profile</Typography>
            <Grid container spacing={"3%"} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  variant="filled"
                  value={shownFirstName}
                  fullWidth
                  autoFocus
                  label={`${t("first-name")} *`}
                  error={!!errors["first-name"]}
                  helperText={
                    errors["first-name"]?.message !== undefined &&
                    String(errors["first-name"]?.message)
                  }
                  {...register("first-name", { ...requiredFieldRule })}
                  onChange={(e) => setShownFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  variant="filled"
                  value={shownLastName}
                  fullWidth
                  label={`${t("last-name")} *`}
                  error={!!errors["last-name"]}
                  helperText={
                    errors["last-name"]?.message !== undefined &&
                    String(errors["last-name"]?.message)
                  }
                  {...register("last-name", { ...requiredFieldRule })}
                  onChange={(e: any) => setShownLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  variant="filled"
                  fullWidth
                  value={shownEmail}
                  label="Email *"
                  error={!!errors["email"]}
                  helperText={
                    errors["email"]?.message !== undefined &&
                    String(errors["email"]?.message)
                  }
                  {...register("email", {
                    ...requiredFieldRule,
                    ...emailFieldRule,
                  })}
                  onChange={(e) => setShownEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="medium"
                  sx={{ width: "25%", mt: 2 }}
                >
                  {t("submit")}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </form>
      {showAlert === true && (
        <NotificationToast
          toastText={t("updated-profile-error")}
          isSuccessful={false}
        />
      )}
    </>
  );
}
