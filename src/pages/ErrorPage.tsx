import React from "react";
import { Grid, Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ErrorPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "75vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={"2%"}>
          <Grid item xs={12}>
            <Box
              component="img"
              sx={{
                width: 350,
                height: 250,
              }}
              src={require("../assets/images/error_404.png")}
              alt="error image"
            />
            <Typography variant="h6">{t("error-page")}</Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/")}
              sx={{ mt: "3%" }}
            >
              {t("back-home")}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
