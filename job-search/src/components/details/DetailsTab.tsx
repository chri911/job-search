import { Box, Grid, Typography } from "@mui/material";
import type { Application } from "../../types";

interface DetailsTabProps {
  application: Application;
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const InfoRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 0.5 }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 500 }}>{value}</Typography>
    </Grid>
  );
};

export const DetailsTab = ({ application }: DetailsTabProps) => {
  return (
    <Box sx={{ pt: 3 }}>
      <Grid container spacing={3}>
        <InfoRow label="Location" value={application.location} />
        <InfoRow
          label="Work mode"
          value={
            application.workMode.charAt(0).toUpperCase() +
            application.workMode.slice(1)
          }
        />
        <InfoRow label="Applied" value={formatDate(application.appliedAt)} />
        <InfoRow label="Next step" value={application.nextStep ?? "—"} />
      </Grid>
    </Box>
  );
};
