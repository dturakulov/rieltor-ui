"use client";

import { TopHeader } from "@/components/shell/TopHeader";
import { BottomNav } from "@/components/shell/BottomNav";
import { ToastBanner } from "@/components/shell/ToastBanner";

export function MobileAppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh w-full bg-[var(--bg-backdrop)] sm:flex sm:justify-center">
      <div className="relative flex min-h-dvh w-full max-w-[430px] flex-col overflow-x-clip bg-[var(--bg-canvas)] sm:border-x sm:border-[var(--border-hairline)] sm:shadow-[0_0_48px_rgba(24,24,27,0.08)]">
        <TopHeader />
        <main className="flex-1">{children}</main>
        <ToastBanner />
        <BottomNav />
      </div>
    </div>
  );
}
