import { Box, IconButton } from "@mui/material";
import type { ReactNode } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { CONTENT_MAX_WIDTH, pageGutter, TOPBAR_HEIGHT } from "../layout";

interface TopBarProps {
  actions?: ReactNode;
  onMenuClick?: () => void;
}

export function TopBar({ actions, onMenuClick }: TopBarProps) {
  return (
    <Box
      component="header"
      sx={{
        height: TOPBAR_HEIGHT,
        borderBottom: "1px solid #EDEFF3",
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
          maxWidth: CONTENT_MAX_WIDTH,
          flexDirection: "row",
          mx: "auto",
          px: pageGutter,
          display: "flex",
          alignItems: "center",
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
        <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
          {actions}
        </Box>
      </Box>
    </Box>
  );
}
