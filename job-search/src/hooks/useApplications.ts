import { useQuery } from "@tanstack/react-query";
import { fetchApplicationById, fetchApplications } from "../api/applications";

export const useApplications = () => {
  return useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });
};

export const useApplication = (id: string | undefined) => {
  return useQuery({
    queryKey: ["applications", id],
    queryFn: () => fetchApplicationById(id as string),
    enabled: !!id,
  });
};
