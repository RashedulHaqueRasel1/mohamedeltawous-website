"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Eye, EyeOff, Loader2, ShieldCheck, KeyRound } from "lucide-react";
import { useChangePassword } from "../hooks/useSettings";

// ─── Validation ────────────────────────────────────────────────────────────
const schema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormType = z.infer<typeof schema>;

// ─── Field Component ───────────────────────────────────────────────────────
type PasswordFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  show: boolean;
  onToggle: () => void;
};

const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ label, error, show, onToggle, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-black uppercase tracking-wider text-slate-400">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <Lock className="h-4 w-4" />
        </div>
        <input
          ref={ref}
          type={show ? "text" : "password"}
          {...props}
          className={`w-full pl-11 pr-12 py-3 rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none transition-all text-sm font-medium placeholder:text-slate-400 ${error
              ? "border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30"
              : "border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-600 focus:ring-1 focus:ring-slate-400/20"
            }`}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
    </div>
  )
);
PasswordField.displayName = "PasswordField";

// ─── Main Component ────────────────────────────────────────────────────────
export default function SettingsView() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { mutate: changePassword, isPending } = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const onSubmit = (values: FormType) => {
    changePassword(
      { currentPassword: values.currentPassword, newPassword: values.newPassword },
      { onSuccess: () => reset() }
    );
  };

  return (
    <div className="flex flex-col gap-8 p-6 md:p-10 max-w-3xl mx-auto w-full">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Settings
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
          Manage your account security and preferences.
        </p>
      </div>

      {/* Change Password Card */}
      <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        {/* Card Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
            <KeyRound className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
              Change Password
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Update your password to keep your account secure.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-6">
          <PasswordField
            label="Current Password"
            placeholder="Enter your current password"
            show={showCurrent}
            onToggle={() => setShowCurrent((p) => !p)}
            error={errors.currentPassword?.message}
            {...register("currentPassword")}
          />

          {/* Divider */}
          <div className="border-t border-slate-100 dark:border-slate-800" />

          <PasswordField
            label="New Password"
            placeholder="Enter your new password"
            show={showNew}
            onToggle={() => setShowNew((p) => !p)}
            error={errors.newPassword?.message}
            {...register("newPassword")}
          />

          <PasswordField
            label="Confirm New Password"
            placeholder="Confirm your new password"
            show={showConfirm}
            onToggle={() => setShowConfirm((p) => !p)}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          {/* Password rules hint */}
          <ul className="space-y-1">
            {[
              "At least 8 characters long",
              "Use a mix of letters, numbers, and symbols for strength",
            ].map((rule) => (
              <li
                key={rule}
                className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500"
              >
                <ShieldCheck className="h-3 w-3 text-emerald-400 shrink-0" />
                {rule}
              </li>
            ))}
          </ul>

          {/* Submit */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-sm font-black uppercase tracking-wider hover:shadow-lg transition-all disabled:opacity-60 cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Update Password
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
