import { Chip } from "@mui/material";
import type { InterviewStatus } from "../../types";

interface InterviewStatusChipProps {
  status: InterviewStatus;
}

const statusConfig: Record<
  InterviewStatus,
  { label: string; bgcolor: string; color: string }
> = {
  scheduled: {
    label: "Scheduled",
    bgcolor: "info.light",
    color: "text.primary",
  },
  completed: {
    label: "Completed",
    bgcolor: "success.light",
    color: "text.primary",
  },
  cancelled: { label: "Cancelled", bgcolor: "grey.300", color: "text.primary" },
};

export const InterviewStatusChip = ({ status }: InterviewStatusChipProps) => {
  const config = statusConfig[status];

  return (
    <Chip
      size="small"
      label={config.label}
      sx={{ bgcolor: config.bgcolor, color: config.color, fontWeight: 500 }}
    />
  );
};
