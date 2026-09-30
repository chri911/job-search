import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ContactFormValues } from "../types";
import { createContact, updateContact } from "../api/applications";

export const useCreateContact = (applicationId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ContactFormValues) => createContact(applicationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications", applicationId, "contacts"],
      });
    },
  });
};

export function useUpdateContact(applicationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      contactId,
      data,
    }: {
      contactId: string;
      data: Partial<ContactFormValues>;
    }) => updateContact(applicationId, contactId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications", applicationId, "contacts"],
      });
    },
  });
}
