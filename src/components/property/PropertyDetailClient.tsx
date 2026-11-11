"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calculator,
  CalendarCheck,
  Check,
  Heart,
  MapPin,
  Phone,
  Send,
  Share2,
} from "lucide-react";
import type { Property } from "@/types/realtor";
import { REALTOR_PROFILE } from "@/data/content";
import { getRenovationLabel, pickText, translations } from "@/lib/i18n";
import { formatArea, formatUsd, formatUzsApprox } from "@/lib/format";
import { calculateMortgage } from "@/services/mortgage";
import { useLocaleStore } from "@/stores/localeStore";
import { useSavedStore } from "@/stores/savedStore";
import { useToastStore } from "@/stores/toastStore";
import { useHydrated } from "@/hooks/useHydrated";
import { PropertyGalleryCarousel } from "@/components/property/PropertyGalleryCarousel";
import { BookingSheet } from "@/components/booking/BookingSheet";

export function PropertyDetailClient({ property }: { property: Property }) {
  const hydrated = useHydrated();
  const storeLocale = useLocaleStore((s) => s.locale);
  const locale = hydrated ? storeLocale : "uz";
  const t = translations[locale];

  const savedIds = useSavedStore((s) => s.savedIds);
  const toggleSaved = useSavedStore((s) => s.toggleSaved);
  const showToast = useToastStore((s) => s.showToast);

  const [bookingOpen, setBookingOpen] = useState(false);

  const isSaved = hydrated && savedIds.includes(property.id);
  const title = pickText(property.title, locale);
  const district = pickText(property.districtName, locale);
  const address = pickText(property.address, locale);

  const sampleMortgage =
    property.dealType === "sale"
      ? calculateMortgage({
          priceUsd: property.priceUsd,
          downPaymentPct: 20,
          termYears: 15,
          annualRatePct: 18,
        })
      : null;

  const handleToggleSave = () => {
    const added = toggleSaved(property.id);
    showToast(added ? t.toastSavedAdded : t.toastSavedRemoved);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast(t.toastLinkCopied);
    } catch {
      showToast(t.toastLinkCopied);
    }
  };

  return (
    <div className="pb-24">
      {/* Top Action Bar over Gallery */}
      <div className="flex items-center justify-between px-4 py-3">
        <Link
          href="/catalog"
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3 text-xs font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-muted)]"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.backLabel}
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            aria-label={t.shareLabel}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition hover:bg-[var(--bg-muted)] active:scale-95"
          >
            <Share2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleToggleSave}
            aria-pressed={isSaved}
            aria-label={isSaved ? t.saveRemove : t.saveAdd}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition hover:bg-[var(--bg-muted)] active:scale-95"
          >
            <Heart
              className={`h-4.5 w-4.5 ${
                isSaved
                  ? "fill-[var(--accent-warm)] text-[var(--accent-warm)]"
                  : ""
              }`}
            />
          </button>
        </div>
      </div>

      <PropertyGalleryCarousel images={property.images} title={title} />

      <div className="space-y-5 px-4 pt-4">
        {/* Badges + Price + Title */}
        <div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-[var(--text-primary)] px-2.5 py-1 text-[11px] font-semibold text-white">
              {property.dealType === "sale" ? t.dealSale : t.dealRent}
            </span>
            {property.badge && (
              <span className="rounded-full bg-[var(--accent-warm)] px-2.5 py-1 text-[11px] font-semibold text-white">
                {pickText(property.badge, locale)}
              </span>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
            <p className="tabular-nums text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              {formatUsd(property.priceUsd)}
              {property.dealType === "rent" && (
                <span className="ml-1 text-sm font-medium text-[var(--text-secondary)]">
                  {t.perMonth}
                </span>
              )}
            </p>
            <p className="tabular-nums text-xs font-medium text-[var(--text-secondary)]">
              {formatUzsApprox(property.priceUsd, locale)}
            </p>
          </div>

          <h1 className="mt-2 text-lg font-bold leading-snug text-[var(--text-primary)]">
            {title}
          </h1>
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
            <MapPin className="h-4 w-4 shrink-0 text-[var(--accent-warm)]" />
            <span>
              {district} · {address}
            </span>
          </p>
        </div>

        {/* Technical Specs Grid */}
        <section className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
            {t.specsTitle}
          </h2>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-xs text-[var(--text-secondary)]">
                {t.filterRooms}
              </dt>
              <dd className="mt-0.5 font-semibold text-[var(--text-primary)]">
                {property.rooms === 4 ? "4+" : property.rooms} {t.roomsShort}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[var(--text-secondary)]">
                {t.areaLabel}
              </dt>
              <dd className="mt-0.5 tabular-nums font-semibold text-[var(--text-primary)]">
                {formatArea(property.areaSqm, locale)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[var(--text-secondary)]">
                {t.floorLabel}
              </dt>
              <dd className="mt-0.5 tabular-nums font-semibold text-[var(--text-primary)]">
                {property.floor} / {property.totalFloors}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[var(--text-secondary)]">
                {t.renovationLabel}
              </dt>
              <dd className="mt-0.5 font-semibold text-[var(--text-primary)]">
                {getRenovationLabel(property.renovation, locale)}
              </dd>
            </div>
            <div className="col-span-2 border-t border-[var(--border-hairline)] pt-2.5">
              <dt className="text-xs text-[var(--text-secondary)]">
                {t.buildingLabel}
              </dt>
              <dd className="mt-0.5 font-semibold text-[var(--text-primary)]">
                {pickText(property.buildingType, locale)}
              </dd>
            </div>
          </dl>
        </section>

        {/* Description */}
        <section className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
            {t.descriptionTitle}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-primary)]">
            {pickText(property.description, locale)}
          </p>
        </section>

        {/* Amenities */}
        <section className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
            {t.amenitiesTitle}
          </h2>
          <ul className="mt-3 grid grid-cols-1 gap-2">
            {property.amenities.map((amenity, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 text-sm text-[var(--text-primary)]"
              >
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[var(--accent-primary)]">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span>{pickText(amenity, locale)}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Inline Mortgage Preview for Sale Listings */}
        {sampleMortgage && (
          <section className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-muted)] p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-semibold text-[var(--text-secondary)]">
                  {t.inlineCalcTitle}
                </p>
                <p className="mt-1 tabular-nums text-xl font-bold text-[var(--accent-primary)]">
                  {formatUsd(sampleMortgage.monthlyPayment)}{" "}
                  <span className="text-xs font-medium text-[var(--text-secondary)]">
                    {t.perMonth}
                  </span>
                </p>
                <p className="mt-1 text-[11px] text-[var(--text-secondary)]">
                  {t.inlineCalcNote}
                </p>
              </div>
              <Calculator className="h-5 w-5 shrink-0 text-[var(--accent-primary)]" />
            </div>
            <Link
              href={`/guides?price=${property.priceUsd}#calculator`}
              className="mt-3 inline-flex min-h-[40px] items-center rounded-xl bg-[var(--bg-surface)] px-3.5 text-xs font-semibold text-[var(--text-primary)] shadow-xs transition hover:bg-white"
            >
              {t.inlineCalcOpen}
            </Link>
          </section>
        )}

        {/* Realtor Quick Contact */}
        <section className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-3.5">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-[var(--bg-muted)]">
              <Image
                src={REALTOR_PROFILE.avatar}
                alt={REALTOR_PROFILE.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--text-primary)]">
                {REALTOR_PROFILE.name}
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                {t.realtorBarRole}
              </p>
            </div>
          </div>
          <Link
            href="/realtor"
            className="min-h-[38px] rounded-xl border border-[var(--border-hairline)] px-3 text-xs font-semibold leading-[38px] text-[var(--text-primary)] hover:bg-[var(--bg-muted)]"
          >
            {t.navRealtor}
          </Link>
        </section>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed inset-x-0 bottom-16 z-20 mx-auto max-w-[430px] border-t border-[var(--border-hairline)] bg-[var(--bg-surface)]/95 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <a
            href={REALTOR_PROFILE.telegramHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.telegramAction}
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition hover:bg-[var(--bg-muted)] active:scale-95"
          >
            <Send className="h-4.5 w-4.5" />
          </a>
          <a
            href={REALTOR_PROFILE.phoneHref}
            aria-label={t.callAction}
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition hover:bg-[var(--bg-muted)] active:scale-95"
          >
            <Phone className="h-4.5 w-4.5" />
          </a>
          <button
            type="button"
            onClick={() => setBookingOpen(true)}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--accent-primary)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--accent-primary-hover)] active:scale-[0.98]"
          >
            <CalendarCheck className="h-4.5 w-4.5" />
            {t.bookViewingAction}
          </button>
        </div>
      </div>

      <BookingSheet
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        property={property}
      />
    </div>
  );
}
