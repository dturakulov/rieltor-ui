"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import { translations } from "@/lib/i18n";
import { formatUsd, formatUzsApprox } from "@/lib/format";
import { calculateMortgage } from "@/services/mortgage";
import { useLocaleStore } from "@/stores/localeStore";
import { useHydrated } from "@/hooks/useHydrated";

interface CalculatorWidgetProps {
  initialPriceUsd?: number;
}

export function CalculatorWidget({
  initialPriceUsd = 100000,
}: CalculatorWidgetProps) {
  const hydrated = useHydrated();
  const storeLocale = useLocaleStore((s) => s.locale);
  const locale = hydrated ? storeLocale : "uz";
  const t = translations[locale];

  const [mode, setMode] = useState<"mortgage" | "installment">("mortgage");
  const [priceUsd, setPriceUsd] = useState(() =>
    Math.min(400000, Math.max(20000, Math.round(initialPriceUsd))),
  );
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [termYears, setTermYears] = useState(15);
  const [annualRatePct, setAnnualRatePct] = useState(18);

  const handleModeChange = (nextMode: "mortgage" | "installment") => {
    setMode(nextMode);
    if (nextMode === "installment") {
      setDownPaymentPct(30);
      setTermYears(3);
      setAnnualRatePct(0);
    } else {
      setDownPaymentPct(20);
      setTermYears(15);
      setAnnualRatePct(18);
    }
  };

  const effectiveRate = mode === "installment" ? 0 : annualRatePct;
  const result = calculateMortgage({
    priceUsd,
    downPaymentPct,
    termYears,
    annualRatePct: effectiveRate,
  });

  return (
    <section
      id="calculator"
      className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4 shadow-xs"
    >
      <div className="flex items-center gap-2.5">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
          <Calculator className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-base font-bold text-[var(--text-primary)]">
            {t.calcTitle}
          </h2>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-1.5 rounded-xl bg-[var(--bg-muted)] p-1">
        <button
          type="button"
          onClick={() => handleModeChange("mortgage")}
          aria-pressed={mode === "mortgage"}
          className={`min-h-[40px] rounded-lg px-2 text-xs font-semibold transition ${
            mode === "mortgage"
              ? "bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-xs"
              : "text-[var(--text-secondary)]"
          }`}
        >
          {t.calcModeMortgage}
        </button>
        <button
          type="button"
          onClick={() => handleModeChange("installment")}
          aria-pressed={mode === "installment"}
          className={`min-h-[40px] rounded-lg px-2 text-xs font-semibold transition ${
            mode === "installment"
              ? "bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-xs"
              : "text-[var(--text-secondary)]"
          }`}
        >
          {t.calcModeInstallment}
        </button>
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <label
              htmlFor="calc-price"
              className="font-semibold text-[var(--text-secondary)]"
            >
              {t.calcPriceLabel}
            </label>
            <span className="tabular-nums font-bold text-[var(--text-primary)]">
              {formatUsd(priceUsd)}
            </span>
          </div>
          <input
            id="calc-price"
            type="range"
            min={20000}
            max={400000}
            step={1000}
            value={priceUsd}
            onChange={(e) => setPriceUsd(Number(e.target.value))}
            className="w-full accent-[var(--accent-primary)]"
          />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <label
              htmlFor="calc-down"
              className="font-semibold text-[var(--text-secondary)]"
            >
              {t.calcDownPaymentLabel}
            </label>
            <span className="tabular-nums font-bold text-[var(--text-primary)]">
              {downPaymentPct}% ({formatUsd(result.downPaymentAmount)})
            </span>
          </div>
          <input
            id="calc-down"
            type="range"
            min={10}
            max={80}
            step={5}
            value={downPaymentPct}
            onChange={(e) => setDownPaymentPct(Number(e.target.value))}
            className="w-full accent-[var(--accent-primary)]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <label
                htmlFor="calc-term"
                className="font-semibold text-[var(--text-secondary)]"
              >
                {t.calcTermLabel}
              </label>
              <span className="tabular-nums font-bold text-[var(--text-primary)]">
                {termYears}
              </span>
            </div>
            <input
              id="calc-term"
              type="range"
              min={1}
              max={mode === "installment" ? 5 : 20}
              step={1}
              value={termYears}
              onChange={(e) => setTermYears(Number(e.target.value))}
              className="w-full accent-[var(--accent-primary)]"
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <label
                htmlFor="calc-rate"
                className="font-semibold text-[var(--text-secondary)]"
              >
                {t.calcRateLabel}
              </label>
              <span className="tabular-nums font-bold text-[var(--text-primary)]">
                {effectiveRate}%
              </span>
            </div>
            <input
              id="calc-rate"
              type="range"
              min={mode === "installment" ? 0 : 8}
              max={26}
              step={1}
              disabled={mode === "installment"}
              value={effectiveRate}
              onChange={(e) => setAnnualRatePct(Number(e.target.value))}
              className="w-full accent-[var(--accent-primary)] disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-[var(--accent-primary)] p-4 text-white">
        <p className="text-xs font-medium text-emerald-100">
          {t.calcMonthlyResult}
        </p>
        <p className="mt-1 tabular-nums text-2xl font-bold tracking-tight">
          {formatUsd(result.monthlyPayment)}{" "}
          <span className="text-sm font-medium text-emerald-100">
            {t.perMonth}
          </span>
        </p>
        <p className="mt-0.5 tabular-nums text-xs text-emerald-100/90">
          {formatUzsApprox(result.monthlyPayment, locale)}
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/15 pt-3 text-xs">
          <div>
            <p className="text-emerald-100/80">{t.calcDownAmount}</p>
            <p className="mt-0.5 tabular-nums font-semibold">
              {formatUsd(result.downPaymentAmount)}
            </p>
          </div>
          <div>
            <p className="text-emerald-100/80">{t.calcLoanAmount}</p>
            <p className="mt-0.5 tabular-nums font-semibold">
              {formatUsd(result.loanAmount)}
            </p>
          </div>
          <div>
            <p className="text-emerald-100/80">{t.calcTotalInterest}</p>
            <p className="mt-0.5 tabular-nums font-semibold">
              {formatUsd(result.totalInterest)}
            </p>
          </div>
        </div>

        {mode === "installment" && (
          <p className="mt-2.5 text-[11px] text-emerald-100/90">
            {t.calcZeroRateNote}
          </p>
        )}
      </div>
    </section>
  );
}
