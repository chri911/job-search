import { useEffect } from "react";
import {
  useCreateApplication,
  useUpdateApplication,
} from "../hooks/useApplicationsMutations";
import type { ApplicationFormData } from "../schemas/applicationSchema";
import type { Application } from "../types";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { ApplicationsForm } from "./ApplicationsForm";

interface ApplicationsDialogProps {
  open: boolean;
  onClose: () => void;
  application?: Application;
}

export const ApplicationsDialog = ({
  open,
  onClose,
  application,
}: ApplicationsDialogProps) => {
  const createMutation = useCreateApplication();
  const updateMutation = useUpdateApplication();

  const isEditMode = Boolean(application);
  const mutation = isEditMode ? updateMutation : createMutation;

  const handleSubmit = (data: ApplicationFormData) => {
    if (isEditMode) {
      updateMutation.mutate(
        { id: application.id, data },
        { onSuccess: onClose },
      );
    } else {
      createMutation.mutate(data, { onSuccess: onClose });
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
      </DialogTitle>
      <DialogContent>
        <ApplicationsForm
          key={application?.id ?? "new"}
          defaultValues={application}
          onSubmit={handleSubmit}
          isSubmitting={mutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
};
