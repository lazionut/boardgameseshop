import { useState, useEffect } from "react";

import { Button, Grid, Typography } from "@mui/material";
import { AxiosRequestConfig } from "axios";
import { useTranslation } from "react-i18next";
import { AiFillPlusSquare } from "react-icons/ai";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

import AdminBoardgameModal from "../components/boardgame/AdminBoardgameModal";
import BoardgameCard from "../components/boardgame/BoardgameCard";
import SortOrderSelect from "../components/boardgame/SortOrderSelect";
import EmptyTemplate from "../components/common/EmptyTemplate";
import NotificationToast from "../components/common/NotificationToast";import PaginationOutlined from "../components/common/PaginationOutlined";
import { Configs } from "../constants/Configs";
import { Constants, ConstantsArrays } from "../constants/Constants";
import { useAuthContext } from "../context/AuthContext";
import useFetchData from "../hooks/useFetchData";

export default function BoardgamesPage() {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const keywords: string | null = searchParams.get("keywords");
  const { state } = useLocation();
  const { accountDecoded } = useAuthContext();

  const { t } = useTranslation();

  const [pageIndex, setPageIndex] = useState<number>(
    Constants.DEFAULT_PAGE_INDEX
  );
  const [pageSize, setPageSize] = useState<number>(Constants.DEFAULT_PAGE_SIZE);
  const [sortOrder, setSortOrder] = useState<number>(
    ConstantsArrays.SORT_OPTIONS[0]
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isBoardgameDeleted, setIsBoardgameDeleted] = useState<boolean>(false);

  const boardgameRequestConfig: AxiosRequestConfig = {
    url: `/boardgames?pageIndex=${pageIndex}&pageSize=${pageSize}&sortOrder=${sortOrder}`,
    method: "GET",
  };

  if (categoryId !== undefined) {
    boardgameRequestConfig.url = `/boardgames/category/${categoryId}?pageIndex=${pageIndex}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
  } else if (keywords !== null) {
    boardgameRequestConfig.url = `/boardgames/search?keywords=${keywords}&pageIndex=${pageIndex}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
  }

  const [{ data: boardgamesData, loading, error }, refetchData] = useFetchData(
    boardgameRequestConfig
  );

  useEffect(() => {
    if (isBoardgameDeleted === true) {
      setIsBoardgameDeleted(false);
      refetchData();
    }
  }, [isBoardgameDeleted]);

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
                <BoardgameCard
                  boardgame={boardgame}
                  setIsBoardgameDeleted={setIsBoardgameDeleted}
                />
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
