import { apiClient } from "./client";
import type {
  Application,
  ApplicationFormValues,
  Contact,
  ContactFormValues,
  DashboardStats,
  Interview,
  InterviewFormValues,
} from "../types";

export const fetchApplications = (): Promise<Application[]> => {
  return apiClient<Application[]>("/api/applications");
};

export const fetchApplicationById = (id: string): Promise<Application> => {
  return apiClient<Application>(`/api/applications/${id}`);
};

export const fetchDashboardStats = (): Promise<DashboardStats> => {
  return apiClient<DashboardStats>("/api/dashboard/stats");
};

export function fetchApplicationContacts(
  applicationId: string,
): Promise<Contact[]> {
  return apiClient<Contact[]>(`/api/applications/${applicationId}/contacts`);
}

export function fetchApplicationInterviews(
  applicationId: string,
): Promise<Interview[]> {
  return apiClient<Interview[]>(
    `/api/applications/${applicationId}/interviews`,
  );
}

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

export const createContact = (
  applicationId: string,
  data: ContactFormValues,
): Promise<Contact> => {
  return apiClient<Contact>(`/api/applications/${applicationId}/contacts`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateContact = (
  applicationId: string,
  contactId: string,
  data: Partial<ContactFormValues>,
): Promise<Contact> => {
  return apiClient<Contact>(
    `/api/applications/${applicationId}/contacts/${contactId}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );
};

export const createInterview = (
  applicationId: string,
  data: InterviewFormValues,
): Promise<Interview> => {
  return apiClient<Interview>(`/api/applications/${applicationId}/interviews`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateInterview = (
  applicationId: string,
  interviewId: string,
  data: Partial<InterviewFormValues>,
): Promise<Interview> => {
  return apiClient<Interview>(
    `/api/applications/${applicationId}/interviews/${interviewId}`,
    { method: "PATCH", body: JSON.stringify(data) },
  );
};
