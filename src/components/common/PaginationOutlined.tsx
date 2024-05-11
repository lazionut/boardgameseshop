import {
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";

import { ConstantsArrays } from "../../constants/Constants";

interface PaginationOutlinedProps {
  pageCount: number;
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

export default function PaginationOutlined({
  pageCount,
  pageIndex,
  setPageIndex,
  pageSize,
  setPageSize,
}: PaginationOutlinedProps) {
  const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageIndex(value);
  };

  return (
    <Grid
      container
      sx={{
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "center", sm: "normal" },
        justifyContent: { xs: "center" },
      }}
    >
      <Grid item sx={{ ml: "3%", mt: { xs: "5%", sm: "auto" }, mb: "1.5%" }}>
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
      </Grid>
      <Grid item sx={{ ml: "3%", mt: { xs: "5%", sm: "auto" }, mb: "1.5%" }}>
        <Box sx={{ minWidth: 80 }}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="page-size">{t("page-size")}</InputLabel>
            <Select
              labelId="page-size"
              value={pageSize}
              label={t("page-size")}
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
      </Grid>
    </Grid>
  );
}
