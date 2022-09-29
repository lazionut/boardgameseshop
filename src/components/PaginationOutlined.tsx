import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface PaginationOutlinedProps {
  pageCount: number;
}

export default function PaginationOutlined({
  pageCount,
}: PaginationOutlinedProps) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={pageCount}
        variant="outlined"
        showFirstButton
        showLastButton
      />
    </Stack>
  );
}
