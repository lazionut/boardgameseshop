import React, { useState } from "react";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import useFetchData from "../hooks/useFetchData";
import { Constants } from "../constants/Constants";
import PaginationOutlined from "../components/common/PaginationOutlined";
import { Configs } from "../constants/Configs";
import sendDataService from "../services/sendDataService";

export default function AdminAccountsPage() {
  const authToken: string | null = localStorage.getItem("token");
  const navigate = useNavigate();

  const [pageIndex, setPageIndex] = useState<number>(
    Constants.DEFAULT_PAGE_INDEX
  );
  const [pageSize, setPageSize] = useState<number>(Constants.DEFAULT_PAGE_SIZE);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  const handleDeleteAccount = async (id: number) => {
    const deleteAccountResponse = await sendDataService.execute({
      url: `/accounts/${id}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (deleteAccountResponse.status === Configs.OK_RESPONSE) {
      window.location.reload();
    }
  };

  return (
    <div>
      {accountsData.accounts && (
        <>
          <List>
            <Typography variant="h5" sx={{ mb: "3%", mt: "1%" }}>
              Accounts
            </Typography>
            {accountsData.accounts.map((account: any) => (
              <Grid key={account.id} container justifyContent="center" mb="1%">
                <Card sx={{ width: "70%", bgcolor: "common.customDirtyWhite" }}>
                  <Grid
                    item
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <ListItem>
                      {account.firstName + " " + account.lastName}
                    </ListItem>
                    <ListItem>{account.email}</ListItem>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteAccount(account.id)}
                    >
                      Delete account
                    </Button>
                  </Grid>
                </Card>
              </Grid>
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
