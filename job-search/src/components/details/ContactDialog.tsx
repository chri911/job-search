import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  useCreateContact,
  useUpdateContact,
} from "../../hooks/useContactMutations";
import { ApiError } from "../../api/client";
import type { Contact } from "../../types";
import type { ContactFormData } from "../../schemas/contactSchema";
import { ContactForm } from "./ContactForm";

interface ContactDialogProps {
  open: boolean;
  onClose: () => void;
  applicationId: string;
  contact?: Contact;
}

export default function ContactDialog({
  open,
  onClose,
  applicationId,
  contact,
}: ContactDialogProps) {
  const createMutation = useCreateContact(applicationId);
  const updateMutation = useUpdateContact(applicationId);
  const [serverError, setServerError] = useState<string>();

  const isEditMode = !!contact;
  const mutation = isEditMode ? updateMutation : createMutation;

  const handleSubmit = (data: ContactFormData) => {
    setServerError(undefined);

    if (isEditMode) {
      updateMutation.mutate(
        { contactId: contact.id, data },
        {
          onSuccess: onClose,
          onError: (error) => {
            setServerError(
              error instanceof ApiError
                ? error.message
                : "Something went wrong",
            );
          },
        },
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: onClose,
        onError: (error) => {
          setServerError(
            error instanceof ApiError ? error.message : "Something went wrong",
          );
        },
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          fontWeight: 700,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {isEditMode ? "Edit contact" : "Add contact"}
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <ContactForm
          key={contact?.id ?? "new"}
          defaultValues={contact}
          onSubmit={handleSubmit}
          isSubmitting={mutation.isPending}
          serverError={serverError}
        />
      </DialogContent>
    </Dialog>
  );
}
