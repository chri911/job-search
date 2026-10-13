import { Box, IconButton } from "@mui/material";
import type { ReactNode } from "react";
import MenuIcon from "@mui/icons-material/Menu";

interface TopBarProps {
  actions?: ReactNode;
  onMenuClick?: () => void;
}

export function TopBar({ actions, onMenuClick }: TopBarProps) {
  return (
    <Box
      component="header"
      sx={{
        height: 64,
        px: { xs: 2, md: 4 },
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #EDEFF3",
        flexShrink: 0,
      }}
    >
      <IconButton
        edge="start"
        onClick={onMenuClick}
        aria-label="Open navigation"
        sx={{ display: { xs: "inline-flex", lg: "none" } }}
      >
        <MenuIcon />
      </IconButton>
      <Box sx={{ ml: "auto" }}>{actions}</Box>
    </Box>
  );
}
