import { apiClient } from "./client";
import type { Application, DashboardStats } from "../types";

export function fetchApplications(): Promise<Application[]> {
  return apiClient<Application[]>("/api/applications");
}

export function fetchDashboardStats(): Promise<DashboardStats> {
  return apiClient<DashboardStats>("/api/dashboard/stats");
}
