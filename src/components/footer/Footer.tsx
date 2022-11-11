import React from "react";
import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import Copyright from "./Copyright";

export default function Footer() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem("lang", language);
  };

  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        bottom: 0,
        mb: { xs: -8.5, sm: -10.5, md: -12.7, lg: -9 },
        width: "100%",
        py: { xs: "3%", lg: "1%" },
        bgcolor: "common.customCavernClay",
        color: "common.customDarkTurqoise",
      }}
    >
      <Box sx={{ ml: "auto", mr: "-10%" }}>
        <Typography variant="body1">{t("hoarding-boardgames")}</Typography>
        <Copyright />
      </Box>
      <Box sx={{ ml: "auto", mr: 2 }}>
        <ButtonGroup variant="contained">
          <Button
            onClick={() => changeLanguage("en")}
            sx={{ color: "common.customDarkTurqoise", mt: "30" }}
          >
            EN
          </Button>
          <Button
            onClick={() => changeLanguage("ro")}
            sx={{ color: "common.customDarkTurqoise" }}
          >
            RO
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}
