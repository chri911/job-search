import { Box } from "@mui/material";
import { ApplicationsHeader } from "../components/ApplicationsHeader";
import { useApplications } from "../hooks/useApplications";
import { StatsCards } from "../components/StatsCards";
import { useState } from "react";
import type { ApplicationStatus, ViewMode } from "../types";
import { FiltersBar } from "../components/FiltersBar";

export const Applications = () => {
  const { data: applications } = useApplications();
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFiler] = useState<ApplicationStatus | "all">(
    "all",
  );
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const handleAddClick = () => {
    console.log("Add application clicked");
  };
  return (
    <>
      <Box>
        <ApplicationsHeader
          title="Applications"
          subtitle="Track every opportunity from first contact to offer."
          total={applications?.length || 0}
          onAddClick={handleAddClick}
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
      </Box>
    </>
  );
};
