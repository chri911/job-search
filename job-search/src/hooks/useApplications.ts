import { useQuery } from "@tanstack/react-query";
import {
  fetchApplicationById,
  fetchApplications,
  type FetchApplicationsParams,
} from "../api/applications";

export const useApplications = (params?: FetchApplicationsParams) => {
  return useQuery({
    queryKey: ["applications", params ?? {}],
    queryFn: () => fetchApplications(params),
  });
};

export const useApplication = (id: string | undefined) => {
  return useQuery({
    queryKey: ["applications", id],
    queryFn: () => fetchApplicationById(id as string),
    enabled: !!id,
  });
};
