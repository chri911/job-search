// src/components/form/FormLayout.tsx
import type { ReactNode } from "react";
import { Box } from "@mui/material";

export const FormGrid = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        gap: 2.5,
      }}
    >
      {children}
    </Box>
  );
};

export const FullWidth = ({ children }: { children: ReactNode }) => {
  return <Box sx={{ gridColumn: "1 / -1" }}>{children}</Box>;
};

export const FormActions = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        gridColumn: "1 / -1",
        position: "sticky",
        bottom: 0,
        bgcolor: "background.paper",
        pt: 1.5,
        pb: "max(16px, env(safe-area-inset-bottom))", // не прячется под «челкой» и полосой жестов
        display: "flex",
        justifyContent: "flex-end",
        "& > button": { width: { xs: "100%", sm: "auto" } },
      }}
    >
      {children}
    </Box>
  );
};
