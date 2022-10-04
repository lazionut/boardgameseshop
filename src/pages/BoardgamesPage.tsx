import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { AxiosRequestConfig } from "axios";

import useFetchData from "../hooks/useFetchData";
import BoardgameCard from "../components/boardgame/BoardgameCard";
import { Constants } from "../constants/Constants";
import PaginationOutlined from "../components/PaginationOutlined";
import { NotificationToast } from "../components/NotificationToast";
import PageSizeSelect from "../components/PageSizeSelect";
import EmptyTemplate from "../components/EmptyTemplate";
import SortOrderSelect from "../components/SortOrderSelect";

export default function BoardgamesPage() {
  const { categoryId } = useParams();
  const { state } = useLocation();

  const [pageIndex, setPageIndex] = useState<number>(
    Number(Constants.DEFAULT_PAGE_INDEX)
  );
  const [pageSize, setPageSize] = useState<number>(
    Number(Constants.DEFAULT_PAGE_SIZE)
  );
  const [sortOrder, setSortOrder] = useState<number>(
    Number(Constants.DEFAULT_SORT_ORDER)
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

  return (
    <>
      {boardgamesData.boardgames ? (
        <div>
          <Grid
            container
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "right" },
              justifyContent: { xs: "right" },
            }}
          >
            <Grid item sx={{ mr: 3, mt: { xs: 2, sm: "auto" } }}>
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
            spacing={3}
            p={3}
          >
            {boardgamesData.boardgames.map((boardgame: any, index: number) => (
              <Grid item xs={9} sm={6} md={3} key={index}>
                <BoardgameCard
                  id={boardgame.id}
                  image={boardgame.image}
                  name={boardgame.name}
                  price={boardgame.price}
                  quantity={boardgame.quantity}
                />
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "center", sm: "normal" },
              justifyContent: { xs: "center" },
            }}
          >
            <Grid item>
              <PaginationOutlined
                pageCount={boardgamesData.pageCount}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
              />
            </Grid>
            <Grid item sx={{ ml: 3, mt: { xs: 2, sm: "auto" } }}>
              <PageSizeSelect pageSize={pageSize} setPageSize={setPageSize} />
            </Grid>
          </Grid>
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
