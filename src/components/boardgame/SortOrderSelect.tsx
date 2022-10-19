import React from "react";
import {
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { sortOrderDefiner } from "../../utils/Utilities";
import { ConstantsArrays } from "../../constants/Constants";

interface PageSizeSelectProps {
  sortOrder: number;
  setSortOrder: React.Dispatch<React.SetStateAction<number>>;
}

export default function SortOrderSelect({
  sortOrder,
  setSortOrder,
}: PageSizeSelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    setSortOrder(Number(event.target.value));
  };

  return (
    <div>
      <FormControl
        variant="standard"
        sx={{ m: { xs: "1%", md: "3%" }, minWidth: 120 }}
      >
        <InputLabel id="standard-label">Sort by</InputLabel>
        <Select
          labelId="standard-label"
          value={String(sortOrder)}
          onChange={handleChange}
          label="Sort by"
        >
          {ConstantsArrays.SORT_OPTIONS.map(
            (sortNumber: number) => (
              <MenuItem key={sortNumber} value={sortNumber}>
                {sortOrderDefiner(sortNumber)}
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>
    </div>
  );
}
