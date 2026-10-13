import { Alert, Box, Paper, Skeleton, Typography } from "@mui/material";
import { interviewTypeLabels } from "../constants/interviewLabels";
import { useNavigate } from "react-router-dom";
import type { InterviewWithApplication } from "../types";
import { useUpcomingInterviews } from "../hooks/useUpcomingInterviews";

const LIST_LIMIT = 5;
const ROW_HEIGHT = 64;

const DateBadge = ({ dateString }: { dateString: string }) => {
  const date = new Date(dateString);
  return (
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: 2,
        bgcolor: "grey.100",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Typography sx={{ fontSize: 16, fontWeight: 700, lineHeight: 1.1 }}>
        {date.getDate()}
      </Typography>
      <Typography
        sx={{
          fontSize: 11,
          color: "text.secondary",
          textTransform: "uppercase",
        }}
      >
        {date.toLocaleDateString("en-GB", { month: "short" })}
      </Typography>
    </Box>
  );
};

function InterviewRow({ interview }: { interview: InterviewWithApplication }) {
  const navigate = useNavigate();
  const time = new Date(interview.scheduledAt).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <Box
      onClick={() => navigate(`/applications/${interview.applicationId}`)}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        height: ROW_HEIGHT,
        px: 1,
        borderRadius: 2,
        cursor: "pointer",
        "&:hover": { bgcolor: "action.hover" },
      }}
    >
      <DateBadge dateString={interview.scheduledAt} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontWeight: 600, fontSize: 14 }} noWrap>
          {interview.company}
        </Typography>
        <Typography sx={{ fontSize: 13, color: "text.secondary" }} noWrap>
          {interviewTypeLabels[interview.type]}
          {interview.interviewerName && ` · ${interview.interviewerName}`}
        </Typography>
      </Box>
      <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
        {time}
      </Typography>
    </Box>
  );
}

export const UpcomingInterviews = () => {
  const {
    data: interviews,
    isLoading,
    isError,
  } = useUpcomingInterviews(LIST_LIMIT);
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
      <Typography sx={{ fontWeight: 600, fontSize: 16, mb: 2 }}>
        Upcoming interviews
      </Typography>

      <Box sx={{ minHeight: ROW_HEIGHT * 3 }}>
        {isError && <Alert severity="error">Failed to load interviews</Alert>}

        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rounded"
              height={ROW_HEIGHT - 8}
              sx={{ mb: 1 }}
            />
          ))}

        {!isLoading && !isError && interviews?.length === 0 && (
          <Typography sx={{ color: "text.secondary", fontSize: 14, py: 2 }}>
            No upcoming interviews
          </Typography>
        )}

        {!isLoading &&
          !isError &&
          interviews?.map((interview) => (
            <InterviewRow key={interview.id} interview={interview} />
          ))}
      </Box>
    </Paper>
  );
};
