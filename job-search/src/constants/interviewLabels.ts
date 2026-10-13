import type { Interview } from "../types";

export const interviewTypeLabels: Record<Interview["type"], string> = {
  phone: "Phone screen",
  technical: "Technical",
  onsite: "Onsite",
  final: "Final round",
};
