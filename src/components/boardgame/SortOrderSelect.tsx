import {
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { ConstantsArrays } from "src/constants/Constants";
import { sortOrderDefiner } from "src/utils/Utilities";

interface PageSizeSelectProps {
  sortOrder: number;
  setSortOrder: React.Dispatch<React.SetStateAction<number>>;
}

export default function SortOrderSelect({
  sortOrder,
  setSortOrder,
}: PageSizeSelectProps) {
  const { t } = useTranslation();

  const handleChange = (event: SelectChangeEvent) => {
    setSortOrder(Number(event.target.value));
  };

  return (
    <div>
      <FormControl
        variant="standard"
        sx={{ m: { xs: "1%", md: "3%" }, minWidth: 120 }}
      >
        <InputLabel id="standard-label">{t("sort-by")}</InputLabel>
        <Select
          labelId="standard-label"
          value={String(sortOrder)}
          onChange={handleChange}
          label={t("sort-by")}
        >
          {ConstantsArrays.SORT_OPTIONS.map((sortNumber: number) => (
            <MenuItem key={sortNumber} value={sortNumber}>
              {sortOrderDefiner(sortNumber)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
