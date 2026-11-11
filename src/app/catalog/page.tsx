import { Suspense } from "react";
import { CatalogClient } from "@/components/catalog/CatalogClient";

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-4 px-4 py-6">
          <div className="h-7 w-48 animate-pulse rounded-lg bg-[var(--bg-muted)]" />
          <div className="h-44 animate-pulse rounded-2xl bg-[var(--bg-muted)]" />
          <div className="h-44 animate-pulse rounded-2xl bg-[var(--bg-muted)]" />
        </div>
      }
    >
      <CatalogClient />
    </Suspense>
  );
}
