import React, { useState } from "react";
import { List, Typography } from "@mui/material";

import useFetchData from "../hooks/useFetchData";
import { Constants } from "../constants/Constants";
import PaginationOutlined from "../components/common/PaginationOutlined";
import AdminAccountCard from "../components/account/AdminAccountCard";

export default function AdminAccountsPage() {
  const authToken: string | null = localStorage.getItem("token");

  const [pageIndex, setPageIndex] = useState<number>(
    Constants.DEFAULT_PAGE_INDEX
  );
  const [pageSize, setPageSize] = useState<number>(Constants.DEFAULT_PAGE_SIZE);

  const accountsRequestConfig = {
    url: `/accounts?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const {
    data: accountsData,
    loading,
    error,
  } = useFetchData(accountsRequestConfig);

  return (
    <div>
      {accountsData.accounts && (
        <>
          <List>
            <Typography variant="h5" sx={{ mb: "3%", mt: "1%" }}>
              Accounts
            </Typography>
            {accountsData.accounts.map((account: any) => (
              <AdminAccountCard key={account.id} account={account} />
            ))}
          </List>
          <PaginationOutlined
            pageCount={accountsData.pageCount}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </>
      )}
    </div>
  );
}
