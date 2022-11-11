import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { AxiosRequestConfig } from "axios";
import jwt_decode from "jwt-decode";
import { AiFillPlusSquare } from "react-icons/ai";
import { useTranslation } from "react-i18next";

import useFetchData from "../hooks/useFetchData";
import BoardgameCard from "../components/boardgame/BoardgameCard";
import { Constants, ConstantsArrays } from "../constants/Constants";
import PaginationOutlined from "../components/common/PaginationOutlined";
import { NotificationToast } from "../components/common/NotificationToast";
import EmptyTemplate from "../components/common/EmptyTemplate";
import SortOrderSelect from "../components/boardgame/SortOrderSelect";
import AdminBoardgameModal from "../components/boardgame/AdminBoardgameModal";
import { Configs } from "../constants/Configs";

export default function BoardgamesPage() {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const keywords: string | null = searchParams.get("keywords");
  const { state } = useLocation();
  const authToken: string | null = localStorage.getItem("token");
  let accountDecoded: { [key: string]: any } | null = null;
  if (authToken !== null) {
    accountDecoded = jwt_decode(authToken);
  }
  const { t } = useTranslation();

  const [pageIndex, setPageIndex] = useState<number>(
    Constants.DEFAULT_PAGE_INDEX
  );
  const [pageSize, setPageSize] = useState<number>(Constants.DEFAULT_PAGE_SIZE);
  const [sortOrder, setSortOrder] = useState<number>(
    ConstantsArrays.SORT_OPTIONS[0]
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  let boardgameRequestConfig: AxiosRequestConfig = {
    url: `/boardgames?pageIndex=${pageIndex}&pageSize=${pageSize}&sortOrder=${sortOrder}`,
    method: "GET",
  };

  if (categoryId !== undefined) {
    boardgameRequestConfig = {
      url: `/boardgames/category/${categoryId}?pageIndex=${pageIndex}&pageSize=${pageSize}&sortOrder=${sortOrder}`,
      method: "GET",
    };
  } else if (keywords !== null) {
    boardgameRequestConfig = {
      url: `/boardgames/search?keywords=${keywords}&pageIndex=${pageIndex}&pageSize=${pageSize}&sortOrder=${sortOrder}`,
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
      {boardgamesData.boardgames && error?.status != Configs.OK_RESPONSE ? (
        <div>
          <Grid
            container
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
            }}
          >
            {accountDecoded?.Role === Constants.ADMIN && (
              <Grid
                item
                sx={{
                  ml: "2%",
                  mt: { xs: "2%", sm: "auto" },
                  mb: { xs: "5%", sm: "auto" },
                }}
              >
                <Button variant="contained" onClick={() => setIsOpen(true)}>
                  <AiFillPlusSquare size={30} />
                  <Typography sx={{ ml: 1.5 }}>{t("add-boardgame")}</Typography>
                </Button>
              </Grid>
            )}
            <Grid
              item
              sx={{
                mr: "3%",
                mt: { xs: "2%", sm: "auto" },
                mb: { xs: "5%", sm: "auto" },
                marginLeft: "auto",
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
              alignItems: { xs: "center", sm: "stretch" },
              justifyContent: "center",
            }}
            spacing={"3%"}
            p={"2%"}
          >
            {boardgamesData.boardgames.map((boardgame: any) => (
              <Grid
                item
                key={boardgame.id}
                xs={9}
                sm={6}
                md={3}
                sx={{ display: "flex" }}
              >
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
        <EmptyTemplate pageText={t("no-boardgames")} />
      )}
      <AdminBoardgameModal isOpen={isOpen} setIsOpen={setIsOpen} />
      {state?.isLoggedIn === true && (
        <NotificationToast
          toastText={t("successfully-logged-in")}
          isSuccessful={true}
        />
      )}
      {state?.isLoggedOut === true && (
        <NotificationToast
          toastText={t("successfully-logged-out")}
          isSuccessful={true}
        />
      )}
      {state?.isSuccessfullyCreated === true && (
        <NotificationToast
          toastText={t("boardgame-succesfully-created")}
          isSuccessful={true}
        />
      )}
      {state?.isSuccessfullyEdited === true && (
        <NotificationToast
          toastText={t("boardgame-succesfully-edited")}
          isSuccessful={true}
        />
      )}
      {state?.isSuccessfullyDeleted === true && (
        <NotificationToast
          toastText={t("boardgame-succesfully-deleted")}
          isSuccessful={true}
        />
      )}
    </>
  );
}
