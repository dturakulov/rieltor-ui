"use client";

import Link from "next/link";
import { Heart, Building2 } from "lucide-react";
import { translations } from "@/lib/i18n";
import { useLocaleStore } from "@/stores/localeStore";
import { useSavedStore } from "@/stores/savedStore";
import { useBookingStore } from "@/stores/bookingStore";
import { useHydrated } from "@/hooks/useHydrated";

export function TopHeader() {
  const hydrated = useHydrated();
  const storeLocale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);
  const savedCount = useSavedStore((s) => s.savedIds.length);
  const bookingsCount = useBookingStore((s) => s.bookings.length);

  const locale = hydrated ? storeLocale : "uz";
  const t = translations[locale];
  const badgeCount = hydrated ? savedCount + bookingsCount : 0;

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]/95 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-lg py-1 transition active:scale-[0.98]"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent-primary)] text-white shadow-sm transition group-hover:bg-[var(--accent-primary-hover)]">
            <Building2 className="h-4.5 w-4.5" />
          </span>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight text-[var(--text-primary)]">
              {t.brandName}
            </span>
            <span className="text-[11px] font-medium text-[var(--text-secondary)]">
              {t.realtorShort} · Estate
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label={t.langToggleLabel}
            className="inline-flex items-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-muted)] p-0.5"
          >
            <button
              type="button"
              onClick={() => setLocale("uz")}
              aria-pressed={locale === "uz"}
              className={`min-h-[34px] rounded-full px-2.5 text-xs font-semibold transition ${
                locale === "uz"
                  ? "bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              UZ
            </button>
            <button
              type="button"
              onClick={() => setLocale("ru")}
              aria-pressed={locale === "ru"}
              className={`min-h-[34px] rounded-full px-2.5 text-xs font-semibold transition ${
                locale === "ru"
                  ? "bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              RU
            </button>
          </div>

          <Link
            href="/saved"
            aria-label={t.savedLinkLabel}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition hover:border-[var(--border-strong)] active:scale-95"
          >
            <Heart
              className={`h-4.5 w-4.5 ${
                hydrated && savedCount > 0
                  ? "fill-[var(--accent-warm)] text-[var(--accent-warm)]"
                  : ""
              }`}
            />
            {badgeCount > 0 && (
              <span className="tabular-nums absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--accent-primary)] px-1 text-[10px] font-bold text-white">
                {badgeCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
