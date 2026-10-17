import type { ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import { sectionGap } from "../layout";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  aside?: ReactNode;
}

export const PageHeader = ({ title, subtitle, aside }: PageHeaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 2,
        mb: sectionGap,
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            lineHeight: 1.2,
            mb: 0.5,
            fontSize: { xs: "1.75rem", sm: "2.125rem" },
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography sx={{ color: "text.secondary" }}>{subtitle}</Typography>
        )}
      </Box>
      {aside}
    </Box>
  );
};
