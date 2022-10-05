import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface PaginationOutlinedProps {
  pageCount: number;
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function PaginationOutlined({
  pageCount,
  pageIndex,
  setPageIndex,
}: PaginationOutlinedProps) {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageIndex(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={pageCount}
        page={pageIndex}
        onChange={handleChange}
        variant="outlined"
        showFirstButton
        showLastButton
      />
    </Stack>
  );
}
