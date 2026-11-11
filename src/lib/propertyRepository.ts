import { DISTRICTS, PROPERTIES } from "../data/properties.ts";
import { GUIDES } from "../data/content.ts";
import type {
  DistrictId,
  GuideArticle,
  GuideCategory,
  LocalizedText,
  Property,
  PropertyFilter,
} from "../types/realtor.ts";

export function listDistricts(): { id: DistrictId; name: LocalizedText }[] {
  return DISTRICTS;
}

export function listProperties(filter: PropertyFilter = {}): Property[] {
  const {
    dealType = "all",
    rooms,
    districts,
    renovation = "all",
    minUsd,
    maxUsd,
    q,
    sort = "featured",
  } = filter;

  const query = q?.trim().toLowerCase() ?? "";

  const filtered = PROPERTIES.filter((item) => {
    if (dealType !== "all" && item.dealType !== dealType) return false;

    if (rooms && rooms.length > 0 && !rooms.includes(item.rooms)) return false;

    if (districts && districts.length > 0 && !districts.includes(item.districtId)) {
      return false;
    }

    if (renovation !== "all" && item.renovation !== renovation) return false;

    if (typeof minUsd === "number" && Number.isFinite(minUsd) && item.priceUsd < minUsd) {
      return false;
    }

    if (typeof maxUsd === "number" && Number.isFinite(maxUsd) && item.priceUsd > maxUsd) {
      return false;
    }

    if (query.length > 0) {
      const haystack = [
        item.title.uz,
        item.title.ru,
        item.districtName.uz,
        item.districtName.ru,
        item.address.uz,
        item.address.ru,
        `${item.rooms}`,
      ]
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(query)) return false;
    }

    return true;
  });

  const sorted = [...filtered];
  switch (sort) {
    case "price_asc":
      sorted.sort((a, b) => a.priceUsd - b.priceUsd);
      break;
    case "price_desc":
      sorted.sort((a, b) => b.priceUsd - a.priceUsd);
      break;
    case "area_desc":
      sorted.sort((a, b) => b.areaSqm - a.areaSqm);
      break;
    case "featured":
    default:
      sorted.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return b.createdAt.localeCompare(a.createdAt);
      });
      break;
  }

  return sorted;
}

export function listFeaturedProperties(limit = 4): Property[] {
  return PROPERTIES.filter((item) => item.featured).slice(0, limit);
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return PROPERTIES.find((item) => item.slug === slug);
}

export function listGuides(
  category: GuideCategory | "all" = "all",
): GuideArticle[] {
  if (category === "all") return GUIDES;
  return GUIDES.filter((article) => article.category === category);
}

export function getGuideBySlug(slug: string): GuideArticle | undefined {
  return GUIDES.find((article) => article.slug === slug);
}
