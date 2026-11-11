"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type {
  DistrictId,
  PropertyFilter,
  RenovationType,
  RoomCount,
  SortOption,
} from "@/types/realtor";
import { listDistricts, listProperties } from "@/lib/propertyRepository";
import { pickText, translations } from "@/lib/i18n";
import { useLocaleStore } from "@/stores/localeStore";
import { useHydrated } from "@/hooks/useHydrated";
import { PropertyCard } from "@/components/property/PropertyCard";
import { FilterSheet } from "@/components/property/FilterSheet";

const VALID_ROOMS: RoomCount[] = [1, 2, 3, 4];
const VALID_DISTRICTS: DistrictId[] = [
  "chilonzor",
  "yunusobod",
  "mirzo-ulugbek",
  "shayxontohur",
  "yakkasaroy",
  "mirobod",
];
const VALID_RENOVATIONS: RenovationType[] = [
  "euro",
  "designer",
  "cosmetic",
  "box",
];
const VALID_SORTS: SortOption[] = [
  "featured",
  "price_asc",
  "price_desc",
  "area_desc",
];

function parseFilterFromSearchParams(params: URLSearchParams): PropertyFilter {
  const dealRaw = params.get("dealType");
  const dealType =
    dealRaw === "sale" || dealRaw === "rent" ? dealRaw : "all";

  const roomsRaw = params.get("rooms");
  const rooms = roomsRaw
    ? roomsRaw
        .split(",")
        .map((n) => Number(n))
        .filter((n): n is RoomCount =>
          VALID_ROOMS.includes(n as RoomCount),
        )
    : undefined;

  const districtsRaw = params.get("districts");
  const districts = districtsRaw
    ? districtsRaw
        .split(",")
        .filter((d): d is DistrictId =>
          VALID_DISTRICTS.includes(d as DistrictId),
        )
    : undefined;

  const renovRaw = params.get("renovation");
  const renovation =
    renovRaw && VALID_RENOVATIONS.includes(renovRaw as RenovationType)
      ? (renovRaw as RenovationType)
      : "all";

  const minRaw = params.get("minUsd");
  const minUsd =
    minRaw && Number.isFinite(Number(minRaw)) && Number(minRaw) >= 0
      ? Number(minRaw)
      : undefined;

  const maxRaw = params.get("maxUsd");
  const maxUsd =
    maxRaw && Number.isFinite(Number(maxRaw)) && Number(maxRaw) >= 0
      ? Number(maxRaw)
      : undefined;

  const q = params.get("q") ?? undefined;

  const sortRaw = params.get("sort");
  const sort =
    sortRaw && VALID_SORTS.includes(sortRaw as SortOption)
      ? (sortRaw as SortOption)
      : "featured";

  return {
    dealType,
    rooms: rooms && rooms.length > 0 ? rooms : undefined,
    districts: districts && districts.length > 0 ? districts : undefined,
    renovation,
    minUsd,
    maxUsd,
    q,
    sort,
  };
}

function serializeFilter(filter: PropertyFilter): string {
  const sp = new URLSearchParams();
  if (filter.dealType && filter.dealType !== "all") {
    sp.set("dealType", filter.dealType);
  }
  if (filter.rooms && filter.rooms.length > 0) {
    sp.set("rooms", filter.rooms.join(","));
  }
  if (filter.districts && filter.districts.length > 0) {
    sp.set("districts", filter.districts.join(","));
  }
  if (filter.renovation && filter.renovation !== "all") {
    sp.set("renovation", filter.renovation);
  }
  if (filter.minUsd !== undefined) {
    sp.set("minUsd", String(filter.minUsd));
  }
  if (filter.maxUsd !== undefined) {
    sp.set("maxUsd", String(filter.maxUsd));
  }
  if (filter.q && filter.q.trim()) {
    sp.set("q", filter.q.trim());
  }
  if (filter.sort && filter.sort !== "featured") {
    sp.set("sort", filter.sort);
  }
  return sp.toString();
}

