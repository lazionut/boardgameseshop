import { useState } from "react";

import { Box, TextField, Grid, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import RatingOptions from "./RatingOptions";
import { requiredFieldRule } from "../../../constants/Rules";
import useTimeout from "../../../hooks/useTimeout";
import sendDataService from "../../../services/sendDataService";
import { NotificationToast } from "../../common/NotificationToast";

interface ReviewFormProps {
  boardgameId: number;
  setIsReviewCreated: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ReviewForm({
  boardgameId,
  setIsReviewCreated,
}: ReviewFormProps) {
  const { t } = useTranslation();

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
      boardgameId: boardgameId,
      score: ratingStars,
      title: data["title"],
      content: data["content"],
    };

    const createReviewResponse = await sendDataService.execute({
      url: "/reviews",
      method: "post",
      data: reviewInput,
    });

    reset({ title: "", content: "" });
    setRatingStars(null);

    if (createReviewResponse?.data !== undefined) {
      setIsReviewCreated(true);
    } else {
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
            label={t("title")}
            sx={{ paddingTop: "5" }}
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
            label={t("content")}
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
            {t("submit")}
          </Button>
        </Grid>
      </form>
      {showAlert && (
        <NotificationToast
          toastText={t("already-reviewed")}
          isSuccessful={false}
        />
      )}
    </>
  );
}
