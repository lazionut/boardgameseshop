import React from "react";
import { Grid, Box, Container, Typography } from "@mui/material";

export default function ErrorTemplate() {
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
            <Typography variant="h6">The page is empty right now</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
