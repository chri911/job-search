import { Box, Typography } from "@mui/material";
import { StatsCards } from "../components/StatsCards";
import { UpcomingInterviews } from "../components/UpcomingInterviews";

export const Overview = () => {
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
          Overview
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          Your job search at a glance.
        </Typography>
      </Box>

      <StatsCards />
      <UpcomingInterviews />
    </Box>
  );
};
