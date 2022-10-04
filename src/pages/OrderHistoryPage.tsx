import React, { useState } from "react";
import {
  Box,
  Chip,
  CardActions,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Card } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { AxiosRequestConfig } from "axios";

import useFetchData from "../hooks/useFetchData";
import { Constants } from "../constants/Constants";
import { orderStatusDefiner } from "../utils/Utilities";

export default function OrderHistoryPage() {
  const navigate = useNavigate();
  const authToken: string | null = localStorage.getItem("token");

  const [pageIndex, setPageIndex] = useState<number>(
    Number(Constants.DEFAULT_PAGE_INDEX)
  );
  const [pageSize, setPageSize] = useState<number>(
    Number(Constants.DEFAULT_PAGE_SIZE)
  );
  const [sortOrder, setSortOrder] = useState<number>(
    Number(Constants.DEFAULT_SORT_ORDER)
  );

  const ordersRequestConfig: AxiosRequestConfig = {
    url: `/accounts/orders?pageIndex=${pageIndex}&pageSize=${pageSize}&sortOrder=${sortOrder}`,
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
        <Typography variant="h5">Order history</Typography>
        {ordersData.boardgames &&
          ordersData.boardgames.map((order: any, index: number) => (
            <Grid item key={index} mt="2%" mb="2%">
              <Card
                variant="outlined"
                sx={{
                  gap: "clamp(0px, (100% - 360px + 32px) * 999, 16px)",
                  transition: "transform 0.3s, border 0.3s",
                  "&:hover": {
                    borderColor: "primary",
                    transform: "translateY(-2px)",
                  },
                  "& > *": {
                    minWidth: "clamp(0px, (360px - 100%) * 999,100%)",
                  },
                  cursor: "pointer",
                }}
                onClick={() =>
                  navigate(`/orders/${order.id}`, {
                    state: {
                      order,
                    },
                  })
                }
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                >
                  <Typography variant="h6">Order #{order.id}</Typography>
                  <Typography>Ordered at: {order.creationDate}</Typography>
                  <Box
                    sx={{
                      marginLeft: "auto",
                    }}
                  >
                    <Chip variant="outlined" label={`Total: ${order.total}`} />
                  </Box>
                </Box>
                <CardActions
                  sx={{
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      marginLeft: "auto",
                    }}
                  >
                    <Chip
                      variant="outlined"
                      color="primary"
                      label={orderStatusDefiner(order.status)}
                    />
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
