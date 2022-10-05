import React, { useState } from "react";
import { Box, Rating, Typography } from "@mui/material";

interface RatingOptionsProps {
  ratingStars: number | null;
  setRatingStars: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function RatingOptions({
  ratingStars,
  setRatingStars,
}: RatingOptionsProps) {
  return (
    <Box
      sx={{
        "& > legend": { mt: "2%" },
      }}
    >
      <Typography component="legend">Rate this game:</Typography>
      <Rating
        value={ratingStars}
        onChange={(event, value) => {
          setRatingStars(value);
        }}
      />
    </Box>
  );
}
