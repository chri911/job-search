import type { Application, ApplicationStatus } from "../types";
import { Alert, Box } from "@mui/material";
import { useUpdateApplicationStatus } from "../hooks/useApplicationsMutations";
import type { DragEndEvent } from "@dnd-kit/core/dist/types/events";
import { DndContext } from "@dnd-kit/core";
import DroppableColumn from "./DroppableColumn";

interface PipeLineBoardProps {
  applications: Application[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onStatusChangeResult?: (
    message: string,
    severity: "success" | "error",
  ) => void;
}

const columns: { status: ApplicationStatus; label: string; color: string }[] = [
  { status: "applied", label: "Applied", color: "info.main" },
  { status: "interview", label: "Interview", color: "interview.main" },
  { status: "offer", label: "Offer", color: "success.main" },
  { status: "rejected", label: "Rejected", color: "error.main" },
];

export const PipelineBoard = ({
  applications,
  isLoading,
  isError,
  onStatusChangeResult,
}: PipeLineBoardProps) => {
  const updateStatusMutation = useUpdateApplicationStatus();

  if (isError) {
    return <Alert severity="error">Failed to load applications</Alert>;
  }
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return; // отпущено не над зоной — ничего не делаем

    const applicationId = String(active.id);
    const newStatus = over.id as ApplicationStatus;

    const application = applications?.find((a) => a.id === applicationId);
    if (!application || application.status === newStatus) return; // не изменилось — пропускаем

    updateStatusMutation.mutate(
      { id: applicationId, status: newStatus },
      {
        onSuccess: () => {
          onStatusChangeResult?.(
            `${application.company} moved to ${newStatus}`,
            "success",
          );
        },
        onError: () => {
          onStatusChangeResult?.("Failed to update status", "error");
        },
      },
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 2 }}>
        {columns.map((col) => (
          <DroppableColumn
            key={col.status}
            status={col.status}
            label={col.label}
            color={col.color}
            applications={
              applications?.filter((a) => a.status === col.status) ?? []
            }
            isLoading={isLoading}
          />
        ))}
      </Box>
    </DndContext>
  );
};
