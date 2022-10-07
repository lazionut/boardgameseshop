import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { AxiosRequestConfig } from "axios";

import useFetchData from "../hooks/useFetchData";
import BoardgameCard from "../components/boardgame/BoardgameCard";
import { Constants, ConstantsArrays } from "../constants/Constants";
import PaginationOutlined from "../components/common/PaginationOutlined";
import { NotificationToast } from "../components/common/NotificationToast";
import EmptyTemplate from "../components/common/EmptyTemplate";
import SortOrderSelect from "../components/boardgame/SortOrderSelect";

export default function BoardgamesPage() {
  const { categoryId } = useParams();
  const { state } = useLocation();

  const [pageIndex, setPageIndex] = useState<number>(
    Constants.DEFAULT_PAGE_INDEX
  );
  const [pageSize, setPageSize] = useState<number>(Constants.DEFAULT_PAGE_SIZE);
  const [sortOrder, setSortOrder] = useState<number>(
    ConstantsArrays.SORT_OPTIONS[0]
  );

  let boardgameRequestConfig: AxiosRequestConfig = {
    url: `/boardgames?pageIndex=${pageIndex}&pageSize=${pageSize}&sortOrder=${sortOrder}`,
    method: "GET",
  };

  if (categoryId !== undefined) {
    boardgameRequestConfig = {
      url: `/boardgames/category/${categoryId}?pageIndex=${pageIndex}&pageSize=${pageSize}&sortOrder=${sortOrder}`,
      method: "GET",
    };
  }

  const {
    data: boardgamesData,
    loading,
    error,
  } = useFetchData(boardgameRequestConfig);

  console.log("The mighty error is: " + error);

  return (
    <>
      {boardgamesData.boardgames && error?.status != 404 ? (
        <div>
          <Grid
            container
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "right" },
              justifyContent: { xs: "right" },
            }}
          >
            <Grid
              item
              sx={{
                mr: "3%",
                mt: { xs: "2%", sm: "auto" },
                mb: { xs: "5%", sm: "auto" },
              }}
            >
              <SortOrderSelect
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "center", sm: "normal" },
              justifyContent: "center",
            }}
            spacing={"3%"}
            p={"2%"}
          >
            {boardgamesData.boardgames.map((boardgame: any) => (
              <Grid item key={boardgame.id} xs={9} sm={6} md={3}>
                <BoardgameCard boardgame={boardgame} />
              </Grid>
            ))}
          </Grid>
          <PaginationOutlined
            pageCount={boardgamesData.pageCount}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </div>
      ) : (
        <EmptyTemplate />
      )}
      {state?.isLoggedIn === true && (
        <NotificationToast
          toastText="Succesfully logged in"
          isSuccessful={true}
        />
      )}
    </>
  );
}
