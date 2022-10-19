import React from "react";
import {
  Grid,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
} from "@mui/material";

export default function PaymentShippingDetails() {
  return (
    <div>
      <Grid container spacing={"5%"} flexDirection="column">
        <Grid item justifyContent="center">
          <Typography variant="h6" gutterBottom>
            Payment details
          </Typography>
        </Grid>
        <Grid item xs={12} justifyContent="flex-start">
          <Typography>
            <Grid item>
              <FormControl>
                <FormControlLabel
                  control={<Radio checked={true} />}
                  label="Pay cash"
                />
              </FormControl>
            </Grid>
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={"5%"} flexDirection="column" mt="5%">
        <Grid item justifyContent="center">
          <Typography variant="h6" gutterBottom>
            Shipping details
          </Typography>
        </Grid>
        <Grid item xs={12} justifyContent="flex-start">
          <Typography> Shipping cost: Free</Typography>
          <Typography>
            <Grid item>
              <FormControl>
                <FormControlLabel
                  control={<Radio checked={true} />}
                  label="Delivery by courier"
                />
              </FormControl>
            </Grid>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
