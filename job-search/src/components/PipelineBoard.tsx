import { useNavigate } from "react-router-dom";
import type { Application, ApplicationStatus } from "../types";
import { Alert, Box, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { CompanyAvatar } from "./CompanyAvatar";

interface PipeLineBoardProps {
  applications: Application[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

const columns: { status: ApplicationStatus; label: string; color: string }[] = [
  { status: "applied", label: "Applied", color: "info.main" },
  { status: "interview", label: "Interview", color: "interview.main" },
  { status: "offer", label: "Offer", color: "success.main" },
  { status: "rejected", label: "Rejected", color: "error.main" },
];

export const ColumnSkeleton = () => {
  return (
    <>
      <Skeleton variant="rounded" height={90} sx={{ mb: 1.5 }} />
      <Skeleton variant="rounded" height={90} sx={{ mb: 1.5 }} />
    </>
  );
};

const ApplicationCard = ({ application }: { application: Application }) => {
  const navigate = useNavigate();
  return (
    <Paper
      elevation={0}
      onClick={() => navigate(`/applications/${application.id}`)}
      sx={{
        p: 2,
        mb: 1.5,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        cursor: "pointer",
        "&:hover": { borderColor: "text.secondary" },
      }}
    >
      <Stack
        spacing={1.5}
        sx={{ mb: 1, direction: "row", alignItems: "center" }}
      >
        <CompanyAvatar company={application.company} />
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 14,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {application.company}
          </Typography>
          <Typography
            sx={{
              fontSize: 13,
              color: "text.secondary",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {application.position}
          </Typography>
        </Box>
      </Stack>
      {application.nextStep && (
        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
          {application.nextStep}
        </Typography>
      )}
    </Paper>
  );
};

export const PipelineBoard = ({
  applications,
  isLoading,
  isError,
}: PipeLineBoardProps) => {
  if (isError) {
    return <Alert severity="error">Failed to load applications</Alert>;
  }

  return (
    <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 2 }}>
      {columns.map((col) => {
        const columnApps =
          applications?.filter((a) => a.status === col.status) ?? [];

        return (
          <Box
            key={col.status}
            sx={{
              minWidth: 260,
              flex: "1 1 260px",
              bgcolor: "grey.50",
              borderRadius: 3,
              p: 2,
            }}
          >
            <Stack
              spacing={1}
              sx={{ mb: 2, direction: "row", alignItems: "center" }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: col.color,
                }}
              />
              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                {col.label}
              </Typography>
              <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                ({columnApps.length})
              </Typography>
            </Stack>

            {isLoading && <ColumnSkeleton />}

            {!isLoading && columnApps.length === 0 && (
              <Typography
                sx={{
                  fontSize: 13,
                  color: "text.secondary",
                  textAlign: "center",
                  py: 2,
                }}
              >
                No applications
              </Typography>
            )}

            {!isLoading &&
              columnApps.map((app) => (
                <ApplicationCard key={app.id} application={app} />
              ))}
          </Box>
        );
      })}
    </Box>
  );
};
