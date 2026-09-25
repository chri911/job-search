import { useEffect } from "react";
import {
  useCreateApplication,
  useUpdateApplication,
  useDeleteApplication,
} from "../hooks/useApplicationsMutations";
import type { ApplicationFormData } from "../schemas/applicationSchema";
import type { Application } from "../types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ApplicationsForm } from "./ApplicationsForm";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";

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
  const deleteMutation = useDeleteApplication();

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

  const handleDelete = () => {
    if (!application) {
      return;
    }
    const confirmed = window.confirm(
      `Delete application for ${application.company}? This cannot be undone.`,
    );

    if (confirmed) {
      deleteMutation.mutate(application.id, { onSuccess: onClose });
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
      <DialogContent>
        <ApplicationsForm
          key={application?.id ?? "new"}
          defaultValues={application}
          onSubmit={handleSubmit}
          isSubmitting={mutation.isPending}
        />
      </DialogContent>
      {isEditMode && (
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          color="error"
          startIcon={<DeleteOutlineIcon />}
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending ? "Deleting..." : "Delete application"}
        </Button>
      </DialogActions>
        )} 
    </Dialog>
  );
};
