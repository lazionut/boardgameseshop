import React from "react";
import { Card } from "@mui/joy";
import {
  Box,
  CardActions,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography,
  Button,
} from "@mui/material";

interface WishlistCardProp {
  wishlist: {
    id: number;
    name: string;
    creationDate: string;
    updateDate: string;
    boardgames: {
      id: number;
      image: null;
      name: string;
      releaseYear: number;
      description: string;
      price: number;
      link: string;
    }[];
  };
}

export default function WishlistCard({ wishlist }: WishlistCardProp) {
  return (
    <Container sx={{ mt: "2%" }} maxWidth="xs">
      <Card variant="outlined">
        <Box>
          <Typography> {wishlist.name}</Typography>
        </Box>
        <Divider />
        <Grid container flexDirection="row" justifyContent="center">
          {wishlist.boardgames.map((boardgame: any) => (
            <Box key={boardgame.id}>
              <CardActions sx={{ flexDirection: "column" }}>
                <CardMedia
                  component="img"
                  image={require("../../assets/images/no_image.jpg")}
                  alt="no image"
                  sx={{ width: 90, height: 70 }}
                />
                <Typography fontSize="lg">{boardgame.name}</Typography>
                <Typography fontSize="lg">{boardgame.price}</Typography>
                <Button variant="contained">View details</Button>
              </CardActions>
            </Box>
          ))}
        </Grid>
        <Divider />
        <Grid container flexDirection="column">
          <CardActions
            sx={{
              flexDirection: "column",
            }}
          >
            <Typography mt={2}>Created at: {wishlist.creationDate}</Typography>
            <Typography mt={2}>Updated at: {wishlist.updateDate}</Typography>
          </CardActions>
        </Grid>
      </Card>
    </Container>
  );
}
