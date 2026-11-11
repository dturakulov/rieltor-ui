import type { Locale } from "../types/realtor.ts";

export const USD_TO_UZS_RATE = 12800;

export function formatUsd(amount: number): string {
  const safe = Number.isFinite(amount) ? Math.max(0, Math.round(amount)) : 0;
  return `$${safe.toLocaleString("en-US")}`;
}

export function formatUzsApprox(
  usdAmount: number,
  locale: Locale = "uz",
  rate: number = USD_TO_UZS_RATE,
): string {
  const safeUsd = Number.isFinite(usdAmount) ? Math.max(0, usdAmount) : 0;
  const uzs = safeUsd * rate;

  if (uzs >= 1_000_000_000) {
    const mlrd = (uzs / 1_000_000_000).toFixed(2).replace(/\.00$/, "");
    return locale === "uz" ? `~${mlrd} mlrd so'm` : `~${mlrd} млрд сум`;
  }

  const mln = Math.round(uzs / 1_000_000);
  if (mln >= 1) {
    return locale === "uz"
      ? `~${mln.toLocaleString("en-US")} mln so'm`
      : `~${mln.toLocaleString("en-US")} млн сум`;
  }

  return locale === "uz"
    ? `~${Math.round(uzs).toLocaleString("en-US")} so'm`
    : `~${Math.round(uzs).toLocaleString("en-US")} сум`;
}

export function formatArea(sqm: number, locale: Locale): string {
  return locale === "uz" ? `${sqm} m²` : `${sqm} м²`;
}

export function formatPhoneDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("998")) {
    return `+998 ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`;
  }
  return raw;
}
