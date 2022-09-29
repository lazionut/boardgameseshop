import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";

import { emailFieldRule, requiredFieldRule } from "../constants/Rules";
import useFetchData from "../hooks/useFetchData";
import { AxiosRequestConfig } from "axios";

export default function EditAccountPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [shownFirstName, setShownFirstName] = useState<string>(
    state.myAccount.firstName
  );
  const [shownLastName, setShownLastName] = useState<string>(
    state.myAccount.lastName
  );
  const [shownEmail, setShownEmail] = useState<string>(state.myAccount.email);
  const [showAlert, setShowAlert] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmission = () => {
    setShowAlert(true);
    navigate("/account");
  };

  const updateAccountRequestConfig: AxiosRequestConfig = {
    url: "accounts",
    method: "PUT",
  };

  const { loading, error } = useFetchData(updateAccountRequestConfig);

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmission)}>
        <Container
          sx={{
            maxWidth: { xs: "xs", sm: "sm", md: "xs" },
          }}
        >
          <Box sx={{ mt: "5%", display: "flex", justifyContent: "flex-start" }}>
            <Link to="/account">
              <BiArrowBack />
              Back to account
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            <Typography variant="h5">Edit account</Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  variant="filled"
                  value={shownFirstName}
                  fullWidth
                  autoFocus
                  label="First Name *"
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
                  autoFocus
                  label="Last Name *"
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
                  autoFocus
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
                  onClick={handleFormSubmission}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </form>
    </>
  );
}
