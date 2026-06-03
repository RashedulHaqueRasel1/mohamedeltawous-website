import { useQuery } from "@tanstack/react-query";
import { getHistory, HistoryResponse } from "../api/history.api";

export const useHistory = (limit: number = 20) => {
  return useQuery<HistoryResponse, Error>({
    queryKey: ["workshop-history", limit],
    queryFn: () => getHistory(limit),
  });
};
