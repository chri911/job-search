import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { TextField, type TextFieldProps } from "@mui/material";

interface FormTextFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  errorMessage?: string;
  textFieldProps?: Partial<TextFieldProps>;
}

export const FormTextField = <T extends FieldValues>({
  name,
  control,
  label,
  errorMessage,
  textFieldProps,
}: FormTextFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          fullWidth
          error={!!errorMessage}
          helperText={errorMessage}
          {...textFieldProps}
        />
      )}
    />
  );
};
