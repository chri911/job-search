// src/AppRoutes.tsx
import { Route, Routes } from "react-router-dom";
import { App } from "./App";
import { Overview } from "./pages/Overview";
import { Applications } from "./pages/Applications";
import { ApplicationDetails } from "./pages/ApplicationDetails";
import { Pipeline } from "./pages/Pipeline";
import { Interviews } from "./pages/Interviews";
import { NotFound } from "./pages/NotFound";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Overview />} />
        <Route path="applications" element={<Applications />} />
        <Route path="applications/:id" element={<ApplicationDetails />} />
        <Route path="pipeline" element={<Pipeline />} />
        <Route path="interviews" element={<Interviews />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
