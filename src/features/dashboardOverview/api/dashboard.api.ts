import axiosInstance from "@/instance/axios-instance";
import { DashboardResponse } from "../types";

export async function getDashboardData(): Promise<DashboardResponse> {
  const response = await axiosInstance.get("/users/dashboard");
  return response.data;
}
