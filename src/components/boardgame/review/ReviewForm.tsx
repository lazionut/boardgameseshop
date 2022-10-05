import React, { useState } from "react";
import {
  Box,
  TextField,
  Grid,
  Button,
  Rating,
  Typography,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import sendDataService from "../../../services/sendDataService";
import { requiredFieldRule } from "../../../constants/Rules";
import useTimeout from "../../../hooks/useTimeout";
import RatingOptions from "./RatingOptions";

export function ReviewForm() {
  const { boardgameId } = useParams();
  const authToken: string | null = localStorage.getItem("token");

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [ratingStars, setRatingStars] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFormSubmission = async (data: { [key: string]: string }) => {
    const reviewInput = {
      boardgameId: Number(boardgameId),
      score: ratingStars,
      title: data["title"],
      content: data["content"],
    };

    const createReviewResponse = await sendDataService.execute({
      url: "/reviews",
      method: "post",
      data: reviewInput,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (createReviewResponse?.data !== undefined) {
      reset({ title: "", content: "" });
      setRatingStars(null);
      setShowAlert(true);
    }
  };

  useTimeout(showAlert, setShowAlert);

  return (
    <>
      <RatingOptions
        ratingStars={ratingStars}
        setRatingStars={setRatingStars}
      />
      <form onSubmit={handleSubmit(handleFormSubmission)}>
        <Box marginTop="2%">
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            type="text"
            autoFocus
            label="Title"
            error={!!errors["title"]}
            helperText={
              errors["title"]?.message !== undefined &&
              String(errors["title"]?.message)
            }
            {...register("title", { ...requiredFieldRule })}
          />
        </Box>
        <Box marginTop="2%">
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            autoFocus
            label="Content"
            error={!!errors["content"]}
            helperText={
              errors["content"]?.message !== undefined &&
              String(errors["content"]?.message)
            }
            {...register("content", { ...requiredFieldRule })}
          />
        </Box>
        <Grid item mt="2%">
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Grid>
      </form>
      {showAlert && <Alert>Review succesfully added</Alert>}
    </>
  );
}
