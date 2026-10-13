import { Box } from "@mui/material";
import type { ReactNode } from "react";

interface ContentContainerProps {
  children: ReactNode;
}

export function ContentContainer({ children }: ContentContainerProps) {
  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2, md: 3 },
        maxWidth: 1200,
        mx: "auto",
        width: "100%",
      }}
    >
      {children}
    </Box>
  );
}
