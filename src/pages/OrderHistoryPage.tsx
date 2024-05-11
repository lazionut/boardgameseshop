import { useState } from "react";

import { Container, Grid, Typography } from "@mui/material";
import { AxiosRequestConfig } from "axios";
import { useTranslation } from "react-i18next";

import EmptyTemplate from "../components/common/EmptyTemplate";
import PaginationOutlined from "../components/common/PaginationOutlined";
import OrderHistoryCard from "../components/order/OrderHistoryCard";
import { Constants } from "../constants/Constants";
import { useAuthContext } from "../context/AuthContext";
import useFetchData from "../hooks/useFetchData";

export default function OrderHistoryPage() {
  const { authToken } = useAuthContext();
  const { t } = useTranslation();

  const [pageIndex, setPageIndex] = useState<number>(
    Constants.DEFAULT_PAGE_INDEX
  );
  const [pageSize, setPageSize] = useState<number>(Constants.DEFAULT_PAGE_SIZE);

  const ordersRequestConfig: AxiosRequestConfig = {
    url: `/accounts/orders?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const [{ data: ordersData, loading, error }] =
    useFetchData(ordersRequestConfig);

  return (
    <Container sx={{ mb: { xs: "5%", md: "auto" }, mt: "3%" }}>
      <Grid container display="flex" sx={{ flexDirection: "column" }}>
        <Typography variant="h5">{t("order-history")}</Typography>
        {ordersData.orders && ordersData.orders.length > 0 ? (
          <>
            {ordersData.orders &&
              ordersData.orders.map((order: any) => (
                <OrderHistoryCard key={order.id} order={order} />
              ))}
            <PaginationOutlined
              pageCount={ordersData.pageCount}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
              pageSize={pageSize}
              setPageSize={setPageSize}
            />
          </>
        ) : (
          <EmptyTemplate pageText={t("no-orders")} />
        )}
      </Grid>
    </Container>
  );
}
