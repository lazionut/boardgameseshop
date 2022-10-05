import React, { useState } from "react";
import { Card, Box, Grid, Typography } from "@mui/material";
import { AxiosRequestConfig } from "axios";

import ReviewCard from "./ReviewCard";
import useFetchData from "../../../hooks/useFetchData";
import { Constants } from "../../../constants/Constants";
import PageSizeSelect from "../../common/PageSizeSelect";
import PaginationOutlined from "../../common/PaginationOutlined";
import { ReviewForm } from "./ReviewForm";
import { useParams } from "react-router-dom";

export default function ReviewTemplate() {
  const { boardgameId } = useParams();

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
    <>
      {reviewData.boardgames && (
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
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
            <ReviewForm />
            <Grid item mt="5%">
              <Typography variant="h5" sx={{ textDecoration: "underline" }}>
                What people say:
              </Typography>
              <Box
                sx={{ mt: { xs: "5%", md: "2%" }, mb: { xs: "5%", md: "3%" } }}
              >
                {reviewData.boardgames.map((review: any) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </Box>
            </Grid>
            <Grid
              container
              sx={{
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "center", sm: "normal" },
                justifyContent: { xs: "center" },
              }}
            >
              <Grid
                item
                sx={{ ml: "3%", mt: { xs: "5%", sm: "auto" }, mb: "1.5%" }}
              >
                <PaginationOutlined
                  pageCount={reviewData.pageCount}
                  pageIndex={pageIndex}
                  setPageIndex={setPageIndex}
                />
              </Grid>
              <Grid
                item
                sx={{ ml: "3%", mt: { xs: "5%", sm: "auto" }, mb: "1.5%" }}
              >
                <PageSizeSelect pageSize={pageSize} setPageSize={setPageSize} />
              </Grid>
            </Grid>
          </Box>
        </Card>
      )}
    </>
  );
}
