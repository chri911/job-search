import { useOutletContext } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { PipelineBoard } from "../components/PipelineBoard";
import { useBoardApplications } from "../hooks/useApplications";
import type { AppContextType } from "../App";

export const Pipeline = () => {
  const { showSnackbar } = useOutletContext<AppContextType>();
  const { data, isLoading, isError } = useBoardApplications();

  return (
    <>
      <PageHeader title="Pipeline" subtitle="Drag cards between stages." />
      <PipelineBoard
        applications={data?.items}
        isLoading={isLoading}
        isError={isError}
        onStatusChangeResult={showSnackbar}
      />
    </>
  );
};
