import { Box, Typography, Stack } from "@mui/material";
import type { Application } from "../../types";

interface ActivityTabProps {
  application: Application;
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const ActivityTab = ({ application }: ActivityTabProps) => {
  return (
    <Box sx={{ pt: 3 }}>
      <Stack spacing={2}>
        <Box>
          <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
            {formatDate(application.appliedAt)}
          </Typography>
          <Typography sx={{ fontSize: 14 }}>Application submitted</Typography>
        </Box>
        {application.nextStepDate && (
          <Box>
            <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
              {formatDate(application.nextStepDate)}
            </Typography>
            <Typography sx={{ fontSize: 14 }}>
              {application.nextStep}
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
};
