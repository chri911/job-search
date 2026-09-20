export type ApplicationStatus =
  | "applied"
  | "interviewing"
  | "offer"
  | "rejected";

export interface Contact {
  id: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
  linkedin?: string;
}

export interface Interview {
  id: string;
  applicationId: string;
  type: "phone" | "onsite" | "technical" | "final";
  scheduledAt: string; // ISO date string
  notes?: string;
  interviewer?: Contact;
}

export interface Application {
  id: string;
  company: string;
  position: string;
  location: string;
  workType: "remote" | "onsite" | "hybrid";
  status: ApplicationStatus;
  nextStep: string;
  nextStepDate: string; // ISO date string
  dateApplied: string; // ISO date string
  contacts: Contact[];
  interviews: Interview[];
}

export interface DashboardStats {
  active: number;
  interviews: number;
  responseRate: number;
  offers: number;
  addedThisWeek: number;
  offersAwaitingReply: number;
  interviewsScheduledNext: number;
  responseRateDelta?: number; // Optional, can be positive or negative
}
