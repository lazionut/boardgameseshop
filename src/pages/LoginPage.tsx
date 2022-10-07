import React, { useState, useEffect } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { IoMdLogIn } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

import { NotificationToast } from "../components/common/NotificationToast";
import { emailFieldRule, requiredFieldRule } from "../constants/Rules";
import authenticationService, {
  Login,
} from "../services/authenticationService";
import useTimeout from "../hooks/useTimeout";

export default function LoginPage() {
  const navigate = useNavigate();

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
        <Container maxWidth="xs">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: { xs: "40vh", sm: "30vh", md: "40vh" },
            }}
          >
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <IoMdLogIn />
            </Avatar>
            <Typography variant="h5">Sign in</Typography>
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
                  autoFocus
                  label="Password *"
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
              Sign in
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={"/register"}>
                  Don't have an account already? Sign up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </form>
      {showAlert === true && (
        <NotificationToast
          toastText="Email or password are incorrect"
          isSuccessful={false}
        />
      )}
    </>
  );
}
