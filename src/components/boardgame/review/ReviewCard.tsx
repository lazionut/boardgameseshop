import React from "react";
import { Box, Card, Rating, Typography } from "@mui/material";

interface ReviewCardProps {
  review: {
    id: number;
    title: string;
    author: string;
    score: number;
    content: string;
    boardgameId: number;
    accountId: number;
    creationDate: string;
  };
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card variant="outlined" sx={{ bgcolor: "common.customDirtyWhite" }}>
      <Box sx={{ mt: "3%", mb: { xs: "5%", md: "2%" }, ml: "2%" }}>
        <Typography align="justify" paragraph={true}>
          <Rating value={review.score} readOnly />
        </Typography>
        <Typography align="justify" paragraph={true}>
          {review.title} | {review.author}
        </Typography>
        <Typography align="justify" paragraph={true}>
          {review.content}
        </Typography>
      </Box>
    </Card>
  );
}
