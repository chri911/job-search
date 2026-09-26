import { useForm, Controller } from "react-hook-form";
import {
  applicationSchema,
  type ApplicationFormData,
} from "../schemas/applicationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, MenuItem, Stack, TextField } from "@mui/material";
import { useEffect } from "react";

interface ApplicationFormProps {
  defaultValues?: Partial<ApplicationFormData>;
  onSubmit: (data: ApplicationFormData) => void;
  isSubmitting?: boolean;
  serverError?: string;
  fieldErrors?: Record<string, string>;
}

const workModeOptions = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "Onsite" },
];

const statusOptions = [
  { value: "applied", label: "Applied" },
  { value: "interview", label: "Interview" },
  { value: "offer", label: "Offer" },
  { value: "rejected", label: "Rejected" },
];

export const ApplicationsForm = ({
  defaultValues,
  onSubmit,
  isSubmitting,
  serverError,
  fieldErrors,
}: ApplicationFormProps) => {
  const {
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      company: "",
      position: "",
      location: "",
      workMode: "remote",
      status: "applied",
      appliedAt: new Date().toISOString().split("T")[0],
      nextStep: "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (fieldErrors) {
      Object.entries(fieldErrors).forEach(([field, message]) => {
        setError(field as keyof ApplicationFormData, {
          type: "server",
          message,
        });
      });
    }
  }, [fieldErrors, setError]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {serverError && <Alert severity="error">{serverError}</Alert>}
        <Controller
          name="company"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Company"
              fullWidth
              error={!!errors.company}
              helperText={errors.company?.message}
            />
          )}
        />
        <Controller
          name="position"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Position"
              fullWidth
              error={!!errors.position}
              helperText={errors.position?.message}
            />
          )}
        />
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Location"
              fullWidth
              error={!!errors.location}
              helperText={errors.location?.message}
            />
          )}
        />
        <Controller
          name="workMode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Work mode"
              fullWidth
              error={!!errors.workMode}
              helperText={errors.workMode?.message}
            >
              {workModeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Status"
              fullWidth
              error={!!errors.status}
              helperText={errors.status?.message}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name="appliedAt"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="date"
              label="Applied date"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              error={!!errors.appliedAt}
              helperText={errors.appliedAt?.message}
            />
          )}
        />
        <Controller
          name="nextStep"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Next step"
              fullWidth
              placeholder="e.g. Technical interview"
              error={!!errors.nextStep}
              helperText={errors.nextStep?.message}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="accent"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save application"}
        </Button>
      </Stack>
    </form>
  );
};
