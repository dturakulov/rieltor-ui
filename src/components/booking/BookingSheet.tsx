"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, CheckCircle2, Clock } from "lucide-react";
import type { Locale, Property } from "@/types/realtor";
import { pickText, translations } from "@/lib/i18n";
import {
  normalizeUzPhone,
  validateBookingInput,
  type BookingFieldErrorKey,
} from "@/lib/validation";
import { useLocaleStore } from "@/stores/localeStore";
import { useBookingStore } from "@/stores/bookingStore";
import { useToastStore } from "@/stores/toastStore";
import { useHydrated } from "@/hooks/useHydrated";
import { BottomSheet } from "@/components/ui/BottomSheet";

interface BookingSheetProps {
  open: boolean;
  onClose: () => void;
  property?: Property;
}

const TIME_SLOTS = ["10:00", "13:00", "16:00", "18:30"];

function getTomorrowIsoDate(): string {
  const date = new Date(Date.now() + 86_400_000);
  return date.toISOString().slice(0, 10);
}

function BookingSheetForm({
  locale,
  property,
  onClose,
}: {
  locale: Locale;
  property?: Property;
  onClose: () => void;
}) {
  const t = translations[locale];
  const addBooking = useBookingStore((s) => s.addBooking);
  const showToast = useToastStore((s) => s.showToast);

  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [preferredDate, setPreferredDate] = useState(() => getTomorrowIsoDate());
  const [preferredTime, setPreferredTime] = useState("16:00");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<
    Partial<Record<"clientName" | "phone" | "preferredDate" | "preferredTime", BookingFieldErrorKey>>
  >({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateBookingInput({
      clientName,
      phone,
      preferredDate,
      preferredTime,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const normalizedPhone = normalizeUzPhone(phone) ?? phone.trim();
    addBooking({
      propertySlug: property?.slug,
      propertyTitle: property?.title,
      clientName: clientName.trim(),
      phone: normalizedPhone,
      preferredDate,
      preferredTime,
      note: note.trim() || undefined,
    });

    showToast(t.toastBookingCreated);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="space-y-4 py-3 text-center">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-[var(--accent-primary)]">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="text-lg font-bold text-[var(--text-primary)]">
          {t.bookingSuccessTitle}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
          {t.bookingSuccessBody}
        </p>
        <div className="grid grid-cols-2 gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[48px] rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-muted)]"
          >
            {t.bookingClose}
          </button>
          <Link
            href="/saved?tab=bookings"
            onClick={onClose}
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[var(--accent-primary)] px-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-primary-hover)]"
          >
            {t.bookingSuccessCta}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4 pb-2">
      <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
        {t.bookingSubtitle}
      </p>

      {property && (
        <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3.5 py-2.5">
          <p className="text-xs font-medium text-[var(--accent-warm)]">
            {pickText(property.districtName, locale)}
          </p>
          <p className="line-clamp-1 text-sm font-semibold text-[var(--text-primary)]">
            {pickText(property.title, locale)}
          </p>
        </div>
      )}

      <div>
        <label
          htmlFor="booking-name"
          className="mb-1.5 block text-xs font-semibold text-[var(--text-primary)]"
        >
          {t.bookingNameLabel}
        </label>
        <input
          id="booking-name"
          type="text"
          value={clientName}
          onChange={(e) => {
            setClientName(e.target.value);
            if (errors.clientName) {
              setErrors((prev) => ({ ...prev, clientName: undefined }));
            }
          }}
          placeholder={t.bookingNamePlaceholder}
          className="min-h-[48px] w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3.5 text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
        />
        {errors.clientName && (
          <p className="mt-1 text-xs font-medium text-[var(--semantic-danger)]">
            {t[errors.clientName]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="booking-phone"
          className="mb-1.5 block text-xs font-semibold text-[var(--text-primary)]"
        >
          {t.bookingPhoneLabel}
        </label>
        <input
          id="booking-phone"
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            if (errors.phone) {
              setErrors((prev) => ({ ...prev, phone: undefined }));
            }
          }}
          placeholder={t.bookingPhonePlaceholder}
          className="min-h-[48px] w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3.5 text-base tabular-nums text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
        />
        {errors.phone && (
          <p className="mt-1 text-xs font-medium text-[var(--semantic-danger)]">
            {t[errors.phone]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="booking-date"
          className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[var(--text-primary)]"
        >
          <Calendar className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
          {t.bookingDateLabel}
        </label>
        <input
          id="booking-date"
          type="date"
          value={preferredDate}
          onChange={(e) => {
            setPreferredDate(e.target.value);
            if (errors.preferredDate) {
              setErrors((prev) => ({ ...prev, preferredDate: undefined }));
            }
          }}
          className="min-h-[48px] w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3.5 text-base tabular-nums text-[var(--text-primary)]"
        />
        {errors.preferredDate && (
          <p className="mt-1 text-xs font-medium text-[var(--semantic-danger)]">
            {t[errors.preferredDate]}
          </p>
        )}
      </div>

      <div>
        <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[var(--text-primary)]">
          <Clock className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
          {t.bookingTimeLabel}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => {
                setPreferredTime(slot);
                if (errors.preferredTime) {
                  setErrors((prev) => ({ ...prev, preferredTime: undefined }));
                }
              }}
              className={`min-h-[44px] rounded-xl border text-xs font-semibold tabular-nums transition active:scale-95 ${
                preferredTime === slot
                  ? "border-[var(--accent-primary)] bg-[var(--accent-primary)] text-white"
                  : "border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
        {errors.preferredTime && (
          <p className="mt-1 text-xs font-medium text-[var(--semantic-danger)]">
            {t[errors.preferredTime]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="booking-note"
          className="mb-1.5 block text-xs font-semibold text-[var(--text-primary)]"
        >
          {t.bookingNoteLabel}
        </label>
        <textarea
          id="booking-note"
          rows={2}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={t.bookingNotePlaceholder}
          className="w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3.5 py-2.5 text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
        />
      </div>

      <button
        type="submit"
        className="min-h-[50px] w-full rounded-xl bg-[var(--accent-primary)] text-sm font-semibold text-white transition hover:bg-[var(--accent-primary-hover)] active:scale-[0.99]"
      >
        {t.bookingSubmit}
      </button>
    </form>
  );
}

export function BookingSheet({ open, onClose, property }: BookingSheetProps) {
  const hydrated = useHydrated();
  const storeLocale = useLocaleStore((s) => s.locale);
  const locale = hydrated ? storeLocale : "uz";
  const t = translations[locale];

  return (
    <BottomSheet open={open} onClose={onClose} title={t.bookingTitle}>
      {open && (
        <BookingSheetForm
          key={`${property?.id ?? "general"}-${locale}`}
          locale={locale}
          property={property}
          onClose={onClose}
        />
      )}
    </BottomSheet>
  );
}
