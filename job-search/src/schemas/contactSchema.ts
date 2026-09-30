import z from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional(),
  linkedinUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactSchema>;
