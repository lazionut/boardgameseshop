import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { ORDER_STATUS_OPTIONS } from "../../constants/Constants";
import sendDataService from "../../services/sendDataService";
import { Configs } from "../../constants/Configs";

interface OrderDialogProps {
  id: number;
  currentOrderStatus: number;
}

export default function OrderDialog({
  id,
  currentOrderStatus,
}: OrderDialogProps) {
  const authToken: string | null = localStorage.getItem("token");

  const [orderStatus, setOrderStatus] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleStatusSubmit = async (orderStatusValue: number) => {
    const changeOrderStatusResponse = await sendDataService.execute({
      url: `/orders/${id}/change-status?orderStatus=${orderStatusValue}`,
      method: "patch",
      data: "",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (changeOrderStatusResponse.status === Configs.NO_CONTENT_RESPONSE) {
      window.location.reload();
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setIsOpen(true)}>
        Change status
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Select order status</DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <FormControl sx={{ mt: "10%", width: 160 }}>
              <InputLabel>Status</InputLabel>
              <Select
                autoFocus
                label="Status"
                defaultValue={currentOrderStatus}
                onChange={(e) => setOrderStatus(Number(e.target.value))}
              >
                {ORDER_STATUS_OPTIONS.map((order: any) => (
                  <MenuItem
                    key={order.value}
                    value={order.value}
                    onChange={() => setOrderStatus(order.value)}
                  >
                    {order.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
          <Button onClick={() => handleStatusSubmit(orderStatus)}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