export function CatalogClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hydrated = useHydrated();
  const storeLocale = useLocaleStore((s) => s.locale);
  const locale = hydrated ? storeLocale : "uz";
  const t = translations[locale];

  const urlFilter = parseFilterFromSearchParams(searchParams);
  const [searchInput, setSearchInput] = useState(urlFilter.q ?? "");
  const [filterOpen, setFilterOpen] = useState(false);

  const effectiveFilter: PropertyFilter = {
    ...urlFilter,
    q: searchInput,
  };

  const results = listProperties(effectiveFilter);
  const allDistricts = listDistricts();

  const applyFilter = (next: PropertyFilter) => {
    const queryString = serializeFilter({ ...next, q: searchInput });
    router.replace(queryString ? `/catalog?${queryString}` : "/catalog", {
      scroll: false,
    });
  };

  const handleReset = () => {
    setSearchInput("");
    router.replace("/catalog", { scroll: false });
  };

  const activeFilterCount =
    (urlFilter.rooms?.length ?? 0) +
    (urlFilter.districts?.length ?? 0) +
    (urlFilter.renovation && urlFilter.renovation !== "all" ? 1 : 0) +
    (urlFilter.minUsd !== undefined ? 1 : 0) +
    (urlFilter.maxUsd !== undefined ? 1 : 0);

  return (
    <div className="space-y-4 px-4 pb-8 pt-4">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
          {t.catalogTitle}
        </h1>
        <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
          {t.catalogSubtitle}
        </p>
      </div>

      {/* Deal Type Segmented Control */}
      <div className="grid grid-cols-3 gap-1.5 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-muted)] p-1">
        {(["all", "sale", "rent"] as const).map((type) => {
          const active = (urlFilter.dealType ?? "all") === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => applyFilter({ ...urlFilter, dealType: type })}
              aria-pressed={active}
              className={`min-h-[40px] rounded-xl text-xs font-semibold transition ${
                active
                  ? "bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-xs"
                  : "text-[var(--text-secondary)]"
              }`}
            >
              {type === "all"
                ? t.dealAll
                : type === "sale"
                  ? t.dealSale
                  : t.dealRent}
            </button>
          );
        })}
      </div>

      {/* Search + Filters */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={t.searchPlaceholder}
            aria-label={t.searchPlaceholder}
            className="min-h-[46px] w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] pl-10 pr-8 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
          />
          {searchInput.length > 0 && (
            <button
              type="button"
              onClick={() => setSearchInput("")}
              aria-label={t.filterReset}
              className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setFilterOpen(true)}
          className="inline-flex min-h-[46px] shrink-0 items-center gap-1.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3.5 text-xs font-semibold text-[var(--text-primary)] transition hover:border-[var(--border-strong)] active:scale-[0.98]"
        >
          <SlidersHorizontal className="h-4 w-4 text-[var(--accent-primary)]" />
          <span>{t.filtersBtn}</span>
          {activeFilterCount > 0 && (
            <span className="tabular-nums inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--accent-primary)] px-1 text-[10px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Active filter summary pills */}
      {(urlFilter.rooms?.length || urlFilter.districts?.length) && (
        <div className="flex flex-wrap gap-1.5">
          {urlFilter.rooms?.map((r) => (
            <button
              key={`r-${r}`}
              type="button"
              onClick={() =>
                applyFilter({
                  ...urlFilter,
                  rooms: urlFilter.rooms?.filter((item) => item !== r),
                })
              }
              className="inline-flex min-h-[32px] items-center gap-1 rounded-full bg-[var(--accent-primary)]/10 px-2.5 text-xs font-semibold text-[var(--accent-primary)]"
            >
              {r === 4 ? "4+" : r} {t.roomsShort}
              <X className="h-3 w-3" />
            </button>
          ))}
          {urlFilter.districts?.map((dId) => {
            const dist = allDistricts.find((d) => d.id === dId);
            return (
              <button
                key={`d-${dId}`}
                type="button"
                onClick={() =>
                  applyFilter({
                    ...urlFilter,
                    districts: urlFilter.districts?.filter((item) => item !== dId),
                  })
                }
                className="inline-flex min-h-[32px] items-center gap-1 rounded-full bg-[var(--accent-warm)]/15 px-2.5 text-xs font-semibold text-[var(--accent-warm)]"
              >
                {dist ? pickText(dist.name, locale) : dId}
                <X className="h-3 w-3" />
              </button>
            );
          })}
        </div>
      )}

      {/* Result Count + Sort */}
      <div className="flex items-center justify-between gap-2">
        <p className="tabular-nums text-xs font-semibold text-[var(--text-secondary)]">
          {results.length} {t.resultsCountSuffix}
        </p>

        <select
          aria-label="Sort"
          value={urlFilter.sort ?? "featured"}
          onChange={(e) =>
            applyFilter({
              ...urlFilter,
              sort: e.target.value as SortOption,
            })
          }
          className="min-h-[38px] rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-2.5 text-xs font-semibold text-[var(--text-primary)]"
        >
          <option value="featured">{t.sortFeatured}</option>
          <option value="price_asc">{t.sortPriceAsc}</option>
          <option value="price_desc">{t.sortPriceDesc}</option>
          <option value="area_desc">{t.sortAreaDesc}</option>
        </select>
      </div>

      {/* Results List or Empty State */}
      {results.length === 0 ? (
        <div className="rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 text-center">
          <p className="text-base font-bold text-[var(--text-primary)]">
            {t.emptyTitle}
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)]">
            {t.emptySubtitle}
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[var(--accent-primary)] px-5 text-xs font-semibold text-white transition hover:bg-[var(--accent-primary-hover)]"
          >
            {t.clearFilters}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((property, idx) => (
            <PropertyCard
              key={property.id}
              property={property}
              priority={idx < 2}
            />
          ))}
        </div>
      )}

      <FilterSheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        value={effectiveFilter}
        onApply={applyFilter}
        onReset={handleReset}
      />
    </div>
  );
}
