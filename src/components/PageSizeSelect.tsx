import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Constants } from "../constants/Constants";

interface PageSizeSelectProps {
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageSizeSelect({
  pageSize,
  setPageSize,
}: PageSizeSelectProps) {
  const pageSizes: number[] = Constants.PAGE_SIZES as number[];

  return (
    <Box sx={{ minWidth: 80 }}>
      <FormControl fullWidth variant="standard">
        <InputLabel id="page-size">Page size</InputLabel>
        <Select
          labelId="page-size"
          value={pageSize}
          label="Page size"
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {pageSizes.map((pageOption: number, index: number) => (
            <MenuItem key={index} value={pageOption}>
              {pageOption}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
