import { Grid, Box, Container, Typography } from "@mui/material";

interface ErrorTemplateProps {
  pageText: string;
}

export default function ErrorTemplate({ pageText }: ErrorTemplateProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "20vh",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">{pageText}</Typography>
        </Grid>
      </Container>
    </Box>
  );
}
