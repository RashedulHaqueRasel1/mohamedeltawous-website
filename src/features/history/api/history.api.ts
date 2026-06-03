import axiosInstance from "@/instance/axios-instance";
import { HistoryItem } from "../types/history.types";

export interface HistoryResponse {
  success: boolean;
  data: HistoryItem[];
}

export const getHistory = async (limit: number = 20): Promise<HistoryResponse> => {
  try {
    const response = await axiosInstance.get(`/workshop/history?limit=${limit}`);
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};
