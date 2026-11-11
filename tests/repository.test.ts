import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  listProperties,
  getPropertyBySlug,
  listFeaturedProperties,
  listGuides,
  getGuideBySlug,
} from "../src/lib/propertyRepository.ts";
import { REALTOR_PROFILE } from "../src/data/content.ts";

describe("propertyRepository", () => {
  it("filters by dealType, rooms, and district", () => {
    const rentals = listProperties({ dealType: "rent" });
    assert.ok(rentals.length > 0);
    assert.ok(rentals.every((p) => p.dealType === "rent"));

    const twoRoom = listProperties({ rooms: [2] });
    assert.ok(twoRoom.length > 0);
    assert.ok(twoRoom.every((p) => p.rooms === 2));

    const chilonzor = listProperties({ districts: ["chilonzor"] });
    assert.ok(chilonzor.length > 0);
    assert.ok(chilonzor.every((p) => p.districtId === "chilonzor"));
  });

  it("matches search query across uz and ru text", () => {
    const byRu = listProperties({ q: "Юнусабад" });
    assert.ok(byRu.length > 0);

    const byUz = listProperties({ q: "Chilonzor" });
    assert.ok(byUz.length > 0);
  });

  it("sorts by price ascending and descending", () => {
    const asc = listProperties({ dealType: "sale", sort: "price_asc" });
    for (let i = 1; i < asc.length; i++) {
      assert.ok(asc[i].priceUsd >= asc[i - 1].priceUsd);
    }

    const desc = listProperties({ dealType: "sale", sort: "price_desc" });
    for (let i = 1; i < desc.length; i++) {
      assert.ok(desc[i].priceUsd <= desc[i - 1].priceUsd);
    }
  });

  it("returns empty array on impossible bounds without throwing", () => {
    const empty = listProperties({ minUsd: 9999999, maxUsd: 100 });
    assert.deepEqual(empty, []);
  });

  it("retrieves property and guide by slug and featured properties", () => {
    const featured = listFeaturedProperties(4);
    assert.equal(featured.length, 4);
    assert.ok(featured.every((p) => p.featured));

    const first = featured[0];
    const found = getPropertyBySlug(first.slug);
    assert.equal(found?.id, first.id);
    assert.equal(getPropertyBySlug("non-existent-slug"), undefined);

    const guides = listGuides();
    assert.ok(guides.length >= 4);
    assert.equal(getGuideBySlug(guides[0].slug)?.id, guides[0].id);
  });

  it("references existing local image assets under public/", () => {
    const publicDir = path.resolve(process.cwd(), "public");
    const paths = new Set<string>([
      REALTOR_PROFILE.avatar,
      ...listProperties().flatMap((p) => p.images),
      ...listGuides().map((g) => g.coverImage),
    ]);
    for (const rel of paths) {
      const fullPath = path.join(publicDir, rel.replace(/^\//, ""));
      assert.ok(fs.existsSync(fullPath), `Missing image asset: ${rel}`);
    }
  });
});
