"use client";

import { useSession } from "next-auth/react";
import { useDashboardData } from "../hooks/useDashboard";
import {
  CreditCard,
  Users,
  Coins,
  History,
  CheckCircle2,
  XCircle,
  Copy,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Plus,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function DashboardOverview() {
  const { data: session } = useSession();
  const { data, isLoading, isError, error, refetch, isFetching } = useDashboardData();

  const userName = session?.user?.name || "Subscriber";
  const userEmail = session?.user?.email || "";

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  const formatCurrency = (amount: number, currency: string) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    });
    return formatter.format(amount / 100);
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-9 w-64 bg-slate-200 dark:bg-slate-800" />
            <Skeleton className="h-5 w-96 bg-slate-200 dark:bg-slate-800" />
          </div>
          <Skeleton className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded-full" />
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          <Skeleton className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          <Skeleton className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        </div>

        {/* Table & List Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="lg:col-span-2 h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          <Skeleton className="h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 md:p-6 lg:p-8 w-full max-w-xl mx-auto text-center py-20 space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/50">
          <XCircle className="h-10 w-10 text-red-600 dark:text-red-400 animate-bounce" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Failed to Load Dashboard</h2>
          <p className="text-slate-500 dark:text-slate-400">
            {error instanceof Error ? error.message : "An unexpected error occurred while fetching dashboard details."}
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <Button onClick={() => refetch()} className="bg-slate-900 text-white hover:bg-slate-850 dark:bg-slate-100 dark:text-slate-900 cursor-pointer">
            Retry Loading
          </Button>
          <Link href="/">
            <Button variant="outline" className="cursor-pointer">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const dashboard = data?.data;
  const subscription = dashboard?.subscription;
  const invitees = dashboard?.invitees || [];
  const payments = dashboard?.paymentHistory || [];

  // Calculate Credit Percent
  const totalCredits = subscription?.totalCredits || 0;
  const availableCredits = subscription?.availableCredits || 0;
  const creditPercent = totalCredits > 0 ? Math.round((availableCredits / totalCredits) * 100) : 0;

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Header section with Greeting and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0B1533] dark:text-white tracking-tight">
            Welcome back, {userName}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Monitor your credit limit, subscription plans, invitees, and billing history.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-2 cursor-pointer h-9 px-4 rounded-full border-slate-200 hover:bg-slate-50 dark:border-slate-800"
          >
            <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} />
            <span>{isFetching ? "Syncing..." : "Refresh"}</span>
          </Button>

          <Link href="/dashboard/new-scenario">
            <Button className="bg-[#0B1533] text-white hover:bg-[#15234d] dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 h-9 px-4 rounded-full font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer text-xs sm:text-sm">
              <Plus size={16} />
              <span>New Scenario</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Plan / Subscription Details */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800/80 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Current Plan</span>
              <h3 className="text-2xl font-bold text-[#0B1533] dark:text-white capitalize">
                {subscription ? `${subscription.tier} tier` : "No Active Plan"}
              </h3>
            </div>
            <div className="p-3 bg-violet-50 dark:bg-violet-950/30 rounded-2xl">
              <CreditCard size={22} className="text-violet-600 dark:text-violet-400" />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${subscription?.isActive ? "bg-emerald-400" : "bg-slate-400"}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${subscription?.isActive ? "bg-emerald-500" : "bg-slate-500"}`}></span>
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {subscription?.isActive ? "Active Subscription" : "Inactive / Idle"}
              </span>
            </div>

            <Link href="/dashboard/settings">
              <span className="text-xs font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400 flex items-center gap-0.5 cursor-pointer">
                Manage <ChevronRight size={14} />
              </span>
            </Link>
          </div>
        </div>

        {/* Credit Meter Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800/80 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1 w-full">
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Available Credits</span>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-extrabold text-[#0B1533] dark:text-white">
                  {subscription ? subscription.availableCredits : 0}
                </h3>
                <span className="text-sm text-slate-400">/ {subscription ? subscription.totalCredits : 0} total</span>
              </div>
            </div>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl shrink-0">
              <Coins size={22} className="text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${creditPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
              <span>{creditPercent}% credits remaining</span>
              <span>{subscription?.usedCredits || 0} credits used</span>
            </div>
          </div>
        </div>

        {/* Guest Invitees Count */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800/80 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Guest Invitees</span>
              <h3 className="text-3xl font-extrabold text-[#0B1533] dark:text-white">
                {dashboard?.inviteesCount || 0}
              </h3>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-2xl">
              <Users size={22} className="text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          {/* <div className="mt-6 pt-4 border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Unique guest users invited
            </span>
            <Link href="/dashboard/settings">
              <span className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-0.5 cursor-pointer">
                Invite guest <ChevronRight size={14} />
              </span>
            </Link>
          </div> */}
        </div>

      </div>

      {/* Main split details: Left: Payment History, Right: Invited Guests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Payment History Card */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800/80 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 dark:border-slate-850 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History size={18} className="text-slate-500" />
              <h3 className="font-bold text-[#0B1533] dark:text-white">Payment History</h3>
            </div>
            <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-full font-semibold">
              {payments.length} transactions
            </span>
          </div>

          <div className="flex-1 overflow-x-auto custom-scrollbar">
            {payments.length === 0 ? (
              <div className="p-12 text-center flex flex-col items-center justify-center space-y-3">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-full">
                  <History className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                </div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-350">No payments found</h4>
                <p className="text-xs text-slate-400 dark:text-slate-500 max-w-sm">
                  You haven&apos;t made any payments or upgrades yet. When you buy credits or upgrade packages, they will appear here.
                </p>
                <Link href="/dashboard/settings">
                  <Button size="sm" className="mt-2 bg-[#0B1533] hover:bg-[#1a2958] text-white rounded-full cursor-pointer">
                    Upgrade Now
                  </Button>
                </Link>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-50 dark:border-slate-800/50 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-850/20">
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Tier</th>
                    <th className="px-6 py-4">Credits</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50 text-sm">
                  {payments.map((p) => (
                    <tr key={p.paymentId} className="hover:bg-slate-50/40 dark:hover:bg-slate-850/20 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1.5 group">
                          <span title={p.paymentId}>#{p.paymentId.substring(0, 5)}</span>
                          <button
                            onClick={() => copyToClipboard(p.paymentId, "Payment ID copied to clipboard!")}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-opacity cursor-pointer"
                          >
                            <Copy size={11} className="text-slate-400" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {formatDate(p.date)}
                      </td>
                      <td className="px-6 py-4 capitalize font-semibold text-slate-850 dark:text-white">
                        {p.tier}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-350">
                        +{p.creditsAdded}
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                        {formatCurrency(p.amount, p.currency)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${p.status === "succeeded"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                          : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"
                          }`}>
                          {p.status === "succeeded" ? (
                            <CheckCircle2 size={12} className="shrink-0" />
                          ) : (
                            <XCircle size={12} className="shrink-0" />
                          )}
                          <span>{p.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Invited Guests Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800/80 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 dark:border-slate-850 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-slate-500" />
              <h3 className="font-bold text-[#0B1533] dark:text-white">Invited Guests</h3>
            </div>
            <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-full font-semibold">
              {invitees.length} total
            </span>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[360px] custom-scrollbar p-6">
            {invitees.length === 0 ? (
              <div className="py-12 text-center flex flex-col items-center justify-center space-y-3">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-full">
                  <Users className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                </div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-350">No invitees yet</h4>
                <p className="text-xs text-slate-400 dark:text-slate-500 max-w-sm mx-auto">
                  You haven&apos;t invited any guests to collaborate. Invite team members or clients under settings.
                </p>
                <Link href="/dashboard/settings">
                  <Button size="sm" className="mt-2 bg-[#0B1533] hover:bg-[#1a2958] text-white rounded-full cursor-pointer">
                    Invite Now
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {invitees.map((email) => {
                  const initial = email[0].toUpperCase();
                  return (
                    <div
                      key={email}
                      className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 font-semibold text-sm shrink-0">
                          {initial}
                        </div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate" title={email}>
                          {email}
                        </span>
                      </div>

                      <button
                        onClick={() => copyToClipboard(email, "Guest email copied to clipboard!")}
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-850 rounded-xl transition-colors cursor-pointer"
                        title="Copy Email"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* CSS Animation injection */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
