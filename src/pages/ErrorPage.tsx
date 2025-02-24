import { Grid, Box, Button, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import error_404 from "src/assets/images/error_404.png";

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
              src={error_404}
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
