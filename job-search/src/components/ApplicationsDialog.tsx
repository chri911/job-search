import { useEffect, useState } from "react";
import {
  useCreateApplication,
  useUpdateApplication,
} from "../hooks/useApplicationsMutations";
import type { ApplicationFormData } from "../schemas/applicationSchema";
import type { Application } from "../types";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ApplicationsForm } from "./ApplicationsForm";
import { ApiError } from "../api/client";

interface ApplicationsDialogProps {
  open: boolean;
  onClose: () => void;
  application?: Application;
  onResult: (message: string, severity: "success" | "error") => void;
}

export const ApplicationsDialog = ({
  open,
  onClose,
  application,
  onResult,
}: ApplicationsDialogProps) => {
  const createMutation = useCreateApplication();
  const updateMutation = useUpdateApplication();

  const [serverError, setServerError] = useState<string>();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>();

  const isEditMode = Boolean(application);
  const mutation = isEditMode ? updateMutation : createMutation;

  const handleApiError = (error: unknown) => {
    if (error instanceof ApiError) {
      setServerError(error.fields ? undefined : error.message);
      setFieldErrors(error.fields);
    } else {
      setServerError("Something went wrong. Please try again.");
    }
  };

  const handleSubmit = (data: ApplicationFormData) => {
    setServerError(undefined);
    setFieldErrors(undefined);
    if (isEditMode) {
      updateMutation.mutate(
        { id: application.id, data },
        {
          onSuccess: () => {
            onResult(`${data.company} updated`, "success");
            onClose();
          },
          onError: handleApiError,
        },
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          onResult(`${data.company} added`, "success");
          onClose();
        },
        onError: handleApiError,
      });
    }
  };

  useEffect(() => {
    if (!open) {
      createMutation.reset();
      updateMutation.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>
        {isEditMode ? "Edit application" : "Add application"}
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ maxHeight: "70vh", overflowY: "auto" }}>
        <ApplicationsForm
          key={application?.id ?? "new"}
          defaultValues={application}
          onSubmit={handleSubmit}
          isSubmitting={mutation.isPending}
          serverError={serverError}
          fieldErrors={fieldErrors}
        />
      </DialogContent>
    </Dialog>
  );
};
