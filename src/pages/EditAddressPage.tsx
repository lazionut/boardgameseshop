import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Container from "@mui/material/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { phoneFieldRule, requiredFieldRule } from "../constants/Rules";

import NavigateBackButton from "../components/NavigateBackButton";
import { Configs } from "../constants/Configs";
import sendDataService from "../services/sendDataService";
import { NotificationToast } from "../components/NotificationToast";
import { Countries } from "../constants/Countries";
import { getCurrentCountryCode } from "../utils/Utilities";

export default function EditAddressPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const authToken: string | null = localStorage.getItem("token");
  //const countryCode: string = getCurrentCountryCode();

  const [shownStreet, setShownStreet] = useState<string | undefined>(
    state?.details
  );
  const [shownCounty, setShownCounty] = useState<string | undefined>(
    state?.county
  );
  const [shownCity, setShownCity] = useState<string | undefined>(state?.city);
  const [shownCountry, setShownCountry] = useState<string | undefined>(
    state?.country
  );
  const [shownPhone, setShownPhone] = useState<string | undefined>(
    state?.phone
  );

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (
      state?.details === undefined ||
      state?.county === undefined ||
      state?.city === undefined ||
      state?.country === undefined ||
      state?.phone === undefined
    ) {
      navigate("/account");
    }
  }, []);

  const handleFormSubmission = async (data: { [key: string]: string }) => {
    const editAddressInput = {
      details: data["street"],
      city: data["city"],
      county: data["county"],
      country: data["country"],
      phone: data["phone"],
    };

    const editAddressResponse = await sendDataService.execute({
      url: "/addresses",
      method: "put",
      data: editAddressInput,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (editAddressResponse?.status === Configs.NO_CONTENT_RESPONSE) {
      navigate("/account", { state: { isEditedAddress: true } });
    } else {
      setShowAlert(true);
    }
  };

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
                <Autocomplete
                  options={Countries}
                  autoHighlight
                  defaultValue={{
                    label: String(shownCountry),
                    code: "default",
                  }}
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
                  )}
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
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </form>
      {showAlert === true && (
        <NotificationToast
          toastText="Address couldn't be updated"
          isSuccessful={false}
        />
      )}
    </>
  );
}
