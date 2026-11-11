import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { normalizeUzPhone, validateBookingInput } from "../src/lib/validation.ts";

describe("phone normalization and booking validation", () => {
  it("normalizes valid Uzbekistan phone formats", () => {
    assert.equal(normalizeUzPhone("+998 90 123 45 67"), "+998901234567");
    assert.equal(normalizeUzPhone("998911234567"), "+998911234567");
    assert.equal(normalizeUzPhone("93 555 44 33"), "+998935554433");
    assert.equal(normalizeUzPhone("12345"), null);
    assert.equal(normalizeUzPhone("+7 999 123 45 67"), null);
    assert.equal(normalizeUzPhone("+998 00 123 45 67"), null);
    assert.equal(normalizeUzPhone("998111234567"), null);
  });

  it("rejects whitespace-only names and invalid phone numbers", () => {
    const errors = validateBookingInput({
      clientName: "   ",
      phone: "99812",
      preferredDate: "",
      preferredTime: "",
    });
    assert.equal(errors.clientName, "errNameRequired");
    assert.equal(errors.phone, "errPhoneInvalid");
    assert.equal(errors.preferredDate, "errDateRequired");
    assert.equal(errors.preferredTime, "errTimeRequired");
  });

  it("returns empty errors object for valid booking input", () => {
    const errors = validateBookingInput({
      clientName: "Jasur Alimov",
      phone: "+998 90 123 45 67",
      preferredDate: "2026-11-15",
      preferredTime: "16:00",
    });
    assert.deepEqual(errors, {});
  });
});
