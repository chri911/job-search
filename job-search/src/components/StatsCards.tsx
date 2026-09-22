import { Alert, Box, Grid, Paper, Skeleton, Typography } from "@mui/material";
import { useDashboardStats } from "../hooks/useDashboardStats";
import type { DashboardStats } from "../types";

interface StatsCardProps {
  label: string;
  value: string | number;
  hintValue?: string;
  hintLabel?: string;
}

const StatsCard = ({ label, value, hintValue, hintLabel }: StatsCardProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <Typography sx={{ color: "text.secondary", fontSize: 14, mb: 1 }}>
        {label}
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
        {value}
      </Typography>
      {(hintValue || hintLabel) && (
        <Typography sx={{ fontSize: 13, color: "text.primary" }}>
          {hintValue && (
            <Box
              component="span"
              sx={{ color: "success.main", fontWeight: 600 }}
            >
              {hintValue}{" "}
            </Box>
          )}
          {hintLabel}
        </Typography>
      )}
    </Paper>
  );
};

function StatCardSkeleton() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <Skeleton variant="text" width="60%" height={20} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="40%" height={40} sx={{ mb: 0.5 }} />
      <Skeleton variant="text" width="50%" height={18} />
    </Paper>
  );
}

const buildCards = (stats: DashboardStats | undefined): StatsCardProps[] => {
  return [
    {
      label: "Active",
      value: stats?.active ?? 0,
      hintValue: stats?.addedThisWeek ? `+${stats.addedThisWeek}` : undefined,
      hintLabel: stats?.addedThisWeek ? "this week" : undefined,
    },
    {
      label: "Interviews",
      value: stats?.interviews ?? 0,
      hintLabel: stats?.interviewsScheduledNext
        ? `${stats.interviewsScheduledNext} scheduled next`
        : undefined,
    },
    {
      label: "Response rate",
      value: `${stats?.responseRate ?? 0}%`,
      hintValue: stats?.responseRateDelta
        ? `${stats.responseRateDelta > 0 ? "+" : ""}${stats.responseRateDelta}%`
        : undefined,
      hintLabel: "this month",
    },
    {
      label: "Offers",
      value: stats?.offers ?? 0,
      hintLabel: stats?.offersAwaitingReply
        ? `${stats.offersAwaitingReply} awaiting reply`
        : undefined,
    },
  ];
};

export const StatsCards = () => {
  const { data: stats, isLoading, isError, error } = useDashboardStats();

  if (isError) {
    return (
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={12}>
          <Alert
            severity="error"
            sx={{ minHeight: 96, display: "flex", alignItems: "center" }}
          >
            Failed to load stats
            {error instanceof Error ? `: ${error.message}` : ""}
          </Alert>
        </Grid>
      </Grid>
    );
  }
  const cards = buildCards(stats);

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {cards.map((card, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
          {isLoading ? <StatCardSkeleton /> : <StatsCard {...card} />}
        </Grid>
      ))}
    </Grid>
  );
};
