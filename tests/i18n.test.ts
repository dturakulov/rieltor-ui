import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { translations, pickText } from "../src/lib/i18n.ts";

describe("i18n dictionary", () => {
  it("keeps identical translation keys across uz and ru", () => {
    const uzKeys = Object.keys(translations.uz).sort();
    const ruKeys = Object.keys(translations.ru).sort();
    assert.deepEqual(uzKeys, ruKeys);
  });

  it("picks localized text for uz and ru", () => {
    const label = { uz: "Chilonzor", ru: "Чиланзар" };
    assert.equal(pickText(label, "uz"), "Chilonzor");
    assert.equal(pickText(label, "ru"), "Чиланзар");
  });
});
