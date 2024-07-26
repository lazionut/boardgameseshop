import { useEffect } from "react";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { AxiosRequestConfig } from "axios";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { phoneFieldRule, requiredFieldRule } from "../../../constants/Rules";
import { useAuthContext } from "../../../context/AuthContext";
import useFetchData from "../../../hooks/useFetchData";

interface AddressDetailsProps {
  setNameDetails: React.Dispatch<React.SetStateAction<string>>;
  setAddressDetails: React.Dispatch<React.SetStateAction<string>>;
  setIsFormValidated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddressDetails({
  setNameDetails,
  setAddressDetails,
  setIsFormValidated,
}: AddressDetailsProps) {
  const { authToken } = useAuthContext();
  const { t } = useTranslation();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const accountRequestConfig: AxiosRequestConfig = {
    url: "/accounts/me",
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const [{ data: accountData, loading, error }] =
    useFetchData(accountRequestConfig);

  useEffect(() => {
    setValue("first-name", accountData.firstName ?? "");
    setValue("last-name", accountData.lastName ?? "");
    setValue("street", accountData.address?.details ?? "");
    setValue("city", accountData.address?.city ?? "");
    setValue("county", accountData.address?.county ?? "");
    setValue("country", accountData.address?.country ?? "");
    setValue("phone", accountData.address?.phone ?? "");
  }, [accountData]);

  const handleFormSubmission = async (data: { [key: string]: string }) => {
    setNameDetails(data["first-name"] + " " + data["last-name"]);
    setAddressDetails(
      Object.values({
        details: data["street"],
        city: data["city"],
        county: data["county"],
        country: data["country"],
        phone: data["phone"],
      }).join(", ")
    );

    setIsFormValidated(true);
  };

  return (
    <>
      {accountData.address && (
        <form onSubmit={handleSubmit(handleFormSubmission)}>
          <Typography variant="h6" gutterBottom>
            {t("shipping-address")}
          </Typography>
          <Grid container spacing={"5%"}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                fullWidth
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
                variant="outlined"
                InputLabelProps={{ shrink: true }}
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
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                fullWidth
                label={`${t("address")} 1 *`}
                error={!!errors["street"]}
                helperText={
                  errors["street"]?.message !== undefined &&
                  String(errors["street"]?.message)
                }
                {...register("street", { ...requiredFieldRule })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="address2"
                label={`${t("address")} 2`}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
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
                variant="outlined"
                InputLabelProps={{ shrink: true }}
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
              <TextField
                type="text"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                fullWidth
                label={`${t("country")} *`}
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
                variant="outlined"
                InputLabelProps={{ shrink: true }}
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
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" type="submit" sx={{ mt: 3, ml: 1 }}>
              {t("next")}
            </Button>
          </Box>
        </form>
      )}
    </>
  );
}
