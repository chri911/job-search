import { Box } from "@mui/material";
import type { ReactNode } from "react";

interface ContentContainerProps {
  children: ReactNode;
}

export function ContentContainer({ children }: ContentContainerProps) {
  return (
    <Box
      sx={{
        px: 4,
        py: 3,
        maxWidth: 1200,
        mx: "auto",
        width: "100%",
      }}
    >
      {children}
    </Box>
  );
}
