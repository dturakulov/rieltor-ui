import type { MortgageInput, MortgageResult } from "../types/realtor.ts";

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const priceUsd = Number.isFinite(input.priceUsd)
    ? Math.max(0, input.priceUsd)
    : 0;
  const downPaymentPct = clamp(input.downPaymentPct, 0, 100);
  const termYears = clamp(input.termYears, 1, 30);
  const annualRatePct = clamp(input.annualRatePct, 0, 50);

  const downPaymentAmount = Math.round((priceUsd * downPaymentPct) / 100);
  const loanAmount = Math.max(0, Math.round(priceUsd - downPaymentAmount));
  const months = Math.round(termYears * 12);

  if (loanAmount === 0 || months === 0) {
    return {
      priceUsd: Math.round(priceUsd),
      downPaymentAmount,
      loanAmount: 0,
      months,
      monthlyPayment: 0,
      totalPayment: 0,
      totalInterest: 0,
    };
  }

  if (annualRatePct === 0) {
    const monthlyPayment = Math.round(loanAmount / months);
    return {
      priceUsd: Math.round(priceUsd),
      downPaymentAmount,
      loanAmount,
      months,
      monthlyPayment,
      totalPayment: loanAmount,
      totalInterest: 0,
    };
  }

  const monthlyRate = annualRatePct / 100 / 12;
  const factor = Math.pow(1 + monthlyRate, months);
  const rawMonthly = (loanAmount * (monthlyRate * factor)) / (factor - 1);
  const monthlyPayment = Math.round(rawMonthly);
  const totalPayment = Math.round(rawMonthly * months);
  const totalInterest = Math.max(0, totalPayment - loanAmount);

  return {
    priceUsd: Math.round(priceUsd),
    downPaymentAmount,
    loanAmount,
    months,
    monthlyPayment,
    totalPayment,
    totalInterest,
  };
}
