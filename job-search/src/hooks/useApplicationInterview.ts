import { useQuery } from "@tanstack/react-query";
import { fetchApplicationInterviews } from "../api/applications";

export function useApplicationInterviews(applicationId: string | undefined) {
  return useQuery({
    queryKey: ["applications", applicationId, "interviews"],
    queryFn: () => fetchApplicationInterviews(applicationId as string),
    enabled: !!applicationId,
  });
}
