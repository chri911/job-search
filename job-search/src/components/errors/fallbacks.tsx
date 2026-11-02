// src/components/errors/fallbacks.tsx
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { FallbackProps } from "react-error-boundary";
import { ErrorState } from "./ErrorState";
import { errorDetails } from "../../utils/errors";

export const RootErrorFallback = ({ error }: FallbackProps) => {
  return (
    <ErrorState
      fullPage
      title="Pathway ran into a problem"
      message="The app couldn't recover from an unexpected error. Reloading usually fixes it."
      details={errorDetails(error)}
      onRetry={() => window.location.reload()}
      retryLabel="Reload page"
    />
  );
};

export const PageErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const navigate = useNavigate();
  return (
    <ErrorState
      title="This page crashed"
      message="Something went wrong while displaying this page. You can try again or go back to the overview."
      details={errorDetails(error)}
      onRetry={resetErrorBoundary}
      action={
        <Button
          onClick={() => {
            resetErrorBoundary();
            navigate("/");
          }}
        >
          Go to Overview
        </Button>
      }
    />
  );
};

export const WidgetErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <ErrorState
      compact
      title="This section failed to load"
      onRetry={resetErrorBoundary}
    />
  );
};
