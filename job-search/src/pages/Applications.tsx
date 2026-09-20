import { Box } from "@mui/material";
import { ApplicationsHeader } from "../components/ApplicationsHeader";
import { useApplications } from "../hooks/useApplications";
import { StatsCards } from "../components/StatsCards";

export const Applications = () => {
  const { data: applications } = useApplications();
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
      </Box>
    </>
  );
};
