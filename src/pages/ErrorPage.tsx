import React from "react";
import { Grid, Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

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
            <Typography variant="h6">
              The page you`re looking for doesn`t exist
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/")}
              sx={{ mt: "3%" }}
            >
              Back Home
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
