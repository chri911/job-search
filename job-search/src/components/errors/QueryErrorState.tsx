// src/components/errors/QueryErrorState.tsx
import { ErrorState } from "./ErrorState";
import { describeError } from "../../utils/errors";

interface QueryErrorStateProps {
  error: unknown;
  onRetry: () => void;
  isRetrying?: boolean;
  compact?: boolean;
}

export const QueryErrorState = ({
  error,
  onRetry,
  isRetrying,
  compact,
}: QueryErrorStateProps) => {
  const { title, message, retryable } = describeError(error);
  return (
    <ErrorState
      title={title}
      message={message}
      onRetry={retryable ? onRetry : undefined}
      isRetrying={isRetrying}
      compact={compact}
    />
  );
};
