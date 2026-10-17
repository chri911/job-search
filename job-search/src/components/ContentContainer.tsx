import { Box } from "@mui/material";
import type { ReactNode } from "react";
import { CONTENT_MAX_WIDTH, pageGutter } from "../layout";

interface ContentContainerProps {
  children: ReactNode;
}

export function ContentContainer({ children }: ContentContainerProps) {
  return (
    <Box
      sx={{
        px: pageGutter,
        py: { xs: 2, md: 3 },
        maxWidth: CONTENT_MAX_WIDTH,
        mx: "auto",
        width: "100%",
      }}
    >
      {children}
    </Box>
  );
}
