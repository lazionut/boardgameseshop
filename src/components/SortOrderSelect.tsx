import React from "react";
import {
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { sortOrderDefiner } from "../utils/Utilities";

interface PageSizeSelectProps {
  sortOrder: number;
  setSortOrder: React.Dispatch<React.SetStateAction<number>>;
}

export default function SortOrderSelect({
  sortOrder,
  setSortOrder,
}: PageSizeSelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    console.log("Handle change is: " + event.target.value);
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
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {[0, 1, 2, 3, 4].map((sortNumber: number, index: number) => (
            <MenuItem key={index} value={sortNumber}>
              {sortOrderDefiner(sortNumber)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
