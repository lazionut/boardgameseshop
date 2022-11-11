import React from "react";
import {
  Grid,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function PaymentShippingDetails() {
  const { t } = useTranslation();

  return (
    <div>
      <Grid container spacing={"5%"} flexDirection="column">
        <Grid item justifyContent="center">
          <Typography variant="h6" gutterBottom>
            {t("payment-details")}
          </Typography>
        </Grid>
        <Grid item xs={12} justifyContent="flex-start">
          <Typography>
            <Grid item>
              <FormControl>
                <FormControlLabel
                  control={<Radio checked={true} />}
                  label={t("pay-cash")}
                />
              </FormControl>
            </Grid>
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={"5%"} flexDirection="column" mt="5%">
        <Grid item justifyContent="center">
          <Typography variant="h6" gutterBottom>
            {t("shipping-details")}
          </Typography>
        </Grid>
        <Grid item xs={12} justifyContent="flex-start">
          <Typography>{t("shipping-cost")}</Typography>
          <Typography>
            <Grid item>
              <FormControl>
                <FormControlLabel
                  control={<Radio checked={true} />}
                  label={t("delivery-by-courier")}
                />
              </FormControl>
            </Grid>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
