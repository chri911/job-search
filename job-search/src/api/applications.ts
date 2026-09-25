import { apiClient } from "./client";
import type {
  Application,
  ApplicationFormValues,
  DashboardStats,
} from "../types";

export const fetchApplications = (): Promise<Application[]> => {
  return apiClient<Application[]>("/api/applications");
};

export const fetchDashboardStats = (): Promise<DashboardStats> => {
  return apiClient<DashboardStats>("/api/dashboard/stats");
};

export const createApplication = (
  data: ApplicationFormValues,
): Promise<Application> => {
  return apiClient<Application>("/api/applications", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateApplication = (
  id: string,
  data: Partial<ApplicationFormValues>,
): Promise<Application> => {
  return apiClient<Application>(`/api/applications/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

export const deleteApplication = (id: string): Promise<void> => {
  return apiClient<void>(`/api/applications/${id}`, { method: "DELETE" });
};
