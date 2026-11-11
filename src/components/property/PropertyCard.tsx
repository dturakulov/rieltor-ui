"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Layers, Maximize2, DoorOpen } from "lucide-react";
import type { Property } from "@/types/realtor";
import { getRenovationLabel, pickText, translations } from "@/lib/i18n";
import { formatArea, formatUsd, formatUzsApprox } from "@/lib/format";
import { useLocaleStore } from "@/stores/localeStore";
import { useSavedStore } from "@/stores/savedStore";
import { useToastStore } from "@/stores/toastStore";
import { useHydrated } from "@/hooks/useHydrated";

interface PropertyCardProps {
  property: Property;
  priority?: boolean;
}

export function PropertyCard({ property, priority = false }: PropertyCardProps) {
  const hydrated = useHydrated();
  const storeLocale = useLocaleStore((s) => s.locale);
  const locale = hydrated ? storeLocale : "uz";
  const t = translations[locale];

  const savedIds = useSavedStore((s) => s.savedIds);
  const toggleSaved = useSavedStore((s) => s.toggleSaved);
  const showToast = useToastStore((s) => s.showToast);

  const isSaved = hydrated && savedIds.includes(property.id);
  const title = pickText(property.title, locale);
  const district = pickText(property.districtName, locale);
  const address = pickText(property.address, locale);

  const handleToggleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleSaved(property.id);
    showToast(added ? t.toastSavedAdded : t.toastSavedRemoved);
  };

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] shadow-xs transition hover:border-[var(--border-strong)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--bg-muted)]">
        <Link
          href={`/property/${property.slug}`}
          className="block h-full w-full"
          aria-label={title}
        >
          <Image
            src={property.images[0]}
            alt={title}
            fill
            sizes="(max-width: 430px) 100vw, 430px"
            priority={priority}
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-[var(--text-primary)]/85 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-xs">
            {property.dealType === "sale" ? t.dealSale : t.dealRent}
          </span>
          {property.badge && (
            <span className="rounded-full bg-[var(--accent-warm)] px-2.5 py-1 text-[11px] font-semibold text-white shadow-xs">
              {pickText(property.badge, locale)}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleToggleSave}
          aria-pressed={isSaved}
          aria-label={isSaved ? t.saveRemove : t.saveAdd}
          className="absolute right-2.5 top-2.5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--bg-surface)]/92 text-[var(--text-primary)] shadow-sm backdrop-blur-xs transition hover:bg-white active:scale-90"
        >
          <Heart
            className={`h-5 w-5 transition ${
              isSaved
                ? "fill-[var(--accent-warm)] text-[var(--accent-warm)]"
                : "text-[var(--text-primary)]"
            }`}
          />
        </button>
      </div>

      <Link href={`/property/${property.slug}`} className="block p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="tabular-nums text-lg font-bold tracking-tight text-[var(--text-primary)]">
            {formatUsd(property.priceUsd)}
            {property.dealType === "rent" && (
              <span className="ml-1 text-xs font-medium text-[var(--text-secondary)]">
                {t.perMonth}
              </span>
            )}
          </p>
          <p className="tabular-nums text-xs font-medium text-[var(--text-secondary)]">
            {formatUzsApprox(property.priceUsd, locale)}
          </p>
        </div>

        <h3 className="mt-1.5 line-clamp-2 text-[15px] font-semibold leading-snug text-[var(--text-primary)]">
          {title}
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-medium text-[var(--text-secondary)]">
          <span className="inline-flex items-center gap-1">
            <DoorOpen className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
            {property.rooms === 4 ? "4+" : property.rooms} {t.roomsShort}
          </span>
          <span className="inline-flex items-center gap-1 tabular-nums">
            <Maximize2 className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
            {formatArea(property.areaSqm, locale)}
          </span>
          <span className="inline-flex items-center gap-1 tabular-nums">
            <Layers className="h-3.5 w-3.5 text-[var(--accent-primary)]" />
            {property.floor}/{property.totalFloors}
          </span>
          <span className="rounded-md bg-[var(--bg-muted)] px-1.5 py-0.5 text-[11px]">
            {getRenovationLabel(property.renovation, locale)}
          </span>
        </div>

        <p className="mt-2.5 flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-[var(--accent-warm)]" />
          <span className="truncate">
            {district} · {address}
          </span>
        </p>
      </Link>
    </article>
  );
}
