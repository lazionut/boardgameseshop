import { Theme, createTheme } from "@mui/material/styles";

import "@mui/material/styles/createPalette";
declare module "@mui/material/styles/createPalette" {
  interface CommonColors {
    customDirtyWhite: string;
    customCyan: string;
    customRedOrange: string;
  }
}

export const theme: Theme = createTheme({
  palette: {
    common: {
      customDirtyWhite: "#E8E4C9",
      customCyan: "#4ABDAC",
      customRedOrange: "#FC4A1A",
    },
  },
});
