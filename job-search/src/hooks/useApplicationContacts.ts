import { useQuery } from "@tanstack/react-query";
import { fetchApplicationContacts } from "../api/applications";

export function useApplicationContacts(applicationId: string | undefined) {
  return useQuery({
    queryKey: ["applications", applicationId, "contacts"],
    queryFn: () => fetchApplicationContacts(applicationId as string),
    enabled: !!applicationId,
  });
}
