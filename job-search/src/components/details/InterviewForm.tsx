import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  interviewSchema,
  type InterviewFormData,
} from "../../schemas/interviewsSchema";
import { Alert, Button, MenuItem, Stack, TextField } from "@mui/material";

interface InterviewFormProps {
  defaultValues?: Partial<InterviewFormData>;
  onSubmit: (data: InterviewFormData) => void;
  isSubmitting?: boolean;
  serverError?: string;
}

const typeOptions = [
  { value: "phone", label: "Phone screen" },
  { value: "technical", label: "Technical" },
  { value: "onsite", label: "Onsite" },
  { value: "final", label: "Final round" },
];

const statusOptions = [
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export const InterviewForm = ({
  defaultValues,
  onSubmit,
  isSubmitting,
  serverError,
}: InterviewFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InterviewFormData>({
    resolver: zodResolver(interviewSchema),
    defaultValues: {
      type: "phone",
      scheduledAt: "",
      status: "scheduled",
      interviewerName: "",
      notes: "",
      ...defaultValues,
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {serverError && <Alert severity="error">{serverError}</Alert>}

        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Type"
              fullWidth
              error={!!errors.type}
            >
              {typeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="scheduledAt"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="datetime-local"
              label="Date & time"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              error={!!errors.scheduledAt}
              helperText={errors.scheduledAt?.message}
            />
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
          name="interviewerName"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Interviewer" fullWidth />
          )}
        />

        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Notes" multiline rows={3} fullWidth />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="accent"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save interview"}
        </Button>
      </Stack>
    </form>
  );
};
