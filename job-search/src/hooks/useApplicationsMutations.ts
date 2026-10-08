import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createApplication,
  updateApplication,
  deleteApplication,
} from "../api/applications";
import type {
  Application,
  ApplicationFormValues,
  ApplicationStatus,
  PaginatedResponse,
} from "../types";

export const useCreateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
};

export const useUpdateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<ApplicationFormValues>;
    }) => updateApplication(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
};

export const useDeleteApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ApplicationStatus }) =>
      updateApplication(id, { status }),

    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ["applications"] });

      const previousQueries = queryClient.getQueriesData<
        PaginatedResponse<Application>
      >({
        queryKey: ["applications"],
      });

      queryClient.setQueriesData<PaginatedResponse<Application>>(
        { queryKey: ["applications"] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            items: old.items.map((app) =>
              app.id === id ? { ...app, status } : app,
            ),
          };
        },
      );

      return { previousQueries };
    },

    onError: (err, variables, context) => {
      context?.previousQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
};
