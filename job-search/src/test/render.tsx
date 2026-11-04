// src/test/render.tsx
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import { MemoryRouter, useLocation } from "react-router-dom";
import { AppRoutes } from "../AppRoutes";
import { theme } from "../theme";

const LocationProbe = () => {
  const { pathname, search } = useLocation();
  return (
    <div data-testid="location" hidden>
      {pathname}
      {search}
    </div>
  );
};

export const renderApp = (route = "/applications") => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: Infinity } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={[route]}>
          <AppRoutes />
          <LocationProbe />
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>,
  );
};
