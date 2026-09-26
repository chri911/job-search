import { Alert, Box, Button, Snackbar } from "@mui/material";
import { ApplicationsHeader } from "../components/ApplicationsHeader";
import { useApplications } from "../hooks/useApplications";
import { StatsCards } from "../components/StatsCards";
import { useEffect, useState } from "react";
import type { Application, ApplicationStatus, ViewMode } from "../types";
import { FiltersBar } from "../components/FiltersBar";
import { ApplicationsTable } from "../components/ApplcationsTable";
import { ApplicationsDialog } from "../components/ApplicationsDialog";
import { useOutletContext } from "react-router-dom";
import type { AppContextType } from "../App";
import { useDeleteApplication } from "../hooks/useApplicationsMutations";
import { ConfirmDialog } from "../components/ConfirmDialog";

export const Applications = () => {
  const { setTopBarActions } = useOutletContext<AppContextType>();
  const { data: applications, isLoading, isError } = useApplications();
  const deleteMutation = useDeleteApplication();
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFiler] = useState<ApplicationStatus | "all">(
    "all",
  );
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<
    Application | undefined
  >();
  const [deleteTarget, setDeleteTarget] = useState<Application | null>(null);

  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
  } | null>(null);

  const handleAddClick = () => {
    setEditingApplication(undefined);
    setDialogOpen(true);
  };

  const handleEditClick = (application: Application) => {
    setEditingApplication(application);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDeleteClick = (application: Application) => {
    setDeleteTarget(application);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    const company = deleteTarget.company;
    deleteMutation.mutate(deleteTarget.id, {
      onSuccess: () => {
        setSnackbar({ message: `${company} deleted`, severity: "success" });
        setDeleteTarget(null);
      },
      onError: () => {
        setSnackbar({
          message: "Failed to delete application",
          severity: "error",
        });
      },
    });
  };

  useEffect(() => {
    setTopBarActions(
      <Button
        variant="contained"
        color="accent"
        onClick={handleAddClick}
        sx={{ borderRadius: 2 }}
      >
        Add application
      </Button>,
    );

    return () => setTopBarActions(null); // очистка при уходе со страницы
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box>
        <ApplicationsHeader
          title="Applications"
          subtitle="Track every opportunity from first contact to offer."
          total={applications?.length || 0}
        />
        <StatsCards />
        <FiltersBar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFiler}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
        <ApplicationsTable
          applications={applications}
          isLoading={isLoading}
          isError={isError}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
        <ApplicationsDialog
          open={dialogOpen}
          onClose={handleDialogClose}
          application={editingApplication}
          onResult={(message, severity) => setSnackbar({ message, severity })}
        />
        <ConfirmDialog
          open={!!deleteTarget}
          title="Delete application"
          message={`Delete application for ${deleteTarget?.company}? This cannot be undone.`}
          isLoading={deleteMutation.isPending}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
        <Snackbar
          open={!!snackbar}
          autoHideDuration={4000}
          onClose={() => setSnackbar(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            severity={snackbar?.severity}
            onClose={() => setSnackbar(null)}
            sx={{ width: "100%" }}
          >
            {snackbar?.message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};
