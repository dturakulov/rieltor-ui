"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Building, Home, UserCheck } from "lucide-react";
import { translations } from "@/lib/i18n";
import { useLocaleStore } from "@/stores/localeStore";
import { useHydrated } from "@/hooks/useHydrated";

export function BottomNav() {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const storeLocale = useLocaleStore((s) => s.locale);
  const locale = hydrated ? storeLocale : "uz";
  const t = translations[locale];

  const items = [
    { href: "/", label: t.navHome, icon: Home, match: (p: string) => p === "/" },
    {
      href: "/catalog",
      label: t.navCatalog,
      icon: Building,
      match: (p: string) =>
        p.startsWith("/catalog") || p.startsWith("/property"),
    },
    {
      href: "/guides",
      label: t.navGuides,
      icon: BookOpen,
      match: (p: string) => p.startsWith("/guides"),
    },
    {
      href: "/realtor",
      label: t.navRealtor,
      icon: UserCheck,
      match: (p: string) => p.startsWith("/realtor"),
    },
  ];

  return (
    <nav
      aria-label="Primary"
      className="sticky bottom-0 z-30 border-t border-[var(--border-hairline)] bg-[var(--bg-surface)]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md"
    >
      <div className="grid h-16 grid-cols-4 items-center px-1.5">
        {items.map((item) => {
          const active = item.match(pathname);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-[48px] flex-col items-center justify-center gap-1 rounded-xl px-1 transition active:scale-95 ${
                active
                  ? "text-[var(--accent-primary)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <span
                className={`inline-flex h-7 w-12 items-center justify-center rounded-full transition ${
                  active ? "bg-[var(--accent-primary)]/10" : ""
                }`}
              >
                <Icon className="h-4.5 w-4.5" strokeWidth={active ? 2.4 : 1.9} />
              </span>
              <span
                className={`whitespace-nowrap text-[11px] leading-none ${
                  active ? "font-semibold" : "font-medium"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
