import React from "react";
import { Box, CircularProgress } from "@mui/material";

interface LoadingCircleProps {
  widthParam: string;
  heightParam?: string;
}

export function LoadingCircle({ widthParam, heightParam }: LoadingCircleProps) {
  return (
    <Box
      sx={{
        width: widthParam,
        height: heightParam,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
}
