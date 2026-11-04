import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme.ts";
import { queryClient } from "./lib/queryClient.ts";
import { ErrorBoundary } from "react-error-boundary";
import { RootErrorFallback } from "./components/errors/fallbacks.tsx";
import { logError } from "./utils/errors.ts";
import { AppRoutes } from "./AppRoutes.tsx";

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
              <AppRoutes />
            </BrowserRouter>
          </ErrorBoundary>
        </CssBaseline>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
