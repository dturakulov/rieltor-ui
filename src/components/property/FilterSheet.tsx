"use client";

import { useState } from "react";
import type {
  DistrictId,
  Locale,
  PropertyFilter,
  RenovationType,
  RoomCount,
} from "@/types/realtor";
import { pickText, translations } from "@/lib/i18n";
import { listDistricts } from "@/lib/propertyRepository";
import { useLocaleStore } from "@/stores/localeStore";
import { useHydrated } from "@/hooks/useHydrated";
import { BottomSheet } from "@/components/ui/BottomSheet";

interface FilterSheetProps {
  open: boolean;
  onClose: () => void;
  value: PropertyFilter;
  onApply: (next: PropertyFilter) => void;
  onReset: () => void;
}

const ROOM_OPTIONS: { value: RoomCount; labelKey: "chip1Room" | "chip2Rooms" | "chip3Rooms" | "chip4Rooms" }[] = [
  { value: 1, labelKey: "chip1Room" },
  { value: 2, labelKey: "chip2Rooms" },
  { value: 3, labelKey: "chip3Rooms" },
  { value: 4, labelKey: "chip4Rooms" },
];

const RENOVATION_OPTIONS: (RenovationType | "all")[] = [
  "all",
  "designer",
  "euro",
  "cosmetic",
  "box",
];

function FilterSheetForm({
  initialValue,
  locale,
  onApply,
  onReset,
  onClose,
}: {
  initialValue: PropertyFilter;
  locale: Locale;
  onApply: (next: PropertyFilter) => void;
  onReset: () => void;
  onClose: () => void;
}) {
  const t = translations[locale];
  const districts = listDistricts();

  const [dealType, setDealType] = useState<PropertyFilter["dealType"]>(
    initialValue.dealType ?? "all",
  );
  const [rooms, setRooms] = useState<RoomCount[]>(initialValue.rooms ?? []);
  const [selectedDistricts, setSelectedDistricts] = useState<DistrictId[]>(
    initialValue.districts ?? [],
  );
  const [renovation, setRenovation] = useState<RenovationType | "all">(
    initialValue.renovation ?? "all",
  );
  const [minUsd, setMinUsd] = useState(
    initialValue.minUsd !== undefined ? String(initialValue.minUsd) : "",
  );
  const [maxUsd, setMaxUsd] = useState(
    initialValue.maxUsd !== undefined ? String(initialValue.maxUsd) : "",
  );

  const toggleRoom = (r: RoomCount) => {
    setRooms((prev) =>
      prev.includes(r) ? prev.filter((item) => item !== r) : [...prev, r],
    );
  };

  const toggleDistrict = (id: DistrictId) => {
    setSelectedDistricts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedMin = minUsd.trim() ? Number(minUsd) : undefined;
    const parsedMax = maxUsd.trim() ? Number(maxUsd) : undefined;
    onApply({
      ...initialValue,
      dealType,
      rooms: rooms.length > 0 ? rooms : undefined,
      districts: selectedDistricts.length > 0 ? selectedDistricts : undefined,
      renovation,
      minUsd:
        parsedMin !== undefined && Number.isFinite(parsedMin) && parsedMin >= 0
          ? parsedMin
          : undefined,
      maxUsd:
        parsedMax !== undefined && Number.isFinite(parsedMax) && parsedMax >= 0
          ? parsedMax
          : undefined,
    });
    onClose();
  };

  const handleReset = () => {
    onReset();
    onClose();
  };

  const renovationLabel = (opt: RenovationType | "all") => {
    switch (opt) {
      case "all":
        return t.renovationAll;
      case "euro":
        return t.renovationEuro;
      case "designer":
        return t.renovationDesigner;
      case "cosmetic":
        return t.renovationCosmetic;
      case "box":
        return t.renovationBox;
    }
  };

  return (
    <form onSubmit={handleApply} className="space-y-5 pb-2">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
          {t.filterDealType}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {(["all", "sale", "rent"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setDealType(type)}
              className={`min-h-[44px] rounded-xl border px-3 text-sm font-semibold transition active:scale-[0.98] ${
                dealType === type
                  ? "border-[var(--accent-primary)] bg-[var(--accent-primary)] text-white"
                  : "border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
              }`}
            >
              {type === "all"
                ? t.dealAll
                : type === "sale"
                  ? t.dealSale
                  : t.dealRent}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
          {t.filterRooms}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {ROOM_OPTIONS.map((opt) => {
            const active = rooms.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggleRoom(opt.value)}
                aria-pressed={active}
                className={`min-h-[44px] rounded-xl border px-2 text-xs font-semibold transition active:scale-[0.98] ${
                  active
                    ? "border-[var(--accent-primary)] bg-[var(--accent-primary)] text-white"
                    : "border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
                }`}
              >
                {t[opt.labelKey]}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
          {t.filterDistricts}
        </p>
        <div className="flex flex-wrap gap-2">
          {districts.map((d) => {
            const active = selectedDistricts.includes(d.id);
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => toggleDistrict(d.id)}
                aria-pressed={active}
                className={`min-h-[40px] rounded-full border px-3.5 text-xs font-semibold transition active:scale-[0.98] ${
                  active
                    ? "border-[var(--accent-primary)] bg-[var(--accent-primary)] text-white"
                    : "border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
                }`}
              >
                {pickText(d.name, locale)}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
          {t.filterRenovation}
        </p>
        <div className="flex flex-wrap gap-2">
          {RENOVATION_OPTIONS.map((opt) => {
            const active = renovation === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => setRenovation(opt)}
                className={`min-h-[40px] rounded-full border px-3.5 text-xs font-semibold transition active:scale-[0.98] ${
                  active
                    ? "border-[var(--accent-warm)] bg-[var(--accent-warm)] text-white"
                    : "border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
                }`}
              >
                {renovationLabel(opt)}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
          {t.filterPriceUsd}
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          <input
            type="number"
            min={0}
            inputMode="numeric"
            value={minUsd}
            onChange={(e) => setMinUsd(e.target.value)}
            placeholder={t.filterMinUsd}
            aria-label={t.filterMinUsd}
            className="min-h-[46px] w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3 text-sm tabular-nums text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
          />
          <input
            type="number"
            min={0}
            inputMode="numeric"
            value={maxUsd}
            onChange={(e) => setMaxUsd(e.target.value)}
            placeholder={t.filterMaxUsd}
            aria-label={t.filterMaxUsd}
            className="min-h-[46px] w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3 text-sm tabular-nums text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button
          type="button"
          onClick={handleReset}
          className="min-h-[48px] rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-muted)] active:scale-[0.98]"
        >
          {t.filterReset}
        </button>
        <button
          type="submit"
          className="min-h-[48px] rounded-xl bg-[var(--accent-primary)] text-sm font-semibold text-white transition hover:bg-[var(--accent-primary-hover)] active:scale-[0.98]"
        >
          {t.filterApply}
        </button>
      </div>
    </form>
  );
}

export function FilterSheet({
  open,
  onClose,
  value,
  onApply,
  onReset,
}: FilterSheetProps) {
  const hydrated = useHydrated();
  const storeLocale = useLocaleStore((s) => s.locale);
  const locale = hydrated ? storeLocale : "uz";
  const t = translations[locale];

  return (
    <BottomSheet open={open} onClose={onClose} title={t.filterSheetTitle}>
      {open && (
        <FilterSheetForm
          key={JSON.stringify(value)}
          initialValue={value}
          locale={locale}
          onApply={onApply}
          onReset={onReset}
          onClose={onClose}
        />
      )}
    </BottomSheet>
  );
}
