import { Theme, createTheme } from "@mui/material/styles";
import "@mui/material/styles/createPalette";

document.body.style.background = "#E8E4C9";

declare module "@mui/material/styles/createPalette" {
  interface CommonColors {
    customDirtyWhite: string;
    customDarkTurqoise: string;
    customLightYellow: string;
    customCavernClay: string;
    customRedOrange: string;
  }
}

export const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#aa7255",
    },
    secondary: {
      main: "#f7f1cf",
    },
    common: {
      customDirtyWhite: "#E8E4C9",
      customDarkTurqoise: "#AFEEEE",
      customLightYellow: "#f7f1cf",
      customCavernClay: "#aa7255",
      customRedOrange: "#FC4A1A",
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          "*": {
            "scrollbar-width": "thin",
          },
          scrollbarColor: "#778899 #f7f1cf",
        },
      },
    },
  },
});
