import { Box } from "@mui/material";
import { ApplicationsHeader } from "../components/ApplicationsHeader";
import { useApplications } from "../hooks/useApplications";
import { StatsCards } from "../components/StatsCards";
import { useState } from "react";
import type { ApplicationStatus, ViewMode } from "../types";
import { FiltersBar } from "../components/FiltersBar";
import { ApplicationsTable } from "../components/ApplcationsTable";

export const Applications = () => {
  const { data: applications, isLoading, isError } = useApplications();
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFiler] = useState<ApplicationStatus | "all">(
    "all",
  );
  const [viewMode, setViewMode] = useState<ViewMode>("list");
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
        />
      </Box>
    </>
  );
};
