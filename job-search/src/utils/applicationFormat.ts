import type { Application } from "../types";

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const locationLabel = (app: Application): string => {
  const mode = app.workMode.charAt(0).toUpperCase() + app.workMode.slice(1);
  return app.location.toLowerCase() === app.workMode
    ? mode
    : `${mode} · ${app.location}`;
};
