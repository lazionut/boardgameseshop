import { useState } from "react";

import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { NotificationToast } from "../components/common/NotificationToast";
import { Countries } from "../constants/Countries";
import {
  emailFieldRule,
  passwordFieldRule,
  PASSWORD_MESSAGE,
  phoneFieldRule,
  requiredFieldRule,
} from "../constants/Rules";
import useTimeout from "../hooks/useTimeout";
import authenticationService, {
  Account,
} from "../services/authenticationService";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmission = async (data: { [key: string]: string }) => {
    const registerInput: Account = {
      accountData: {
        details: data["details"],
        city: data["city"],
        county: data["county"],
        country: data["country"],
        phone: data["phone"],
        firstName: data["first-name"],
        lastName: data["last-name"],
        email: data["email"],
        password: data["password"],
      },
    };

    const registerResponse = await authenticationService.register(
      registerInput
    );

    if (registerResponse?.data.token !== undefined) {
      navigate("/", { state: { isLoggedIn: true } });
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            <Typography variant="h5">{t("sign-up")}</Typography>
            <Grid container spacing={"2%"} sx={{ mt: "3%" }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
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
                  fullWidth
                  label={`${t("street")} *`}
                  error={!!errors["details"]}
                  helperText={
                    errors["details"]?.message !== undefined &&
                    String(errors["details"]?.message)
                  }
                  {...register("details", { ...requiredFieldRule })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  fullWidth
                  label={`${t("city")} *`}
                  error={!!errors["city"]}
                  helperText={
                    errors["city"]?.message !== undefined &&
                    String(errors["city"]?.message)
                  }
                  {...register("city", { ...requiredFieldRule })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  fullWidth
                  label={`${t("county")} *`}
                  error={!!errors["county"]}
                  helperText={
                    errors["county"]?.message !== undefined &&
                    String(errors["county"]?.message)
                  }
                  {...register("county", { ...requiredFieldRule })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={Countries}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{
                        "& > img": { mr: "5%" },
                      }}
                      {...props}
                    >
                      <img
                        loading="lazy"
                        width="20"
                        src={require(`../assets/images/countries_flags/${option.code.toLowerCase()}.png`)}
                        alt="country flag"
                      />
                      {option.label} ({option.code})
                    </Box>
                  )}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      type="text"
                      fullWidth
                      label={`${t("country")} *`}
                      error={!!errors["country"]}
                      helperText={
                        errors["country"]?.message !== undefined &&
                        String(errors["country"]?.message)
                      }
                      {...register("country", { ...requiredFieldRule })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  fullWidth
                  label={`${t("phone")} *`}
                  error={!!errors["phone"]}
                  helperText={
                    errors["phone"]?.message !== undefined &&
                    String(errors["phone"]?.message)
                  }
                  {...register("phone", {
                    ...requiredFieldRule,
                    ...phoneFieldRule,
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
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
                <TextField
                  type="password"
                  fullWidth
                  label={`${t("password")} *`}
                  error={!!errors["password"]}
                  helperText={PASSWORD_MESSAGE}
                  {...register("password", {
                    ...requiredFieldRule,
                    ...passwordFieldRule,
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  fullWidth
                  label={`${t("confirm-password")} *`}
                  error={!!errors["confirm-password"]}
                  helperText={
                    errors["confirm-password"]?.message !== undefined &&
                    String(errors["confirm-password"]?.message)
                  }
                  {...register("confirm-password", {
                    ...requiredFieldRule,
                    validate: (passwordValue: string) => {
                      if (watch("password") !== passwordValue) {
                        return `${t("match-passwords")}`;
                      }
                    },
                  })}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="medium"
              sx={{ mt: "5%", mb: "3%" }}
            >
              {t("sign-up")}
            </Button>
            <Grid container justifyContent="flex-end" mb={"5%"}>
              <Grid item>
                <Link to={"/login"}>{t("having-account")}</Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </form>
      {showAlert === true && (
        <NotificationToast
          toastText={t("different-email")}
          isSuccessful={false}
        />
      )}
    </>
  );
}
