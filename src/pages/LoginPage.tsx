import { useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IoMdLogIn } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

import { NotificationToast } from "../components/common/NotificationToast";
import { emailFieldRule, requiredFieldRule } from "../constants/Rules";
import useTimeout from "../hooks/useTimeout";
import authenticationService, {
  Login,
} from "../services/authenticationService";

export default function LoginPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleFormSubmission = async (data: { [key: string]: string }) => {
    const loginInput: Login = {
      loginData: {
        email: data["email"],
        password: data["password"],
      },
    };

    const loginResponse = await authenticationService.login(loginInput);

    if (loginResponse?.data.token !== undefined) {
      navigate("/", { state: { isLoggedIn: true } });
    } else {
      setShowAlert(true);
    }
  };

  useTimeout(showAlert, setShowAlert);

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmission)}>
        <Container maxWidth="xs" sx={{ mt: { xs: 20, sm: 15 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: { xs: "40vh", sm: "30vh" },
            }}
          >
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <IoMdLogIn />
            </Avatar>
            <Typography variant="h5">{t("sign-in")}</Typography>
            <Grid container spacing={"5%"} sx={{ mt: "5%" }}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  fullWidth
                  autoFocus
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
                  helperText={
                    errors["password"]?.message !== undefined &&
                    String(errors["password"]?.message)
                  }
                  {...register("password", {
                    ...requiredFieldRule,
                  })}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="medium"
              sx={{ mt: "5%", mb: "5%" }}
            >
              {t("sign-in")}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={"/register"}>{t("missing-account")}</Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </form>
      {showAlert === true && (
        <NotificationToast
          toastText={t("account-incorrect")}
          isSuccessful={false}
        />
      )}
    </>
  );
}
