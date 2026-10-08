import { useDroppable } from "@dnd-kit/core";
import { Box, Typography, Stack, Skeleton } from "@mui/material";
import type { Application, ApplicationStatus } from "../types";
import { DraggableCard } from "./DraggableCard";

interface DroppableColumnProps {
  status: ApplicationStatus;
  label: string;
  color: string;
  applications: Application[];
  isLoading: boolean;
}

export default function DroppableColumn({
  status,
  label,
  color,
  applications,
  isLoading,
}: DroppableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        minWidth: 260,
        flex: "1 1 260px",
        bgcolor: isOver ? "action.hover" : "grey.50",
        borderRadius: 3,
        p: 2,
        transition: "background-color 0.15s",
      }}
    >
      <Stack spacing={1} sx={{ mb: 2, direction: "row", alignItems: "center" }}>
        <Box
          sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: color }}
        />
        <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{label}</Typography>
        <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
          ({applications.length})
        </Typography>
      </Stack>

      {isLoading && (
        <>
          <Skeleton variant="rounded" height={90} sx={{ mb: 1.5 }} />
          <Skeleton variant="rounded" height={90} sx={{ mb: 1.5 }} />
        </>
      )}

      {!isLoading && applications.length === 0 && (
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
        applications.map((app) => (
          <DraggableCard key={app.id} application={app} />
        ))}
    </Box>
  );
}
