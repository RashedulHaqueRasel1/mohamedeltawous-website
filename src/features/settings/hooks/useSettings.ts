import { useMutation } from "@tanstack/react-query";
import { changePassword, ChangePasswordPayload } from "../api/settings.api";
import { toast } from "sonner";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => changePassword(payload),
    onSuccess: (data) => {
      toast.success(data.message || "Password changed successfully!");
    },
    onError: (error: unknown) => {
      const msg =
        error instanceof Error ? error.message : "Failed to change password";
      toast.error(msg);
    },
  });
};
