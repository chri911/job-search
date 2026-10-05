import { Alert, Box, Button, Snackbar } from "@mui/material";
import { ApplicationsHeader } from "../components/ApplicationsHeader";
import { useApplications } from "../hooks/useApplications";
import { StatsCards } from "../components/StatsCards";
import { useEffect, useState } from "react";
import type { Application, ApplicationStatus, ViewMode } from "../types";
import { FiltersBar } from "../components/FiltersBar";
import { ApplicationsTable } from "../components/ApplcationsTable";
import { ApplicationsDialog } from "../components/ApplicationsDialog";
import { useOutletContext, useSearchParams } from "react-router-dom";
import type { AppContextType } from "../App";
import { useDeleteApplication } from "../hooks/useApplicationsMutations";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

export const Applications = () => {
  const { setTopBarActions } = useOutletContext<AppContextType>();

  const deleteMutation = useDeleteApplication();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") ?? "",
  );
  const debouncedSearch = useDebouncedValue(searchInput, 300);

  const statusFilter =
    (searchParams.get("status") as ApplicationStatus | "all") ?? "all";
  const viewMode = (searchParams.get("view") as ViewMode) ?? "list";

  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const limit = parseInt(searchParams.get("limit") ?? "10", 10);
  const sortField = searchParams.get("sortField") ?? "appliedAt";
  const sortDirection =
    (searchParams.get("sortDirection") as "asc" | "desc") ?? "desc";
  const { data, isLoading, isError } = useApplications({
    search: debouncedSearch || undefined,
    status: statusFilter,
    sort: `${sortField}:${sortDirection}`,
    page,
    limit,
  });
  const applications = data?.items;
  const total = data?.total || 0;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<
    Application | undefined
  >();
  const [deleteTarget, setDeleteTarget] = useState<Application | null>(null);

  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
  } | null>(null);

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set("page", String(newPage + 1));
      return prev;
    });
  };

  const handleRowsPerPageChange = (newLimit: number) => {
    setSearchParams((prev) => {
      prev.set("limit", String(newLimit));
      prev.set("page", "1");
      return prev;
    });
  };

  const handleSortChange = (field: string) => {
    setSearchParams((prev) => {
      if (sortField === field) {
        prev.set("sortDirection", sortDirection === "asc" ? "desc" : "asc");
      } else {
        prev.set("sortField", field);
        prev.set("sortDirection", "asc");
      }
      prev.set("page", "1");
      return prev;
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
  };

  const handleSearchSync = (value: string) => {
    setSearchParams((prev) => {
      if (value) {
        prev.set("search", value);
      } else {
        prev.delete("search");
      }
      return prev;
    });
  };

  const handleStatusFilterChange = (value: ApplicationStatus | "all") => {
    setSearchParams((prev) => {
      if (value === "all") {
        prev.delete("status");
      } else {
        prev.set("status", value);
      }
      return prev;
    });
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setSearchParams((prev) => {
      prev.set("view", mode);
      return prev;
    });
  };

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

    return () => setTopBarActions(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleSearchSync(debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <>
      <Box>
        <ApplicationsHeader
          title="Applications"
          subtitle="Track every opportunity from first contact to offer."
          total={total}
        />
        <StatsCards />
        <FiltersBar
          searchValue={searchInput}
          onSearchChange={handleSearchChange}
          statusFilter={statusFilter}
          onStatusFilterChange={handleStatusFilterChange}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
        />
        <ApplicationsTable
          applications={applications}
          isLoading={isLoading}
          isError={isError}
          total={total}
          page={page}
          limit={limit}
          sortField={sortField}
          sortDirection={sortDirection}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onSortChange={handleSortChange}
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
