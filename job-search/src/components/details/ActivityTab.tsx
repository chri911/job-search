import { Box, Typography, Stack, Skeleton, Alert } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import type { Application, TimelineEvent } from "../../types";
import { useApplicationInterviews } from "../../hooks/useApplicationInterview";

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

const typeLabels: Record<string, string> = {
  phone: "Phone screen",
  technical: "Technical interview",
  onsite: "Onsite interview",
  final: "Final round",
};

const iconMap: Record<TimelineEvent["icon"], React.ReactNode> = {
  created: <DescriptionOutlinedIcon fontSize="small" />,
  status: <TrendingUpIcon fontSize="small" />,
  interview: <EventOutlinedIcon fontSize="small" />,
};

export const ActivityTab = ({ application }: ActivityTabProps) => {
  const {
    data: interviews,
    isLoading,
    isError,
  } = useApplicationInterviews(application.id);

  if (isError) {
    return (
      <Box sx={{ pt: 3 }}>
        <Alert severity="error">Failed to load activity</Alert>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ pt: 3 }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} variant="text" height={50} />
        ))}
      </Box>
    );
  }

  const events: TimelineEvent[] = [
    {
      id: "created",
      date: application.appliedAt,
      title: "Application submitted",
      description: `${application.position} at ${application.company}`,
      icon: "created",
    },
    ...(interviews ?? []).map((interview) => ({
      id: interview.id,
      date: interview.scheduledAt,
      title: `${typeLabels[interview.type] ?? interview.type} ${interview.status === "completed" ? "completed" : "scheduled"}`,
      description: interview.interviewerName
        ? `with ${interview.interviewerName}`
        : undefined,
      icon: "interview" as const,
    })),
  ];

  if (application.nextStep && application.nextStepDate) {
    events.push({
      id: "next-step",
      date: application.nextStepDate,
      title: application.nextStep,
      icon: "status",
    });
  }

  events.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <Box sx={{ pt: 3 }}>
      <Stack spacing={0}>
        {events.map((event, index) => (
          <Stack key={event.id} direction="row" spacing={2}>
            <Stack sx={{ pt: 0.5, alignItems: "center" }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  bgcolor: "grey.100",
                  color: "text.secondary",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {iconMap[event.icon]}
              </Box>
              {index < events.length - 1 && (
                <Box
                  sx={{
                    width: "1px",
                    flex: 1,
                    bgcolor: "divider",
                    minHeight: 24,
                  }}
                />
              )}
            </Stack>

            <Box sx={{ pb: 3 }}>
              <Typography
                sx={{ fontSize: 13, color: "text.secondary", mb: 0.25 }}
              >
                {formatDate(event.date)}
              </Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                {event.title}
              </Typography>
              {event.description && (
                <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                  {event.description}
                </Typography>
              )}
            </Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};
