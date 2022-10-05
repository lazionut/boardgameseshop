import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ConstantsArrays } from "../../constants/Constants";

interface PageSizeSelectProps {
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageSizeSelect({
  pageSize,
  setPageSize,
}: PageSizeSelectProps) {
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
          {ConstantsArrays.PAGE_SIZES.map((pageOption: number) => (
            <MenuItem key={pageOption} value={pageOption}>
              {pageOption}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
