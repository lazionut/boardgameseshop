import { Box, Card, Grid, IconButton, Typography } from "@mui/material";
import { GiMeeple } from "react-icons/gi";
import { MdDelete } from "react-icons/md";

import { StyledRating } from "src/components/boardgame/review/RatingOptions";
import { Configs } from "src/constants/Configs";
import { Constants } from "src/constants/Constants";
import { useAuthContext } from "src/context/AuthContext";
import sendDataService from "src/services/sendDataService";


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
  setIsReviewDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ReviewCard({
  review,
  setIsReviewDeleted,
}: ReviewCardProps) {
  const { accountDecoded } = useAuthContext();

  const handleReviewDelete = async (id: number) => {
    const deleteReviewResponse = await sendDataService.execute({
      url: `/reviews/${id}`,
      method: "delete",
    });

    if (deleteReviewResponse.status === Configs.OK_RESPONSE) {
      setIsReviewDeleted(true);
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
