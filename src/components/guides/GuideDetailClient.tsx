"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarCheck, Check, Clock } from "lucide-react";
import type { GuideArticle } from "@/types/realtor";
import { pickText, translations } from "@/lib/i18n";
import { useLocaleStore } from "@/stores/localeStore";
import { useHydrated } from "@/hooks/useHydrated";
import { BookingSheet } from "@/components/booking/BookingSheet";

export function GuideDetailClient({ article }: { article: GuideArticle }) {
  const hydrated = useHydrated();
  const storeLocale = useLocaleStore((s) => s.locale);
  const locale = hydrated ? storeLocale : "uz";
  const t = translations[locale];

  const [bookingOpen, setBookingOpen] = useState(false);

  const title = pickText(article.title, locale);

  return (
    <article className="space-y-5 px-4 pb-8 pt-4">
      <div className="flex items-center justify-between">
        <Link
          href="/guides"
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-muted)]"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.backLabel}
        </Link>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--text-secondary)]">
          <Clock className="h-3.5 w-3.5 text-[var(--accent-warm)]" />
          {article.readTimeMin} {t.readTimeSuffix}
        </span>
      </div>

      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[var(--bg-muted)]">
        <Image
          src={article.coverImage}
          alt={title}
          fill
          sizes="(max-width: 430px) 100vw, 430px"
          priority
          className="object-cover"
        />
      </div>

      <div>
        <h1 className="text-xl font-bold leading-snug tracking-tight text-[var(--text-primary)]">
          {title}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
          {pickText(article.excerpt, locale)}
        </p>
      </div>

      <div className="space-y-4">
        {article.sections.map((section, idx) => (
          <section
            key={idx}
            className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4"
          >
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              {pickText(section.heading, locale)}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              {pickText(section.body, locale)}
            </p>
            {section.bullets && section.bullets.length > 0 && (
              <ul className="mt-3 space-y-2">
                {section.bullets.map((bullet, bIdx) => (
                  <li
                    key={bIdx}
                    className="flex items-start gap-2 text-sm text-[var(--text-primary)]"
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[var(--accent-primary)]">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{pickText(bullet, locale)}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <section className="rounded-3xl bg-[var(--accent-primary)] p-5 text-white">
        <h2 className="text-base font-bold">{t.guideCtaTitle}</h2>
        <p className="mt-1.5 text-xs leading-relaxed text-emerald-100/90">
          {t.guideCtaBody}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setBookingOpen(true)}
            className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-white px-3 text-xs font-bold text-[var(--accent-primary)] transition hover:bg-emerald-50"
          >
            <CalendarCheck className="h-4 w-4" />
            {t.heroBookCta}
          </button>
          <Link
            href="/catalog"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/30 px-3 text-xs font-semibold text-white hover:bg-white/10"
          >
            {t.heroCatalogCta}
          </Link>
        </div>
      </section>

      <BookingSheet open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </article>
  );
}
