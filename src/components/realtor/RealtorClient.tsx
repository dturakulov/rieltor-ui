"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CalendarCheck,
  Check,
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  Quote,
  Send,
  ShieldCheck,
} from "lucide-react";
import {
  FAQS,
  REALTOR_PROFILE,
  SERVICES,
  TESTIMONIALS,
  WORKFLOW_STEPS,
} from "@/data/content";
import { pickText, translations } from "@/lib/i18n";
import { useLocaleStore } from "@/stores/localeStore";
import { useHydrated } from "@/hooks/useHydrated";
import { BookingSheet } from "@/components/booking/BookingSheet";

export function RealtorClient() {
  const hydrated = useHydrated();
  const storeLocale = useLocaleStore((s) => s.locale);
  const locale = hydrated ? storeLocale : "uz";
  const t = translations[locale];

  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS[0]?.id ?? null);
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="space-y-6 px-4 pb-8 pt-4">
      {/* Profile Hero */}
      <section className="rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-muted)]">
            <Image
              src={REALTOR_PROFILE.avatar}
              alt={REALTOR_PROFILE.name}
              fill
              sizes="80px"
              priority
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--accent-warm)]">
              {REALTOR_PROFILE.brand}
            </p>
            <h1 className="mt-0.5 text-lg font-bold text-[var(--text-primary)]">
              {REALTOR_PROFILE.name}
            </h1>
            <p className="text-xs text-[var(--text-secondary)]">
              {pickText(REALTOR_PROFILE.role, locale)}
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-[var(--text-secondary)]">
              <MapPin className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
              {pickText(REALTOR_PROFILE.city, locale)}
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
          {pickText(REALTOR_PROFILE.bio, locale)}
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-[var(--bg-muted)] p-3 text-center">
          <div>
            <p className="tabular-nums text-base font-bold text-[var(--text-primary)]">
              {REALTOR_PROFILE.experienceYears}+
            </p>
            <p className="text-[11px] text-[var(--text-secondary)]">
              {t.statYears}
            </p>
          </div>
          <div className="border-x border-[var(--border-hairline)]">
            <p className="tabular-nums text-base font-bold text-[var(--text-primary)]">
              {REALTOR_PROFILE.dealsClosed}+
            </p>
            <p className="text-[11px] text-[var(--text-secondary)]">
              {t.statDeals}
            </p>
          </div>
          <div>
            <p className="tabular-nums text-base font-bold text-[var(--accent-primary)]">
              {REALTOR_PROFILE.satisfactionPct}%
            </p>
            <p className="text-[11px] text-[var(--text-secondary)]">
              {t.statTrust}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setBookingOpen(true)}
          className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent-primary)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--accent-primary-hover)] active:scale-[0.99]"
        >
          <CalendarCheck className="h-4.5 w-4.5" />
          {t.heroBookCta}
        </button>
      </section>

      {/* Credentials */}
      <section className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4">
        <h2 className="text-base font-bold text-[var(--text-primary)]">
          {t.realtorCredentialsTitle}
        </h2>
        <ul className="mt-3 space-y-2.5">
          {REALTOR_PROFILE.credentials.map((cred, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 text-sm text-[var(--text-primary)]"
            >
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[var(--accent-primary)]">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span>{pickText(cred, locale)}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* All Services */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
          {t.servicesTitle}
        </h2>
        <div className="space-y-2.5">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4.5 w-4.5 shrink-0 text-[var(--accent-primary)]" />
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">
                    {pickText(srv.title, locale)}
                  </h3>
                </div>
                <span className="shrink-0 rounded-full bg-[var(--bg-muted)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--text-secondary)]">
                  {pickText(srv.durationLabel, locale)}
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)]">
                {pickText(srv.description, locale)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
          {t.realtorWorkflowTitle}
        </h2>
        <div className="space-y-2.5">
          {WORKFLOW_STEPS.map((item) => (
            <div
              key={item.step}
              className="flex gap-3 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4"
            >
              <span className="tabular-nums inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-primary)]/10 text-xs font-bold text-[var(--accent-primary)]">
                {item.step}
              </span>
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  {pickText(item.title, locale)}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {pickText(item.description, locale)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
          {t.testimonialsTitle}
        </h2>
        <div className="space-y-2.5">
          {TESTIMONIALS.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4"
            >
              <Quote className="h-4 w-4 text-[var(--accent-warm)]" />
              <p className="mt-2 text-xs leading-relaxed text-[var(--text-primary)]">
                &ldquo;{pickText(item.quote, locale)}&rdquo;
              </p>
              <p className="mt-2.5 text-xs font-bold text-[var(--text-primary)]">
                {item.clientName}{" "}
                <span className="font-normal text-[var(--text-secondary)]">
                  · {pickText(item.dealSummary, locale)}
                </span>
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
          {t.realtorFaqTitle}
        </h2>
        <div className="space-y-2">
          {FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="flex min-h-[48px] w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-[var(--text-primary)]"
                >
                  <span>{pickText(faq.question, locale)}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-[var(--text-secondary)] transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-[var(--border-hairline)] px-4 py-3 text-xs leading-relaxed text-[var(--text-secondary)]">
                    {pickText(faq.answer, locale)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Direct Contact */}
      <section className="rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4">
        <h2 className="text-base font-bold text-[var(--text-primary)]">
          {t.realtorContactTitle}
        </h2>
        <div className="mt-3 space-y-2">
          <a
            href={REALTOR_PROFILE.phoneHref}
            className="flex min-h-[46px] items-center gap-3 rounded-xl border border-[var(--border-hairline)] px-3.5 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-muted)]"
          >
            <Phone className="h-4 w-4 text-[var(--accent-primary)]" />
            <span className="tabular-nums">{REALTOR_PROFILE.phoneDisplay}</span>
          </a>
          <a
            href={REALTOR_PROFILE.telegramHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[46px] items-center gap-3 rounded-xl border border-[var(--border-hairline)] px-3.5 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-muted)]"
          >
            <Send className="h-4 w-4 text-[var(--accent-primary)]" />
            <span>{REALTOR_PROFILE.telegramHandle}</span>
          </a>
          <a
            href={`mailto:${REALTOR_PROFILE.email}`}
            className="flex min-h-[46px] items-center gap-3 rounded-xl border border-[var(--border-hairline)] px-3.5 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-muted)]"
          >
            <Mail className="h-4 w-4 text-[var(--accent-primary)]" />
            <span>{REALTOR_PROFILE.email}</span>
          </a>
        </div>
      </section>

      <BookingSheet open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
