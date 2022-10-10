import React, { useEffect, useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { AxiosRequestConfig } from "axios";

import useFetchData from "../../../hooks/useFetchData";
import { useForm } from "react-hook-form";
import { phoneFieldRule, requiredFieldRule } from "../../../constants/Rules";

interface AddressDetailsProps {
  setNameDetails: React.Dispatch<React.SetStateAction<string>>;
  setAddressDetails: React.Dispatch<React.SetStateAction<string>>;
}

export default function AddressDetails({
  setNameDetails,
  setAddressDetails,
}: AddressDetailsProps) {
  const authToken: string | null = localStorage.getItem("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [shownFirstName, setShownFirstName] = useState<string | undefined>();
  const [shownLastName, setShownLastName] = useState<string | undefined>();
  const [shownStreet, setShownStreet] = useState<string | undefined>();
  const [shownCity, setShownCity] = useState<string | undefined>();
  const [shownCounty, setShownCounty] = useState<string | undefined>();
  const [shownCountry, setShownCountry] = useState<string | undefined>();
  const [shownPhone, setShownPhone] = useState<string | undefined>();

  const accountRequestConfig: AxiosRequestConfig = {
    url: "/accounts/me",
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const {
    data: accountData,
    loading,
    error,
  } = useFetchData(accountRequestConfig);

  useEffect(() => {
    setShownFirstName(accountData.firstName);
    setShownLastName(accountData.lastName);

    if (accountData.address) {
      setShownStreet(accountData.address.details);
      setShownCity(accountData.address.city);
      setShownCounty(accountData.address.county);
      setShownCountry(accountData.address.country);
      setShownPhone(accountData.address.phone);
    }
  }, [accountData]);

  useEffect(() => {
    setNameDetails(shownFirstName + " " + shownLastName);
    setAddressDetails(
      Object.values({
        details: shownStreet,
        city: shownCity,
        county: shownCounty,
        country: shownCountry,
        phone: shownPhone,
      }).join(", ")
    );
  }, [
    shownFirstName,
    shownLastName,
    shownStreet,
    shownCity,
    shownCounty,
    shownCountry,
    shownPhone,
  ]);

  const handleFormSubmission = async (data: { [key: string]: string }) => {
    console.log("Intra");
  };

  return (
    <>
      {accountData.address && (
        <form onSubmit={handleSubmit(handleFormSubmission)}>
          <Typography variant="h6" gutterBottom>
            Shipping address
          </Typography>
          <Grid container spacing={"5%"}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={shownFirstName}
                fullWidth
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
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={shownLastName}
                fullWidth
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
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={shownStreet}
                fullWidth
                label="Address 1 *"
                error={!!errors["street"]}
                helperText={
                  errors["street"]?.message !== undefined &&
                  String(errors["street"]?.message)
                }
                {...register("street", { ...requiredFieldRule })}
                onChange={(e: any) => setShownStreet(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="address2"
                label="Address 2"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={shownCity}
                fullWidth
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
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={shownCounty}
                fullWidth
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
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={shownCountry}
                fullWidth
                error={!!errors["country"]}
                helperText={
                  errors["country"]?.message !== undefined &&
                  String(errors["country"]?.message)
                }
                {...register("country", { ...requiredFieldRule })}
                label="Country *"
                onChange={(e) => setShownCountry(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={shownPhone}
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
                onChange={(e) => setShownPhone(e.target.value)}
              />
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
}
