import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { phoneFieldRule, requiredFieldRule } from "../constants/Rules";
import { BiArrowBack } from "react-icons/bi";
import { AxiosRequestConfig } from "axios";

import useFetchData from "../hooks/useFetchData";

export default function EditAddressPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [shownStreet, setShownStreet] = useState<string>(
    state.myAccount.address.details
  );
  const [shownCounty, setShownCounty] = useState<string>(
    state.myAccount.address.county
  );
  const [shownCity, setShownCity] = useState<string>(
    state.myAccount.address.city
  );
  const [shownCountry, setShownCountry] = useState<string>(
    state.myAccount.address.country
  );
  const [shownPhone, setShownPhone] = useState<string>(
    state.myAccount.address.phone
  );

  const [showAlert, setShowAlert] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmission = (data: any) => {
    console.log(data);
    setShowAlert(true);
    navigate("/account");
  };

  const updateAddressRequestConfig: AxiosRequestConfig = {
    url: "addresses",
    method: "PUT",
  };

  const { loading, error } = useFetchData(updateAddressRequestConfig);

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
            <Typography variant="h5">My address</Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  variant="filled"
                  value={shownStreet}
                  fullWidth
                  autoFocus
                  label="Street *"
                  error={!!errors["street"]}
                  helperText={
                    errors["street"]?.message !== undefined &&
                    String(errors["street"]?.message)
                  }
                  {...register("street", { ...requiredFieldRule })}
                  onChange={(e: any) => setShownStreet(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  variant="filled"
                  value={shownCity}
                  fullWidth
                  autoFocus
                  error={!!errors["city"]}
                  helperText={
                    errors["city"]?.message !== undefined &&
                    String(errors["city"]?.message)
                  }
                  {...register("city", { ...requiredFieldRule })}
                  label="City *"
                  onChange={(e) => setShownCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  variant="filled"
                  value={shownCounty}
                  fullWidth
                  autoFocus
                  error={!!errors["county"]}
                  helperText={
                    errors["county"]?.message !== undefined &&
                    String(errors["county"]?.message)
                  }
                  {...register("county", { ...requiredFieldRule })}
                  label="County *"
                  onChange={(e) => setShownCounty(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  variant="filled"
                  value={shownCountry}
                  fullWidth
                  autoFocus
                  label="Country *"
                  error={!!errors["country"]}
                  helperText={
                    errors["country"]?.message !== undefined &&
                    String(errors["country"]?.message)
                  }
                  {...register("country", { ...requiredFieldRule })}
                  onChange={(e) => setShownCountry(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  variant="filled"
                  value={shownPhone}
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
                  onChange={(e) => setShownPhone(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
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
