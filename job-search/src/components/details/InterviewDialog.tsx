import { useState } from "react";
import { ApiError } from "../../api/client";
import type { Interview } from "../../types";
import {
  useCreateInterview,
  useUpdateInterview,
} from "../../hooks/useInterviewsMutation";
import type { InterviewFormData } from "../../schemas/interviewsSchema";
import { InterviewForm } from "./InterviewForm";
import { ResponsiveDialog } from "../ResponsiveDialog";

interface InterviewDialogProps {
  open: boolean;
  onClose: () => void;
  applicationId: string;
  interview?: Interview;
}

export const InterviewDialog = ({
  open,
  onClose,
  applicationId,
  interview,
}: InterviewDialogProps) => {
  const createMutation = useCreateInterview(applicationId);
  const updateMutation = useUpdateInterview(applicationId);
  const [serverError, setServerError] = useState<string>();

  const isEditMode = !!interview;
  const mutation = isEditMode ? updateMutation : createMutation;

  const handleSubmit = (data: InterviewFormData) => {
    setServerError(undefined);

    if (isEditMode) {
      updateMutation.mutate(
        { interviewId: interview.id, data },
        {
          onSuccess: onClose,
          onError: (error) =>
            setServerError(
              error instanceof ApiError
                ? error.message
                : "Something went wrong",
            ),
        },
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: onClose,
        onError: (error) =>
          setServerError(
            error instanceof ApiError ? error.message : "Something went wrong",
          ),
      });
    }
  };

  return (
    <ResponsiveDialog
      open={open}
      onClose={onClose}
      title={isEditMode ? "Edit application" : "Add application"}
    >
      <InterviewForm
        key={interview?.id ?? "new"}
        defaultValues={interview}
        onSubmit={handleSubmit}
        isSubmitting={mutation.isPending}
        serverError={serverError}
      />
    </ResponsiveDialog>
  );
};
