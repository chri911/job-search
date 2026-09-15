import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    interview: Palette["primary"];
    accent: Palette["primary"];
  }
  interface PaletteOptions {
    interview?: PaletteOptions["primary"];
    accent?: PaletteOptions["primary"];
  }
}
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    accent: true;
  }
}
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#171B26",
    },
    secondary: {
      main: "#7CE0B8",
    },
    accent: {
      main: "#2563EB",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#E8EBF0",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#171B26",
      secondary: "#6B7280",
    },
    success: {
      main: "#22C55E", // Offer
    },
    error: {
      main: "#EF4444", // Rejected
    },
    info: {
      main: "#3B82F6", // Applied
    },
    interview: {
      main: "#8B5CF6",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});
