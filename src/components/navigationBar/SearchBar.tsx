import { useState } from "react";

import { Autocomplete, TextField, Box, InputAdornment, AutocompleteRenderInputParams } from "@mui/material";
import { AxiosRequestConfig } from "axios";
import { FaSearch } from "react-icons/fa";

import { Constants, ConstantsArrays } from "../../constants/Constants";
import useFetchData from "../../hooks/useFetchData";
import useNavigateSearch from "../../hooks/useNavigateSearch";

export default function SearchBar() {
  const navigateSearch = useNavigateSearch();

  const [searchedCharacters, setSearchedCharacters] = useState<string>();

  const boardgameNamesRequestConfig: AxiosRequestConfig = {
    url: "/boardgames/names",
    method: "GET",
  };

  const [{ data: boardgamesNamesData, loading, error }] = useFetchData(
    boardgameNamesRequestConfig
  );

  return (
    <Box
      ml="5%"
      width="20%"
      flexDirection="row"
      sx={{
        color: "common.customCavernClay",
      }}
    >
      <Autocomplete
        freeSolo
        options={boardgamesNamesData.names || [""]}
        value={searchedCharacters}
        onInputChange={(e, value) => {
          setSearchedCharacters(value);
        }}
        renderInput={(params: AutocompleteRenderInputParams) => (
          <Box sx={{ bgcolor: "common.customLightYellow" }}>
            <TextField
              {...params}
              size="medium"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigateSearch(`/boardgames/search`, {
                    keywords: searchedCharacters,
                    pageIndex: Constants.DEFAULT_PAGE_INDEX,
                    pageSize: Constants.DEFAULT_PAGE_SIZE,
                    sortOrder: ConstantsArrays.SORT_OPTIONS[0],
                  });
                }
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <FaSearch />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        )}
      />
    </Box>
  );
}
