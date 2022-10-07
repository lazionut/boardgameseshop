import React, { useState } from "react";
import {
  Stack,
  Autocomplete,
  TextField,
  IconButton,
  Box,
  InputAdornment,
} from "@mui/material";
import { AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import useFetchData from "../../hooks/useFetchData";
import sendDataService from "../../services/sendDataService";

export default function SearchBar() {
  const navigate = useNavigate();

  const [searchedCharacters, setSearchedCharacters] = useState<string>();

  const boardgameNamesRequestConfig: AxiosRequestConfig = {
    url: "/boardgames/names",
    method: "GET",
  };

  const {
    data: boardgamesNamesData,
    loading,
    error,
  } = useFetchData(boardgameNamesRequestConfig);

  return (
    <Box ml="5%" width="20%" flexDirection="row" sx={{ bgcolor: "white" }}>
      <Autocomplete
        freeSolo
        options={boardgamesNamesData.names}
        inputValue={searchedCharacters}
        onInputChange={(e, value) => {
          setSearchedCharacters(value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="end">
                  <FaSearch />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Box>
  );
}
