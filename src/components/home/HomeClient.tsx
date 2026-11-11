"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Calculator,
  CalendarCheck,
  Search,
  ShieldCheck,
  Quote,
} from "lucide-react";
import {
  REALTOR_PROFILE,
  SERVICES,
  TESTIMONIALS,
} from "@/data/content";
import { listFeaturedProperties } from "@/lib/propertyRepository";
import { pickText, translations } from "@/lib/i18n";
import { useLocaleStore } from "@/stores/localeStore";
import { useHydrated } from "@/hooks/useHydrated";
import { PropertyCard } from "@/components/property/PropertyCard";
import { BookingSheet } from "@/components/booking/BookingSheet";

export function HomeClient() {
  const router = useRouter();
  const hydrated = useHydrated();
  const storeLocale = useLocaleStore((s) => s.locale);
  const locale = hydrated ? storeLocale : "uz";
  const t = translations[locale];

  const [searchQuery, setSearchQuery] = useState("");
  const [bookingOpen, setBookingOpen] = useState(false);

  const featuredProperties = listFeaturedProperties(4);

  const quickChips = [
    { label: t.chip1Room, href: "/catalog?rooms=1" },
    { label: t.chip2Rooms, href: "/catalog?rooms=2" },
    { label: t.chip3Rooms, href: "/catalog?rooms=3" },
    { label: t.chip4Rooms, href: "/catalog?rooms=4" },
    { label: t.chipSale, href: "/catalog?dealType=sale" },
    { label: t.chipRent, href: "/catalog?dealType=rent" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    router.push(
      trimmed
        ? `/catalog?q=${encodeURIComponent(trimmed)}`
        : "/catalog",
    );
  };

  return (
    <div className="space-y-6 px-4 pb-8 pt-4">
      {/* Realtor Hero Card */}
      <section className="overflow-hidden rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-muted)]">
            <Image
              src={REALTOR_PROFILE.avatar}
              alt={REALTOR_PROFILE.name}
              fill
              sizes="64px"
              priority
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--accent-warm)]">
              {t.heroEyebrow}
            </p>
            <p className="mt-0.5 truncate text-base font-bold text-[var(--text-primary)]">
              {REALTOR_PROFILE.name}
            </p>
            <p className="truncate text-xs text-[var(--text-secondary)]">
              {pickText(REALTOR_PROFILE.role, locale)}
            </p>
          </div>
        </div>

        <h1 className="mt-4 text-xl font-bold leading-snug tracking-tight text-[var(--text-primary)]">
          {t.heroTitle}
        </h1>
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
          {t.heroSubtitle}
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

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setBookingOpen(true)}
            className="inline-flex min-h-[46px] items-center justify-center gap-1.5 rounded-xl bg-[var(--accent-primary)] px-3 text-xs font-semibold text-white transition hover:bg-[var(--accent-primary-hover)] active:scale-[0.98]"
          >
            <CalendarCheck className="h-4 w-4" />
            {t.heroBookCta}
          </button>
          <Link
            href="/catalog"
            className="inline-flex min-h-[46px] items-center justify-center gap-1.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3 text-xs font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-muted)] active:scale-[0.98]"
          >
            {t.heroCatalogCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Search & Quick Filter Chips */}
      <section className="space-y-3">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchPlaceholder}
              className="min-h-[46px] w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] pl-10 pr-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
            />
          </div>
          <button
            type="submit"
            className="min-h-[46px] shrink-0 rounded-xl bg-[var(--text-primary)] px-4 text-xs font-semibold text-white transition hover:opacity-90 active:scale-[0.98]"
          >
            {t.searchBtn}
          </button>
        </form>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
            {t.quickFilterTitle}
          </p>
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
            {quickChips.map((chip) => (
              <Link
                key={chip.href}
                href={chip.href}
                className="inline-flex min-h-[40px] shrink-0 items-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3.5 text-xs font-semibold text-[var(--text-primary)] transition hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] active:scale-95"
              >
                {chip.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
            {t.featuredTitle}
          </h2>
          <Link
            href="/catalog"
            className="inline-flex min-h-[36px] items-center gap-1 text-xs font-semibold text-[var(--accent-primary)] hover:underline"
          >
            {t.viewAll}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="space-y-4">
          {featuredProperties.map((property, idx) => (
            <PropertyCard
              key={property.id}
              property={property}
              priority={idx === 0}
            />
          ))}
        </div>
      </section>

      {/* Calculator Promo Banner */}
      <section className="rounded-3xl bg-[var(--accent-primary)] p-5 text-white shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-200">
              {t.calcBannerEyebrow}
            </p>
            <h2 className="mt-1 text-base font-bold leading-snug">
              {t.calcBannerTitle}
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-emerald-100/90">
              {t.calcBannerSubtitle}
            </p>
          </div>
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15">
            <Calculator className="h-5 w-5 text-white" />
          </span>
        </div>
        <Link
          href="/guides#calculator"
          className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-white px-4 text-xs font-bold text-[var(--accent-primary)] transition hover:bg-emerald-50 active:scale-[0.98]"
        >
          {t.calcBannerCta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Services Summary */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
            {t.servicesTitle}
          </h2>
          <Link
            href="/realtor"
            className="inline-flex min-h-[36px] items-center gap-1 text-xs font-semibold text-[var(--accent-primary)] hover:underline"
          >
            {t.viewAll}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {SERVICES.slice(0, 3).map((srv) => (
            <div
              key={srv.id}
              className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-3.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--accent-primary)]" />
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                    {pickText(srv.title, locale)}
                  </h3>
                </div>
                <span className="shrink-0 rounded-full bg-[var(--bg-muted)] px-2 py-0.5 text-[11px] font-medium text-[var(--text-secondary)]">
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

      {/* Testimonials Strip */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
          {t.testimonialsTitle}
        </h2>
        <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
          {TESTIMONIALS.map((item) => (
            <article
              key={item.id}
              className="w-[290px] shrink-0 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4"
            >
              <Quote className="h-4 w-4 text-[var(--accent-warm)]" />
              <p className="mt-2 text-xs leading-relaxed text-[var(--text-primary)]">
                &ldquo;{pickText(item.quote, locale)}&rdquo;
              </p>
              <div className="mt-3 border-t border-[var(--border-hairline)] pt-2.5">
                <p className="text-xs font-bold text-[var(--text-primary)]">
                  {item.clientName}
                </p>
                <p className="text-[11px] text-[var(--text-secondary)]">
                  {pickText(item.dealSummary, locale)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5 text-center">
        <h2 className="text-base font-bold text-[var(--text-primary)]">
          {t.homeFinalTitle}
        </h2>
        <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)]">
          {t.homeFinalSubtitle}
        </p>
        <button
          type="button"
          onClick={() => setBookingOpen(true)}
          className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent-primary)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--accent-primary-hover)] active:scale-[0.99]"
        >
          <CalendarCheck className="h-4 w-4" />
          {t.heroBookCta}
        </button>
      </section>

      <BookingSheet open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
