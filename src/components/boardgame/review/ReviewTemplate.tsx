import React, { useState } from "react";
import { Card, Box, Grid, Typography } from "@mui/material";
import { AxiosRequestConfig } from "axios";

import ReviewCard from "./ReviewCard";
import useFetchData from "../../../hooks/useFetchData";
import { Constants } from "../../../constants/Constants";
import PaginationOutlined from "../../common/PaginationOutlined";
import { ReviewForm } from "./ReviewForm";
import EmptyTemplate from "../../common/EmptyTemplate";

interface ReviewTemplateProps {
  boardgameId: number;
}

export default function ReviewTemplate({ boardgameId }: ReviewTemplateProps) {
  const authToken: string | null = localStorage.getItem("token");

  const [pageIndex, setPageIndex] = useState<number>(
    Constants.DEFAULT_PAGE_INDEX
  );
  const [pageSize, setPageSize] = useState<number>(Constants.DEFAULT_PAGE_SIZE);

  const reviewRequestConfig: AxiosRequestConfig = {
    url: `/boardgames/${boardgameId}/reviews?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    method: "GET",
  };

  const {
    data: reviewData,
    loading,
    error,
  } = useFetchData(reviewRequestConfig);

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
        {authToken && <ReviewForm boardgameId={Number(boardgameId)} />}
        <Typography variant="h5" sx={{ textDecoration: "underline", mt: "5%" }}>
          What people say:
        </Typography>
        {reviewData.reviews ? (
          <>
            <Grid item>
              <Box
                sx={{ mt: { xs: "5%", md: "2%" }, mb: { xs: "5%", md: "3%" } }}
              >
                {reviewData.reviews.map((review: any) => (
                  <ReviewCard key={review.id} review={review} />
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
          <EmptyTemplate pageText="There are no reviews right now" />
        )}
      </Box>
    </Card>
  );
}
