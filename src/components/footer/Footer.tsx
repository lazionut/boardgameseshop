import React from "react";
import { Box, Container, Typography } from "@mui/material";

import Copyright from "./Copyright";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: "absolute",
        bottom: 0,
        mb: { xs: -8.5, sm: -10.5, md: -12.7, lg: -9 },
        width: "100%",
        py: { xs: "3%", lg: "1%" },
        bgcolor: "common.customCavernClay",
        color: "common.customDarkTurqoise",
      }}
    >
      <Container>
        <Typography variant="body1">Hoarding boardgames since</Typography>
        <Copyright />
      </Container>
    </Box>
  );
}
