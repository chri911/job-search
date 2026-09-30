import { z } from "zod";

export const interviewSchema = z.object({
  type: z.enum(["phone", "technical", "onsite", "final"]),
  scheduledAt: z.string().min(1, "Date and time are required"),
  status: z.enum(["scheduled", "completed", "cancelled"]),
  interviewerName: z.string().optional(),
  notes: z.string().optional(),
});

export type InterviewFormData = z.infer<typeof interviewSchema>;
