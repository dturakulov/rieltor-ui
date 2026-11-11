"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Clock } from "lucide-react";
import type { GuideCategory } from "@/types/realtor";
import { listGuides } from "@/lib/propertyRepository";
import { pickText, translations } from "@/lib/i18n";
import { useLocaleStore } from "@/stores/localeStore";
import { useHydrated } from "@/hooks/useHydrated";
import { CalculatorWidget } from "@/components/calculator/CalculatorWidget";

const CATEGORIES: (GuideCategory | "all")[] = [
  "all",
  "district",
  "buying",
  "mortgage",
];

export function GuidesClient() {
  const searchParams = useSearchParams();
  const hydrated = useHydrated();
  const storeLocale = useLocaleStore((s) => s.locale);
  const locale = hydrated ? storeLocale : "uz";
  const t = translations[locale];

  const [category, setCategory] = useState<GuideCategory | "all">("all");

  const priceParam = Number(searchParams.get("price"));
  const initialPriceUsd =
    Number.isFinite(priceParam) && priceParam >= 20000 ? priceParam : 100000;

  const articles = listGuides(category);

  const categoryLabel = (cat: GuideCategory | "all") => {
    switch (cat) {
      case "all":
        return t.guideCatAll;
      case "district":
        return t.guideCatDistrict;
      case "buying":
        return t.guideCatBuying;
      case "mortgage":
        return t.guideCatMortgage;
    }
  };

  return (
    <div className="space-y-6 px-4 pb-8 pt-4">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
          {t.guidesTitle}
        </h1>
        <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
          {t.guidesSubtitle}
        </p>
      </div>

      <CalculatorWidget key={initialPriceUsd} initialPriceUsd={initialPriceUsd} />

      <section className="space-y-3">
        <h2 className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
          {t.guidesArticlesTitle}
        </h2>

        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
          {CATEGORIES.map((cat) => {
            const active = category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                aria-pressed={active}
                className={`min-h-[40px] shrink-0 rounded-full border px-3.5 text-xs font-semibold transition active:scale-95 ${
                  active
                    ? "border-[var(--accent-primary)] bg-[var(--accent-primary)] text-white"
                    : "border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
                }`}
              >
                {categoryLabel(cat)}
              </button>
            );
          })}
        </div>

        <div className="space-y-3.5">
          {articles.map((article) => {
            const title = pickText(article.title, locale);
            return (
              <Link
                key={article.id}
                href={`/guides/${article.slug}`}
                className="group block overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] transition hover:border-[var(--border-strong)]"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--bg-muted)]">
                  <Image
                    src={article.coverImage}
                    alt={title}
                    fill
                    sizes="(max-width: 430px) 100vw, 430px"
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-[var(--text-primary)]/85 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-xs">
                    {categoryLabel(article.category)}
                  </span>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-[var(--text-secondary)]">
                    <Clock className="h-3.5 w-3.5 text-[var(--accent-warm)]" />
                    <span>
                      {article.readTimeMin} {t.readTimeSuffix}
                    </span>
                  </div>
                  <h3 className="mt-1.5 text-base font-bold leading-snug text-[var(--text-primary)]">
                    {title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                    {pickText(article.excerpt, locale)}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent-primary)]">
                    {t.readMore}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
