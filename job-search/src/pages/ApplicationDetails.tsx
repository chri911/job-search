import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Skeleton,
  Alert,
  Stack,
  Tabs,
  Tab,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useApplication } from "../hooks/useApplications";
import { CompanyAvatar } from "../components/CompanyAvatar";
import { StatusChip } from "../components/StatusChip";
import { useState } from "react";
import { DetailsTab } from "../components/details/DetailsTab";
import { ContactsTab } from "../components/details/ContactsTab";
import { InterviewsTab } from "../components/details/InterviewsTab";
import { ActivityTab } from "../components/details/ActivityTab";

type TabValue = "details" | "contacts" | "interviews" | "activity";

export const ApplicationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: application, isLoading, isError, error } = useApplication(id);
  const [activeTab, setActiveTab] = useState<TabValue>("details");
  const handleBack = () => navigate("/applications");

  if (isLoading) {
    return (
      <Box>
        <Stack
          spacing={1.5}
          sx={{ mb: 3, direction: "row", alignItems: "center" }}
        >
          <IconButton onClick={handleBack} size="small">
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <Skeleton variant="text" width={200} height={32} />
        </Stack>
        <Skeleton variant="rounded" height={80} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box>
        <IconButton onClick={handleBack} size="small" sx={{ mb: 2 }}>
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <Alert severity="error">
          {error instanceof Error && error.message.includes("404")
            ? "Application not found"
            : "Failed to load application"}
        </Alert>
      </Box>
    );
  }

  if (!application) {
    return null;
  }

  return (
    <Box>
      <Stack
        spacing={1.5}
        sx={{ mb: 3, direction: "row", alignItems: "center" }}
      >
        <IconButton onClick={handleBack} size="small">
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
          Back to applications
        </Typography>
      </Stack>

      <Stack spacing={2} sx={{ mb: 4, direction: "row", alignItems: "center" }}>
        <CompanyAvatar company={application.company} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {application.company}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {application.position}
          </Typography>
        </Box>
        <StatusChip status={application.status} />
      </Stack>

      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        sx={{ borderBottom: "1px solid", borderColor: "divider" }}
      >
        <Tab label="Details" value="details" sx={{ textTransform: "none" }} />
        <Tab label="Contacts" value="contacts" sx={{ textTransform: "none" }} />
        <Tab
          label="Interviews"
          value="interviews"
          sx={{ textTransform: "none" }}
        />
        <Tab label="Activity" value="activity" sx={{ textTransform: "none" }} />
      </Tabs>

      {activeTab === "details" && <DetailsTab application={application} />}
      {activeTab === "contacts" && (
        <ContactsTab applicationId={application.id} />
      )}
      {activeTab === "interviews" && (
        <InterviewsTab applicationId={application.id} />
      )}
      {activeTab === "activity" && <ActivityTab application={application} />}
    </Box>
  );
};
