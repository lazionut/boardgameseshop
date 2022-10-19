import React from "react";
import { Typography } from "@mui/material";

export default function Copyright() {
  return (
    <Typography variant="body2" color="common.customDarkTurqoise">
      © {new Date().getFullYear()}
    </Typography>
  );
}
