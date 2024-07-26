import { useState, useEffect } from "react";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import NavigateBackButton from "../components/common/NavigateBackButton";
import NotificationToast from "../components/common/NotificationToast";import { Configs } from "../constants/Configs";
import { emailFieldRule, requiredFieldRule } from "../constants/Rules";
import useTimeout from "../hooks/useTimeout";
import sendDataService from "../services/sendDataService";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { t } = useTranslation();

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
  } = useForm({
    defaultValues: {
      "first-name": state?.firstName,
      "last-name": state?.lastName,
      email: state?.email,
    },
  });

  const handleFormSubmission = async (data: { [key: string]: string }) => {
    const editAccountInput = {
      firstName: data["first-name"],
      lastName: data["last-name"],
      email: data["email"],
    };

    const editProfileResponse = await sendDataService.execute({
      url: "/accounts",
      method: "patch",
      data: editAccountInput,
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
                  fullWidth
                  autoFocus
                  label={`${t("first-name")} *`}
                  error={!!errors["first-name"]}
                  helperText={
                    errors["first-name"]?.message !== undefined &&
                    String(errors["first-name"]?.message)
                  }
                  {...register("first-name", { ...requiredFieldRule })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  variant="filled"
                  fullWidth
                  label={`${t("last-name")} *`}
                  error={!!errors["last-name"]}
                  helperText={
                    errors["last-name"]?.message !== undefined &&
                    String(errors["last-name"]?.message)
                  }
                  {...register("last-name", { ...requiredFieldRule })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  variant="filled"
                  fullWidth
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
