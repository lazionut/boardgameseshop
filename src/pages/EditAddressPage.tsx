import { useState, useEffect } from "react";

import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import NavigateBackButton from "src/components/common/NavigateBackButton";
import NotificationToast from "src/components/common/NotificationToast";
import { Configs } from "src/constants/Configs";
import { Countries } from "src/constants/Countries";
import { phoneFieldRule, requiredFieldRule } from "src/constants/Rules";
import sendDataService from "src/services/sendDataService";

export default function EditAddressPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  //const countryCode: string = getCurrentCountryCode();
  const { t } = useTranslation();

  const [showAlert, setShowAlert] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      street: state?.details ?? "",
      county: state?.county ?? "",
      city: state?.city ?? "",
      country: state?.country ?? "",
      phone: state?.phone ?? "",
    },
  });

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
    });

    if (editAddressResponse.status === Configs.NO_CONTENT_RESPONSE) {
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
              marginTop: "5%",
            }}
          >
            <Typography variant="h5">My address</Typography>
            <Grid container spacing={"3%"} sx={{ mt: "2%" }}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  variant="filled"
                  fullWidth
                  autoFocus
                  label={`${t("street")} *`}
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
                  variant="filled"
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
                  variant="filled"
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
                  defaultValue={{
                    label: String(state?.country),
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
                        src={new URL(`../assets/images/countries_flags/${option.code.toLowerCase()}.png`, import.meta.url).href}
                        alt="country flag"
                      />
                      {option.label} ({option.code})
                    </Box>
                  )}
                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <TextField
                      {...params}
                      type="text"
                      variant="filled"
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
                  variant="filled"
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="medium"
                  sx={{ width: "25%", mt: "3%" }}
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
          toastText={t("updated-address-error")}
          isSuccessful={false}
        />
      )}
    </>
  );
}
