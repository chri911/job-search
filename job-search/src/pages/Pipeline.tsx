import { useOutletContext } from "react-router-dom";
import { PipelineBoard } from "../components/PipelineBoard";
import { useBoardApplications } from "../hooks/useApplications";
import type { AppContextType } from "../App";
import { QueryErrorState } from "../components/errors/QueryErrorState";

const Pipeline = () => {
  const { showSnackbar } = useOutletContext<AppContextType>();
  const { data, isLoading, isError, error, refetch, isFetching } =
    useBoardApplications();

  return (
    <>
      {isError && !data ? (
        <QueryErrorState
          error={error}
          onRetry={() => refetch()}
          isRetrying={isFetching}
        />
      ) : (
        <PipelineBoard
          applications={data?.items}
          isLoading={isLoading}
          onStatusChangeResult={showSnackbar}
        />
      )}
    </>
  );
};

export default Pipeline;