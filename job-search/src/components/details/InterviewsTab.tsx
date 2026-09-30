import {
  Box,
  Typography,
  List,
  ListItem,
  Skeleton,
  Alert,
  Stack,
  IconButton,
  Button,
} from "@mui/material";
import type { Interview } from "../../types";
import { useApplicationInterviews } from "../../hooks/useApplicationInterview";
import { useState } from "react";
import { InterviewDialog } from "./InterviewDialog";
import { InterviewStatusChip } from "./InterviewStatusChip";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingInterview, setEditingInterview] = useState<
    Interview | undefined
  >();

  const handleAddClick = () => {
    setEditingInterview(undefined);
    setDialogOpen(true);
  };

  const handleEditClick = (interview: Interview) => {
    setEditingInterview(interview);
    setDialogOpen(true);
  };

  return (
    <Box sx={{ pt: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
        <Button
          startIcon={<AddIcon fontSize="small" />}
          onClick={handleAddClick}
          sx={{ textTransform: "none" }}
        >
          Add interview
        </Button>
      </Box>

      {isError && <Alert severity="error">Failed to load interviews</Alert>}

      {isLoading &&
        Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} variant="text" height={60} />
        ))}

      {!isLoading && !isError && interviews?.length === 0 && (
        <Typography sx={{ color: "text.secondary" }}>
          No interviews scheduled yet
        </Typography>
      )}

      {!isLoading && !isError && (
        <List>
          {interviews?.map((interview) => (
            <ListItem key={interview.id} sx={{ px: 0 }}>
              <Stack
                spacing={2}
                sx={{ width: "100%", direction: "row", alignItems: "center" }}
              >
                <Box sx={{ minWidth: 110 }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                    {typeLabels[interview.type]}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                    {formatDateTime(interview.scheduledAt)}
                  </Typography>
                </Box>

                <Typography
                  sx={{ fontSize: 13, color: "text.secondary", flex: 1 }}
                >
                  {interview.interviewerName ?? "—"}
                </Typography>

                <InterviewStatusChip status={interview.status} />

                <IconButton
                  size="small"
                  onClick={() => handleEditClick(interview)}
                  aria-label="Edit interview"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Stack>
            </ListItem>
          ))}
        </List>
      )}

      <InterviewDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        applicationId={applicationId}
        interview={editingInterview}
      />
    </Box>
  );
};
