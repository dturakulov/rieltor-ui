import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { calculateMortgage } from "../src/services/mortgage.ts";

describe("calculateMortgage", () => {
  it("computes monthly annuity payment for standard mortgage", () => {
    const res = calculateMortgage({
      priceUsd: 100000,
      downPaymentPct: 20,
      termYears: 15,
      annualRatePct: 18,
    });

    assert.equal(res.downPaymentAmount, 20000);
    assert.equal(res.loanAmount, 80000);
    assert.equal(res.months, 180);
    // Standard annuity: 80000 * (0.015 * (1.015^180)) / ((1.015^180) - 1) = ~1288.34 -> 1288
    assert.ok(res.monthlyPayment >= 1287 && res.monthlyPayment <= 1290);
    assert.ok(res.totalInterest > 0);
  });

  it("handles 0% installment without NaN or Infinity", () => {
    const res = calculateMortgage({
      priceUsd: 120000,
      downPaymentPct: 25,
      termYears: 3,
      annualRatePct: 0,
    });

    assert.equal(res.downPaymentAmount, 30000);
    assert.equal(res.loanAmount, 90000);
    assert.equal(res.months, 36);
    assert.equal(res.monthlyPayment, 2500);
    assert.equal(res.totalInterest, 0);
    assert.equal(res.totalPayment, 90000);
  });

  it("handles 100% down payment and negative/zero bounds safely", () => {
    const fullDown = calculateMortgage({
      priceUsd: 80000,
      downPaymentPct: 100,
      termYears: 10,
      annualRatePct: 18,
    });
    assert.equal(fullDown.loanAmount, 0);
    assert.equal(fullDown.monthlyPayment, 0);
    assert.equal(fullDown.totalInterest, 0);

    const invalid = calculateMortgage({
      priceUsd: -5000,
      downPaymentPct: 150,
      termYears: 0,
      annualRatePct: -5,
    });
    assert.equal(Number.isFinite(invalid.monthlyPayment), true);
    assert.equal(invalid.monthlyPayment, 0);
    assert.equal(invalid.months, 12);
  });
});
