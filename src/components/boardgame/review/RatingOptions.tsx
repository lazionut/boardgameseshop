import React, { useState } from "react";
import { Box, Rating, styled, Typography } from "@mui/material";
import { GiMeeple } from "react-icons/gi";

interface RatingOptionsProps {
  ratingStars: number | null;
  setRatingStars: React.Dispatch<React.SetStateAction<number | null>>;
}

export const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#CDC50A",
  },
  "& .MuiRating-iconHover": {
    color: "#CDC50A",
  },
});

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
      <StyledRating
        value={ratingStars}
        onChange={(event, value) => {
          setRatingStars(value);
        }}
        icon={<GiMeeple fontSize="inherit" />}
        emptyIcon={<GiMeeple fontSize="inherit" />}
      />
    </Box>
  );
}
