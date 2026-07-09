import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../api/dashboard.api";

export function useDashboardData() {
  return useQuery({
    queryKey: ["user-dashboard-data"],
    queryFn: getDashboardData,
  });
}
