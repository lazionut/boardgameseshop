import React, { useState } from "react";
import {
  Alert,
  Autocomplete,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import {
  emailFieldRule,
  passwordFieldRule,
  PASSWORD_MESSAGE,
  phoneFieldRule,
  requiredFieldRule,
} from "../constants/Rules";
import authenticationService, {
  Account,
} from "../services/authenticationService";
import useTimeout from "../hooks/useTimeout";
import { NotificationToast } from "../components/common/NotificationToast";
import { Countries } from "../constants/Countries";

export default function RegisterPage() {
  const navigate = useNavigate();

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
            <Typography variant="h5">Sign up</Typography>
            <Grid container spacing={"2%"} sx={{ mt: "3%" }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  fullWidth
                  autoFocus
                  label="First Name *"
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
                  label="Last Name *"
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
                  label="Street *"
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
                  error={!!errors["city"]}
                  helperText={
                    errors["city"]?.message !== undefined &&
                    String(errors["city"]?.message)
                  }
                  {...register("city", { ...requiredFieldRule })}
                  label="City *"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  fullWidth
                  error={!!errors["county"]}
                  helperText={
                    errors["county"]?.message !== undefined &&
                    String(errors["county"]?.message)
                  }
                  {...register("county", { ...requiredFieldRule })}
                  label="County *"
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
                      sx={{ "& > img": { mr: "5%" } }}
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
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      type="text"
                      fullWidth
                      label="Country *"
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
                  label="Phone *"
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
                  label="Password *"
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
                  label="Confirm password *"
                  error={!!errors["confirm-password"]}
                  helperText={
                    errors["confirm-password"]?.message !== undefined &&
                    String(errors["confirm-password"]?.message)
                  }
                  {...register("confirm-password", {
                    ...requiredFieldRule,
                    validate: (passwordValue: string) => {
                      if (watch("password") !== passwordValue) {
                        return "Your passwords do no match";
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
              Sign up
            </Button>
            <Grid container justifyContent="flex-end" mb={"5%"}>
              <Grid item>
                <Link to={"/login"}>Having an account already? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </form>
      {showAlert === true && (
        <NotificationToast
          toastText="Please choose a different email"
          isSuccessful={false}
        />
      )}
    </>
  );
}
