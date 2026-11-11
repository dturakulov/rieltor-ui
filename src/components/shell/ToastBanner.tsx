"use client";

import { CheckCircle2, X } from "lucide-react";
import { useToastStore } from "@/stores/toastStore";
import { translations } from "@/lib/i18n";
import { useLocaleStore } from "@/stores/localeStore";
import { useHydrated } from "@/hooks/useHydrated";

export function ToastBanner() {
  const message = useToastStore((s) => s.message);
  const hideToast = useToastStore((s) => s.hideToast);
  const hydrated = useHydrated();
  const storeLocale = useLocaleStore((s) => s.locale);
  const locale = hydrated ? storeLocale : "uz";
  const t = translations[locale];

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-20 z-40 mx-auto flex max-w-[430px] justify-center px-4"
    >
      <div className="pointer-events-auto flex w-full items-center justify-between gap-2.5 rounded-2xl bg-[var(--text-primary)] px-3.5 py-2.5 text-sm font-medium text-white shadow-lg">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>{message}</span>
        </div>
        <button
          type="button"
          onClick={hideToast}
          aria-label={t.closeLabel}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-zinc-300 transition hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
