import React, { useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { AxiosRequestConfig } from "axios";
import { useTranslation } from "react-i18next";

import useFetchData from "../hooks/useFetchData";
import { Constants } from "../constants/Constants";
import PaginationOutlined from "../components/common/PaginationOutlined";
import OrderHistoryCard from "../components/order/OrderHistoryCard";

export default function AdminOrdersHistoryPage() {
  const authToken: string | null = localStorage.getItem("token");
  const { t } = useTranslation();

  const [pageIndex, setPageIndex] = useState<number>(
    Constants.DEFAULT_PAGE_INDEX
  );
  const [pageSize, setPageSize] = useState<number>(Constants.DEFAULT_PAGE_SIZE);

  const ordersRequestConfig: AxiosRequestConfig = {
    url: `/orders?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const {
    data: ordersData,
    loading,
    error,
  } = useFetchData(ordersRequestConfig);

  return (
    <Container sx={{ mb: { xs: "5%", md: "auto" }, mt: "3%" }}>
      <Grid container display="flex" sx={{ flexDirection: "column" }}>
        <Typography variant="h5">{t("order-history")}</Typography>
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
      </Grid>
    </Container>
  );
}
