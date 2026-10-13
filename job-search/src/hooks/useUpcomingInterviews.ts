import { useQuery } from "@tanstack/react-query";
import { fetchUpcomingInterviews } from "../api/applications";

export const useUpcomingInterviews = (limit = 5) => {
  return useQuery({
    queryKey: ["interviews", "upcoming", { limit }],
    queryFn: () => fetchUpcomingInterviews(limit),
  });
};
