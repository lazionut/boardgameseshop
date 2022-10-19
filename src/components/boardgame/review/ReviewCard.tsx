import React from "react";
import { Box, Card, Grid, IconButton, Rating, Typography } from "@mui/material";
import jwt_decode from "jwt-decode";
import { MdDelete } from "react-icons/md";

import sendDataService from "../../../services/sendDataService";
import { Configs } from "../../../constants/Configs";
import { Constants } from "../../../constants/Constants";
import { StyledRating } from "./RatingOptions";
import { GiMeeple } from "react-icons/gi";

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
  const authToken: string | null = localStorage.getItem("token");
  let accountDecoded: { [key: string]: any } | null = null;

  if (authToken !== null) {
    accountDecoded = jwt_decode(authToken);
  }

  const handleReviewDelete = async (id: number) => {
    const createWishlistResponse = await sendDataService.execute({
      url: `/reviews/${id}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (createWishlistResponse.status === Configs.OK_RESPONSE) {
      window.location.reload();
    }
  };

  return (
    <Card variant="outlined" sx={{ bgcolor: "common.customDirtyWhite" }}>
      <Box sx={{ mt: "3%", mb: { xs: "5%", md: "2%" }, ml: "2%" }}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography align="justify" paragraph={true}>
              <StyledRating
                value={review.score}
                icon={<GiMeeple fontSize="inherit" />}
                emptyIcon={<GiMeeple fontSize="inherit" />}
                readOnly
              />
            </Typography>
          </Grid>
          <Grid item>
            {accountDecoded?.Role === Constants.ADMIN && (
              <IconButton
                sx={{ marginLeft: "auto", color: "red" }}
                onClick={() => handleReviewDelete(review.id)}
              >
                <MdDelete size={30} />
              </IconButton>
            )}
          </Grid>
        </Grid>
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
