"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { translations } from "@/lib/i18n";
import { useLocaleStore } from "@/stores/localeStore";
import { useHydrated } from "@/hooks/useHydrated";

interface PropertyGalleryCarouselProps {
  images: string[];
  title: string;
}

export function PropertyGalleryCarousel({
  images,
  title,
}: PropertyGalleryCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const hydrated = useHydrated();
  const storeLocale = useLocaleStore((s) => s.locale);
  const locale = hydrated ? storeLocale : "uz";
  const t = translations[locale];

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const bounded = Math.max(0, Math.min(images.length - 1, index));
    track.scrollTo({
      left: bounded * track.clientWidth,
      behavior: "smooth",
    });
    setActiveIndex(bounded);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const idx = Math.round(track.scrollLeft / track.clientWidth);
    if (idx !== activeIndex) {
      setActiveIndex(Math.max(0, Math.min(images.length - 1, idx)));
    }
  };

  return (
    <div className="relative overflow-hidden bg-[var(--bg-muted)]">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="makon-carousel-track"
      >
        {images.map((src, idx) => (
          <div key={`${src}-${idx}`} className="relative aspect-[4/3] w-full">
            <Image
              src={src}
              alt={`${title} (${idx + 1})`}
              fill
              sizes="(max-width: 430px) 100vw, 430px"
              priority={idx === 0}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scrollTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label={t.prevPhoto}
            className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--bg-surface)]/85 text-[var(--text-primary)] shadow-sm backdrop-blur-xs transition hover:bg-white disabled:opacity-35"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollTo(activeIndex + 1)}
            disabled={activeIndex === images.length - 1}
            aria-label={t.nextPhoto}
            className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--bg-surface)]/85 text-[var(--text-primary)] shadow-sm backdrop-blur-xs transition hover:bg-white disabled:opacity-35"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-[var(--text-primary)]/75 px-2.5 py-1 text-[11px] font-semibold tabular-nums text-white backdrop-blur-xs">
            {activeIndex + 1} / {images.length}
          </div>

          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-[var(--text-primary)]/50 px-2.5 py-1.5 backdrop-blur-xs">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollTo(idx)}
                aria-label={`${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  idx === activeIndex ? "w-5 bg-white" : "w-2 bg-white/55"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
