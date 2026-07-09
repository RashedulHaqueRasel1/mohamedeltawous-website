"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Copy, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") || "";

  const copySessionId = () => {
    if (sessionId) {
      navigator.clipboard.writeText(sessionId);
      toast.success("Transaction reference copied!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EEF7FC] via-[#F5FAFD] to-[#E5F3FA] dark:from-[#090D1A] dark:via-[#0F172A] dark:to-[#0B1224] p-4 md:p-6">

      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-300/10 dark:bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-300/10 dark:bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-md w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800/80 p-8 text-center relative overflow-hidden animate-fadeIn">

        {/* Top celebration icon */}
        <div className="absolute top-0 right-0 p-4 opacity-15">
          <PartyPopper size={120} className="text-[#0B1533] dark:text-white" />
        </div>

        {/* Animated Checkbox Container */}
        <div className="relative flex justify-center mb-6 mt-2">
          {/* Glowing outer rings */}
          <div className="absolute inset-0 bg-emerald-400/20 dark:bg-emerald-500/15 blur-2xl rounded-full scale-120 animate-pulse" />
          <div className="relative bg-emerald-50 dark:bg-emerald-950/30 p-5 rounded-full border border-emerald-100 dark:border-emerald-900/30 shadow-inner">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-[bounce_1.5s_infinite]" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-2 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 mb-2 uppercase tracking-wider">
            <ShieldCheck size={12} />
            Payment Verified
          </span>
          <h1 className="text-3xl font-extrabold text-[#0B1533] dark:text-white tracking-tight">
            Purchase Successful!
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto">
            Thank you for your order. Your account has been credited and subscription details updated.
          </p>
        </div>

        {/* Payment Summary Box */}
        <div className="my-6 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-850/30 border border-slate-100 dark:border-slate-800/50 space-y-3 text-left relative z-10">
          <div className="flex items-center justify-between text-xs border-b border-slate-100 dark:border-slate-800/40 pb-2">
            <span className="text-slate-400 font-medium">Status</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Succeeded
            </span>
          </div>

          {/* <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Delivery</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Sparkles size={12} className="text-amber-500" />
              Instant Credit
            </span>
          </div> */}

          {sessionId && (
            <div className="flex flex-col gap-1 pt-2 border-t border-slate-100 dark:border-slate-800/40 text-xs">
              <span className="text-slate-400 font-medium">Reference ID</span>
              <div className="flex items-center justify-between bg-white dark:bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800/60 font-mono text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                <span className="truncate max-w-[200px]" title={sessionId}>{sessionId}</span>
                <button
                  onClick={copySessionId}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-850 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
                  title="Copy Reference"
                >
                  <Copy size={12} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Buttons / Actions */}
        <div className="space-y-3 relative z-10">
          <Link href="/dashboard/dashboard-overview" className="w-full block">
            <Button className="w-full bg-[#0B1533] text-white hover:bg-[#15234d] dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 py-6 h-auto text-[15px] font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group">
              <span>Go to Dashboard</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          <Link href="/dashboard/new-scenario" className="w-full block">
            <Button variant="outline" className="w-full py-6 h-auto text-[15px] font-medium rounded-full cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-850/40 border-slate-200 dark:border-slate-800">
              Create New Scenario
            </Button>
          </Link>
        </div>
      </div>

      {/* Global page entry animation styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#EEF7FC] dark:bg-[#090D1A]">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 border-4 border-slate-350 border-t-slate-800 dark:border-slate-700 dark:border-t-slate-200 animate-spin rounded-full mx-auto" />
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Verifying transaction...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
