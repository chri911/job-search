import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme.ts";
import App from "./App.tsx";
import { Overview } from "./pages/Overview.tsx";
import { Applications } from "./pages/Applications.tsx";
import { Pipeline } from "./pages/Pipeline.tsx";
import { Interviews } from "./pages/Interviews.tsx";
import { NotFound } from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<Overview />} />
                <Route path="applications" element={<Applications />} />
                <Route path="pipeline" element={<Pipeline />} />
                <Route path="interviews" element={<Interviews />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CssBaseline>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
