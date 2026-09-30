import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInterview, updateInterview } from "../api/applications";
import type { InterviewFormValues } from "../types";

export const useCreateInterview = (applicationId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: InterviewFormValues) =>
      createInterview(applicationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications", applicationId, "interviews"],
      });
    },
  });
};

export const useUpdateInterview = (applicationId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      interviewId,
      data,
    }: {
      interviewId: string;
      data: Partial<InterviewFormValues>;
    }) => updateInterview(applicationId, interviewId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications", applicationId, "interviews"],
      });
    },
  });
};
