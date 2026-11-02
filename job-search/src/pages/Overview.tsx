import { ErrorBoundary } from "react-error-boundary";
import { StatsCards } from "../components/StatsCards";
import { UpcomingInterviews } from "../components/UpcomingInterviews";
import { PageHeader } from "../components/PageHeader";
import { WidgetErrorFallback } from "../components/errors/fallbacks";

export const Overview = () => {
  return (
    <>
      <PageHeader title="Overview" subtitle="Your job search at a glance." />

      <ErrorBoundary FallbackComponent={WidgetErrorFallback}>
        <StatsCards />
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={WidgetErrorFallback}>
        <UpcomingInterviews />
      </ErrorBoundary>
    </>
  );
};
