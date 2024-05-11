import { useState, useEffect } from "react";

import { List, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import AdminAccountCard from "../components/account/AdminAccountCard";
import PaginationOutlined from "../components/common/PaginationOutlined";
import { Constants } from "../constants/Constants";
import { useAuthContext } from "../context/AuthContext";
import useFetchData from "../hooks/useFetchData";

export default function AdminAccountsPage() {
  const { t } = useTranslation();
  const { authToken } = useAuthContext();
  
  const [pageIndex, setPageIndex] = useState<number>(
    Constants.DEFAULT_PAGE_INDEX
  );
  const [pageSize, setPageSize] = useState<number>(Constants.DEFAULT_PAGE_SIZE);

  const [isAccountDeleted, setIsAccountDeleted] = useState<boolean>(false);

  const accountsRequestConfig = {
    url: `/accounts?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const [{ data: accountsData, loading, error }, refetchData] = useFetchData(
    accountsRequestConfig
  );

  useEffect(() => {
    if (isAccountDeleted === true) {
      setIsAccountDeleted(false);
      refetchData();
    }
  }, [isAccountDeleted]);

  return (
    <div>
      {accountsData.accounts && (
        <>
          <List>
            <Typography variant="h5" sx={{ mb: "3%", mt: "1%" }}>
              {t("accounts")}
            </Typography>
            {accountsData.accounts.map((account: any) => (
              <AdminAccountCard
                key={account.id}
                account={account}
                setIsAccountDeleted={setIsAccountDeleted}
              />
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
