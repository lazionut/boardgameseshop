import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

import {
  emailFieldRule,
  passwordFieldRule,
  phoneFieldRule,
  requiredFieldRule,
} from "../constants/Rules";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmission = () => {
    setShowAlert(true);
    navigate("/boardgames");
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmission)}>
        <Container maxWidth="xs">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 8,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <IoMdLogIn />
            </Avatar>
            <Typography variant="h5">Sign up</Typography>
            <Grid container spacing={2} sx={{ mt: 3 }}>
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
                  autoFocus
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
                  autoFocus
                  label="Street *"
                  error={!!errors["street"]}
                  helperText={
                    errors["street"]?.message !== undefined &&
                    String(errors["street"]?.message)
                  }
                  {...register("street", { ...requiredFieldRule })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  fullWidth
                  autoFocus
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
                  autoFocus
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
                <TextField
                  type="text"
                  fullWidth
                  autoFocus
                  label="Country *"
                  error={!!errors["country"]}
                  helperText={
                    errors["country"]?.message !== undefined &&
                    String(errors["country"]?.message)
                  }
                  {...register("country", { ...requiredFieldRule })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  fullWidth
                  autoFocus
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
                    ...passwordFieldRule,
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  fullWidth
                  autoFocus
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
              sx={{ mt: 3, mb: 1.5 }}
            >
              Sign up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>Having an account already? Sign in</Grid>
            </Grid>
          </Box>
        </Container>
      </form>
      {showAlert && <Alert>Form submitted successfully!</Alert>}
    </>
  );
}
