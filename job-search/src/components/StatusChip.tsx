import { Chip } from "@mui/material";
import type { ApplicationStatus } from "../types";

interface StatusChipProps {
  status: ApplicationStatus;
}

const statusConfig: Record<
  ApplicationStatus,
  { label: string; color: string }
> = {
  applied: { label: "Applied", color: "info.main" },
  interview: { label: "Interview", color: "interview.main" },
  offer: { label: "Offer", color: "success.main" },
  rejected: { label: "Rejected", color: "error.main" },
};

export const StatusChip = ({ status }: StatusChipProps) => {
  const config = statusConfig[status];
  return (
    <Chip
      size="small"
      label={config.label}
      sx={{
        bgcolor: "grey.200",
        color: "text.primary",
        fontWeight: 500,
        borderRadius: 1.5,
        minWidth: 90,
        justifyContent: "flex-start",
        "& .MuiChip-label": { px: 0 },
        "&::before": {
          content: '""',
          display: "inline-block",
          width: 6,
          height: 6,
          borderRadius: "50%",
          bgcolor: config.color,
          mr: 0.75,
          ml: 1,
        },
      }}
    />
  );
};
