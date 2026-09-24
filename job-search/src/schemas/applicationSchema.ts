import { z } from "zod";

export const applicationSchema = z.object({
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  location: z.string().min(1, "Location is required"),
  workMode: z.enum(["remote", "hybrid", "onsite"], {
    message: "Select a work mode",
  }),
  status: z.enum(["applied", "interview", "offer", "rejected"], {
    message: "Select a status",
  }),
  appliedAt: z.string().min(1, "Applied date is required"),
  nextStep: z.string().optional(),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;
