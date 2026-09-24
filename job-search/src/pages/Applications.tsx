import { Box, Button } from "@mui/material";
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

export const Applications = () => {
  const { setTopBarActions } = useOutletContext<AppContextType>();
  const { data: applications, isLoading, isError } = useApplications();
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFiler] = useState<ApplicationStatus | "all">(
    "all",
  );
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<
    Application | undefined
  >();

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
        />
        <ApplicationsDialog
          open={dialogOpen}
          onClose={handleDialogClose}
          application={editingApplication}
        />
      </Box>
    </>
  );
};
