import axiosInstance from "@/instance/axios-instance";

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export const changePassword = async (
  payload: ChangePasswordPayload
): Promise<ChangePasswordResponse> => {
  const response = await axiosInstance.post("/auth/change-password", payload);
  return response.data;
};
