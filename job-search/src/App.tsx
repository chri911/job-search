import { Outlet } from "react-router-dom";
import { Alert, Box, Button, Snackbar } from "@mui/material";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { ContentContainer } from "./components/ContentContainer";
import { useState } from "react";
import type { Application } from "./types";
import { ApplicationsDialog } from "./components/ApplicationsDialog";
import { useBreakpoints } from "./hooks/useBreakpoints";

type Severity = "success" | "error";

export interface AppContextType {
  openApplicationDialog: (application?: Application) => void;
  showSnackbar: (message: string, severity: Severity) => void;
}

export const App = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<
    Application | undefined
  >();
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: Severity;
  } | null>(null);

  const { isDesktop, isPhone } = useBreakpoints();

  const [mobileOpen, setMobileOpen] = useState(false);

  const openApplicationDialog = (application?: Application) => {
    setEditingApplication(application);
    setDialogOpen(true);
  };

  const showSnackbar = (message: string, severity: Severity) => {
    setSnackbar({ message, severity });
  };
  const [prevIsDesktop, setPrevIsDesktop] = useState(isDesktop);
  if (isDesktop !== prevIsDesktop) {
    setPrevIsDesktop(isDesktop);
    if (isDesktop) setMobileOpen(false);
  }
  return (
    <Box sx={{ display: "flex", height: "100dvh", bgcolor: "#fff" }}>
      <Sidebar
        user={{
          name: "Anna Kowalska",
          email: "anna.kowalska@example.com",
          initials: "AK",
        }}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        <TopBar
          onMenuClick={() => setMobileOpen(true)}
          actions={
            <Button
              variant="contained"
              color="accent"
              onClick={() => openApplicationDialog()}
              sx={{ borderRadius: 2, whiteSpace: "nowrap" }}
            >
              {isPhone ? "Add" : "Add application"}
            </Button>
          }
        />
        <ContentContainer>
          <Outlet
            context={
              { openApplicationDialog, showSnackbar } satisfies AppContextType
            }
          />
        </ContentContainer>
      </Box>
      <ApplicationsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        application={editingApplication}
        onResult={showSnackbar}
      />

      <Snackbar
        open={!!snackbar}
        autoHideDuration={4000}
        onClose={() => setSnackbar(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={snackbar?.severity}
          onClose={() => setSnackbar(null)}
          sx={{ width: "100%" }}
        >
          {snackbar?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
