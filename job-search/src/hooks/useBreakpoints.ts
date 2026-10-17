import { useMediaQuery, useTheme } from "@mui/material";

export const useBreakpoints = () => {
  const theme = useTheme();
  return {
    isPhone: useMediaQuery(theme.breakpoints.down("sm")),
    isCompact: useMediaQuery(theme.breakpoints.down("md")),
    isDesktop: useMediaQuery(theme.breakpoints.up("lg")),
  };
};
