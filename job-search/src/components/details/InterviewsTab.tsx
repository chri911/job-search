import {
  Box,
  Typography,
  List,
  ListItem,
  Chip,
  Skeleton,
  Alert,
  Stack,
} from "@mui/material";
import type { Interview } from "../../types";
import { useApplicationInterviews } from "../../hooks/useApplicationInterview";

interface InterviewsTabProps {
  applicationId: string;
}

const typeLabels: Record<Interview["type"], string> = {
  phone: "Phone screen",
  technical: "Technical",
  onsite: "Onsite",
  final: "Final round",
};

const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const InterviewsTab = ({ applicationId }: InterviewsTabProps) => {
  const {
    data: interviews,
    isLoading,
    isError,
  } = useApplicationInterviews(applicationId);

  if (isError) {
    return (
      <Box sx={{ pt: 3 }}>
        <Alert severity="error">Failed to load interviews</Alert>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ pt: 3 }}>
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} variant="text" height={60} />
        ))}
      </Box>
    );
  }

  if (interviews?.length === 0) {
    return (
      <Box sx={{ pt: 3 }}>
        <Typography sx={{ color: "text.secondary" }}>
          No interviews scheduled yet
        </Typography>
      </Box>
    );
  }

  return (
    <List sx={{ pt: 3 }}>
      {interviews?.map((interview) => (
        <ListItem key={interview.id} sx={{ px: 0 }}>
          <Stack
            spacing={2}
            sx={{ width: "100%", direction: "row", alignItems: "center" }}
          >
            <Chip
              size="small"
              label={typeLabels[interview.type]}
              sx={{ bgcolor: "interview.light" }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                {formatDateTime(interview.scheduledAt)}
              </Typography>
              {interview.notes && (
                <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                  {interview.notes}
                </Typography>
              )}
            </Box>
          </Stack>
        </ListItem>
      ))}
    </List>
  );
};
