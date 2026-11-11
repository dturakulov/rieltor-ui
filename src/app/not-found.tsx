"use client";

import Link from "next/link";
import { Compass } from "lucide-react";
import { translations } from "@/lib/i18n";
import { useLocaleStore } from "@/stores/localeStore";
import { useHydrated } from "@/hooks/useHydrated";

export default function NotFound() {
  const hydrated = useHydrated();
  const storeLocale = useLocaleStore((s) => s.locale);
  const locale = hydrated ? storeLocale : "uz";
  const t = translations[locale];

  return (
    <div className="flex min-h-[70dvh] flex-col items-center justify-center px-6 text-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--bg-muted)] text-[var(--accent-primary)]">
        <Compass className="h-7 w-7" />
      </span>
      <h1 className="mt-4 text-xl font-bold text-[var(--text-primary)]">
        {t.notFoundTitle}
      </h1>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-[var(--text-secondary)]">
        {t.notFoundBody}
      </p>
      <Link
        href="/"
        className="mt-5 inline-flex min-h-[46px] items-center justify-center rounded-xl bg-[var(--accent-primary)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--accent-primary-hover)]"
      >
        {t.notFoundCta}
      </Link>
    </div>
  );
}
