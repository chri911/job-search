// src/components/ApplicationsList.tsx
import { Alert, Box, Link, Paper, Skeleton, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { CompanyAvatar } from "./CompanyAvatar";
import { StatusChip } from "./StatusChip";
import { RowActionsMenu } from "./RowActionsMenu";
import { formatDate, locationLabel } from "../utils/applicationFormat";
import type { Application } from "../types";

interface Props {
  applications: Application[] | undefined;
  isLoading: boolean;
  isError: boolean;
  skeletonCount: number;
  onEditClick: (application: Application) => void;
  onDeleteClick: (application: Application) => void;
}

export const ApplicationsList = ({
  applications,
  isLoading,
  isError,
  skeletonCount,
  onEditClick,
  onDeleteClick,
}: Props) => {
  if (isError)
    return <Alert severity="error">Failed to load applications</Alert>;

  if (isLoading) {
    return (
      <Box>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <Skeleton key={i} variant="rounded" height={112} sx={{ mb: 1.5 }} />
        ))}
      </Box>
    );
  }

  if (!applications?.length) {
    return (
      <Typography sx={{ color: "text.secondary", textAlign: "center", py: 6 }}>
        No applications found
      </Typography>
    );
  }

  return (
    <Box
      component="ul"
      sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 1.5 }}
    >
      {applications.map((app) => (
        <Paper
          key={app.id}
          component="li"
          elevation={0}
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "flex-start",
            gap: 1.5,
            p: 1.5,
            pr: 0.5,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          <Box sx={{ mt: 0.5 }}>
            <CompanyAvatar company={app.company} />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Link
              component={RouterLink}
              to={`/applications/${app.id}`}
              underline="none"
              color="text.primary"
              noWrap
              sx={{
                display: "block",
                fontWeight: 600,
                fontSize: 14,
                "&::after": { content: '""', position: "absolute", inset: 0 }, // растягивает ссылку на всю карточку
              }}
            >
              {app.company}
            </Link>
            <Typography noWrap sx={{ fontSize: 13 }}>
              {app.position}
            </Typography>
            <Typography noWrap sx={{ fontSize: 12, color: "text.secondary" }}>
              {locationLabel(app)}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <StatusChip status={app.status} />
              <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                {formatDate(app.appliedAt)}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ position: "relative", zIndex: 1 }}>
            <RowActionsMenu
              onEdit={() => onEditClick(app)}
              onDelete={() => onDeleteClick(app)}
            />
          </Box>
        </Paper>
      ))}
    </Box>
  );
};
