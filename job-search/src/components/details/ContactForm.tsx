import { useForm } from "react-hook-form";
import {
  contactSchema,
  type ContactFormData,
} from "../../schemas/contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Stack } from "@mui/material";
import { FormTextField } from "../FormTextField";

interface ContactFormProps {
  defaultValues?: Partial<ContactFormData>;
  onSubmit: (data: ContactFormData) => void;
  isSubmitting?: boolean;
  serverError?: string;
}

export const ContactForm = ({
  defaultValues,
  onSubmit,
  isSubmitting,
  serverError,
}: ContactFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      role: "",
      email: "",
      phone: "",
      linkedinUrl: "",
      ...defaultValues,
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {serverError && <Alert severity="error">{serverError}</Alert>}
        <FormTextField
          name="name"
          control={control}
          label="Name"
          errorMessage={errors.name?.message}
        />
        <FormTextField
          name="role"
          control={control}
          label="Role"
          errorMessage={errors.role?.message}
        />
        <FormTextField
          name="email"
          control={control}
          label="Email"
          errorMessage={errors.email?.message}
        />
        <FormTextField name="phone" control={control} label="Phone" />
        <FormTextField
          name="linkedinUrl"
          control={control}
          label="LinkedIn Url"
          errorMessage={errors.linkedinUrl?.message}
        />
        <Button
          type="submit"
          variant="contained"
          color="accent"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save contact"}
        </Button>
      </Stack>
    </form>
  );
};
