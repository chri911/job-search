import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme.ts";
import { App } from "./App.tsx";
import { Overview } from "./pages/Overview.tsx";
import { Applications } from "./pages/Applications.tsx";
import { Pipeline } from "./pages/Pipeline.tsx";
import { Interviews } from "./pages/Interviews.tsx";
import { NotFound } from "./pages/NotFound.tsx";
import { queryClient } from "./lib/queryClient.ts";
import { ApplicationDetails } from "./pages/ApplicationDetails.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { RootErrorFallback } from "./components/errors/fallbacks.tsx";
import { logError } from "./utils/errors.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <ErrorBoundary
            FallbackComponent={RootErrorFallback}
            onError={logError}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<App />}>
                  <Route index element={<Overview />} />
                  <Route path="applications" element={<Applications />} />
                  <Route
                    path="applications/:id"
                    element={<ApplicationDetails />}
                  />
                  <Route path="pipeline" element={<Pipeline />} />
                  <Route path="interviews" element={<Interviews />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ErrorBoundary>
        </CssBaseline>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
