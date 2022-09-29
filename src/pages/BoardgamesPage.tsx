import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { AxiosRequestConfig } from "axios";

import useFetchData from "../hooks/useFetchData";
import BoardgameCard from "../components/BoardgameCard";

import { Constants } from "../constants/Constants";
import PaginationOutlined from "../components/PaginationOutlined";
import { NotificationToast } from "../components/NotificationToast";

export default function BoardgamesPage() {
  const { categoryId } = useParams();
  const { state } = useLocation();

  console.log(state?.isLoggedIn);

  const [pageIndex, setPageIndex] = useState<number>(
    Constants.DEFAULT_PAGE_INDEX
  );
  const [pageSize, setPageSize] = useState<number>(Constants.DEFAULT_PAGE_SIZE);
  const [sortOrder, setSortOrder] = useState<number>(
    Constants.DEFAULT_SORT_ORDER
  );

  const [boardgameRequestConfig, setBoardgameRequestConfig] =
    useState<AxiosRequestConfig>({});

  useEffect(() => {
    if (categoryId === undefined) {
      setBoardgameRequestConfig({
        url: `/boardgames?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        method: "GET",
      });
    } else {
      setBoardgameRequestConfig({
        url: `/categories/${categoryId}/boardgames?pageIndex=${pageIndex}&pageSize=${pageSize}&sortOrder=${sortOrder}`,
        method: "GET",
      });
    }
  }, [categoryId]);

  const [boardgames] = useFetchData(boardgameRequestConfig);

  return (
    <>
      <Grid
        container
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "center", sm: "normal" },
          justifyContent: { xs: "center", sm: "normal" },
        }}
        spacing={3}
        p={3}
      >
        {boardgames.data.map((boardgame: any, index: number) => (
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
        <PaginationOutlined pageCount={20} />
      </Grid>
      {state?.isLoggedIn === true && (
        <NotificationToast
          toastText="Succesfully logged in!"
          isSuccessful={true}
        />
      )}
    </>
  );
}
