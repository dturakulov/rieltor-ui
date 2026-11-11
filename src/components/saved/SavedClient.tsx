"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Calendar, Clock, Heart, Phone } from "lucide-react";
import { listProperties } from "@/lib/propertyRepository";
import { pickText, translations } from "@/lib/i18n";
import { useLocaleStore } from "@/stores/localeStore";
import { useSavedStore } from "@/stores/savedStore";
import { useBookingStore } from "@/stores/bookingStore";
import { useHydrated } from "@/hooks/useHydrated";
import { PropertyCard } from "@/components/property/PropertyCard";

export function SavedClient() {
  const searchParams = useSearchParams();
  const hydrated = useHydrated();
  const storeLocale = useLocaleStore((s) => s.locale);
  const locale = hydrated ? storeLocale : "uz";
  const t = translations[locale];

  const savedIds = useSavedStore((s) => s.savedIds);
  const bookings = useBookingStore((s) => s.bookings);

  const initialTab =
    searchParams.get("tab") === "bookings" ? "bookings" : "favorites";
  const [tabOverride, setTabOverride] = useState<"favorites" | "bookings" | null>(
    null,
  );
  const activeTab = tabOverride ?? initialTab;

  const allProperties = listProperties();
  const savedProperties = hydrated
    ? allProperties.filter((p) => savedIds.includes(p.id))
    : [];
  const visibleBookings = hydrated ? bookings : [];

  return (
    <div className="space-y-4 px-4 pb-8 pt-4">
      <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
        {t.savedPageTitle}
      </h1>

      <div className="grid grid-cols-2 gap-1.5 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-muted)] p-1">
        <button
          type="button"
          onClick={() => setTabOverride("favorites")}
          aria-pressed={activeTab === "favorites"}
          className={`min-h-[42px] rounded-xl px-2 text-xs font-semibold transition ${
            activeTab === "favorites"
              ? "bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-xs"
              : "text-[var(--text-secondary)]"
          }`}
        >
          {t.savedTabFavorites} ({savedProperties.length})
        </button>
        <button
          type="button"
          onClick={() => setTabOverride("bookings")}
          aria-pressed={activeTab === "bookings"}
          className={`min-h-[42px] rounded-xl px-2 text-xs font-semibold transition ${
            activeTab === "bookings"
              ? "bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-xs"
              : "text-[var(--text-secondary)]"
          }`}
        >
          {t.savedTabBookings} ({visibleBookings.length})
        </button>
      </div>

      {activeTab === "favorites" ? (
        savedProperties.length === 0 ? (
          <div className="rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 text-center">
            <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--bg-muted)] text-[var(--accent-warm)]">
              <Heart className="h-6 w-6" />
            </span>
            <p className="mt-3 text-base font-bold text-[var(--text-primary)]">
              {t.savedEmptyTitle}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)]">
              {t.savedEmptyBody}
            </p>
            <Link
              href="/catalog"
              className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[var(--accent-primary)] px-5 text-xs font-semibold text-white transition hover:bg-[var(--accent-primary-hover)]"
            >
              {t.goCatalogCta}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {savedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )
      ) : visibleBookings.length === 0 ? (
        <div className="rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 text-center">
          <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--bg-muted)] text-[var(--accent-primary)]">
            <Calendar className="h-6 w-6" />
          </span>
          <p className="mt-3 text-base font-bold text-[var(--text-primary)]">
            {t.bookingsEmptyTitle}
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)]">
            {t.bookingsEmptyBody}
          </p>
          <Link
            href="/catalog"
            className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[var(--accent-primary)] px-5 text-xs font-semibold text-white transition hover:bg-[var(--accent-primary-hover)]"
          >
            {t.goCatalogCta}
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {visibleBookings.map((booking) => (
            <article
              key={booking.id}
              className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-[var(--accent-primary)]">
                  {t.bookingStatusBadge}
                </span>
                <span className="tabular-nums text-[11px] text-[var(--text-secondary)]">
                  {booking.preferredDate}
                </span>
              </div>

              {booking.propertyTitle && (
                <Link
                  href={
                    booking.propertySlug
                      ? `/property/${booking.propertySlug}`
                      : "/catalog"
                  }
                  className="mt-2 block text-sm font-bold text-[var(--text-primary)] hover:underline"
                >
                  {pickText(booking.propertyTitle, locale)}
                </Link>
              )}

              <div className="mt-2.5 space-y-1 text-xs text-[var(--text-secondary)]">
                <p className="font-semibold text-[var(--text-primary)]">
                  {booking.clientName}
                </p>
                <p className="flex items-center gap-1.5 tabular-nums">
                  <Phone className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                  {booking.phone}
                </p>
                <p className="flex items-center gap-1.5 tabular-nums">
                  <Clock className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
                  {booking.preferredDate} · {booking.preferredTime}
                </p>
                {booking.note && (
                  <p className="pt-1 italic text-[var(--text-secondary)]">
                    &ldquo;{booking.note}&rdquo;
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
