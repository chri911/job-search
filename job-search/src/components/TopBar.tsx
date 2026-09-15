import { Box } from "@mui/material";
import type { ReactNode } from "react";

interface TopBarProps {
  actions?: ReactNode;
}

export function TopBar({ actions }: TopBarProps) {
  return (
    <Box
      sx={{
        height: 64,
        px: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        borderBottom: "1px solid #EDEFF3",
      }}
    >
      {actions}
    </Box>
  );
}
