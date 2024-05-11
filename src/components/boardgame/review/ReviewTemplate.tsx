import { useEffect, useState } from "react";

import { Card, Box, Grid, Typography } from "@mui/material";
import { AxiosRequestConfig } from "axios";
import { useTranslation } from "react-i18next";

import ReviewCard from "./ReviewCard";
import { ReviewForm } from "./ReviewForm";
import { Constants } from "../../../constants/Constants";
import { useAuthContext } from "../../../context/AuthContext";
import useFetchData from "../../../hooks/useFetchData";
import EmptyTemplate from "../../common/EmptyTemplate";
import PaginationOutlined from "../../common/PaginationOutlined";

interface ReviewTemplateProps {
  boardgameId: number;
}

export default function ReviewTemplate({ boardgameId }: ReviewTemplateProps) {
  const { authToken } = useAuthContext();
  const { t } = useTranslation();

  const [pageIndex, setPageIndex] = useState<number>(
    Constants.DEFAULT_PAGE_INDEX
  );
  const [pageSize, setPageSize] = useState<number>(Constants.DEFAULT_PAGE_SIZE);
  const [isReviewCreated, setIsReviewCreated] = useState<boolean>(false);
  const [isReviewDeleted, setIsReviewDeleted] = useState<boolean>(false);

  const reviewRequestConfig: AxiosRequestConfig = {
    url: `/boardgames/${boardgameId}/reviews?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    method: "GET",
  };

  const [{ data: reviewData, loading, error }, refetch] =
    useFetchData(reviewRequestConfig);

  useEffect(() => {
    if (isReviewCreated === true) {
      setIsReviewCreated(false);
      refetch();
    }
  }, [isReviewCreated]);

  useEffect(() => {
    if (isReviewDeleted === true) {
      setIsReviewDeleted(false);
      refetch();
    }
  }, [isReviewDeleted]);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        mt: "5%",
        bgcolor: "common.customDirtyWhite",
      }}
    >
      <Box
        sx={{
          width: { xs: "80%", md: "90%" },
          height: { xs: "50%", md: "80%" },
          alignSelf: { xs: "center" },
          ml: { md: "5%" },
        }}
      >
        {authToken && (
          <ReviewForm
            boardgameId={Number(boardgameId)}
            setIsReviewCreated={setIsReviewCreated}
          />
        )}
        <Typography variant="h5" sx={{ textDecoration: "underline", mt: "5%" }}>
          {t("what-people-say")}:
        </Typography>
        {reviewData.reviews ? (
          <>
            <Grid item>
              <Box
                sx={{ mt: { xs: "5%", md: "2%" }, mb: { xs: "5%", md: "3%" } }}
              >
                {reviewData.reviews.map((review: any) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    setIsReviewDeleted={setIsReviewDeleted}
                  />
                ))}
              </Box>
            </Grid>
            <PaginationOutlined
              pageCount={reviewData.pageCount}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
              pageSize={pageSize}
              setPageSize={setPageSize}
            />
          </>
        ) : (
          <EmptyTemplate pageText={t("no-reviews")} />
        )}
      </Box>
    </Card>
  );
}
