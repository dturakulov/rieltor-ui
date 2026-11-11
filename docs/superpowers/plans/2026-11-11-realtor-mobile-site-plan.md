# MAKON Estate Mobile Realtor Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (`uz` / `ru`) mobile-first personal realtor website (`MAKON Estate`) in Next.js App Router at `/home/daler/.gemini/antigravity/scratch/makon-realtor` with property catalog filtering, detail pages, mortgage/installment calculator, guides, realtor profile, saved favorites, and viewing request booking.

**Architecture:** Multi-route Next.js App Router storefront wrapped in a centered `max-w-[430px]` `MobileAppShell` (`TopHeader`, `BottomNav`, `ToastBanner`, native `<dialog>` `BottomSheet`). Data flows through a backend-ready repository/service boundary (`data/` → `propertyRepository.ts` → components) with Zustand persisted client state (`locale`, `saved`, `bookings`) guarded against SSR hydration mismatch.

**Tech Stack:** Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, `lucide-react`, `zustand`, Node 22 built-in `node:test` (`--experimental-strip-types`).

**Spec:** `/home/daler/.gemini/antigravity/brain/93de1c2b-ea14-48bf-890e-14741ce3229f/realtor-mobile-site-design.md`

## Global Constraints

- Target directory: `/home/daler/.gemini/antigravity/scratch/makon-realtor`.
- Mobile frame: centered `max-w-[430px]`, `min-h-dvh`, `overflow-x-clip`, full-bleed on mobile, no horizontal scroll at `375px`.
- Theme tokens: `--bg-backdrop: #F1EDE6`, `--bg-canvas: #FAF8F5`, `--bg-surface: #FFFFFF`, `--bg-muted: #F3EFE8`, `--text-primary: #18181B`, `--text-secondary: #52525B`, `--accent-primary: #1E4D3B`, `--accent-warm: #B45309`, `--border-hairline: #E5DFD5`.
- Approved libraries only: Next.js, TypeScript, Tailwind CSS v4, `lucide-react`, `zustand`.
- Dual language: `uz` and `ru` across all UI strings and entity content (`LocalizedText = { uz: string; ru: string }`).
- Local images under `public/images/` (`images: { unoptimized: true, dangerouslyAllowSVG: true }`).
- Native `<dialog>` for `BottomSheet`; zero `window.alert()`, `window.confirm()`, `window.prompt()`.
- Demo contacts only (`+998 90 000 00 00`, `@makon_realtor_demo`, `hello@makon-estate.example`); never include any personal email.
- Never run `git push`.

## Review Focus

1. **Zero-interest & boundary mortgage inputs** — `annualRate = 0` (`0%` installment), `downPaymentPct = 100`, or `termYears <= 0` must never produce `NaN`, `Infinity`, or negative monthly payments (pinned in Task 2 `tests/mortgage.test.ts`).
2. **SSR hydration mismatch on persisted state** — `TopHeader` saved count badge, `PropertyCard` heart state, and `/saved` lists must render deterministic server defaults until `useHydrated()` is `true` (pinned in Task 3 & Task 6 browser check).
3. **Booking phone & whitespace validation** — Whitespace-only names or malformed Uzbekistan phone numbers (`+998...` with wrong digit count) must reject with localized field errors instead of creating bookings (pinned in Task 2 `tests/validation.test.ts` & Task 4 `BookingSheet`).
4. **Malformed URL params & empty catalog filters** — Unknown `?rooms=99` or overly narrow price/district filters on `/catalog` must never crash; invalid params normalize safely and empty results show the reset CTA (pinned in Task 2 `tests/repository.test.ts` & Task 5 `CatalogClient`).
5. **375px viewport & Russian text wrapping** — Long Russian labels in `BottomNav` (4 tabs) and `PropertyCard` badges must stay single-line/clean without horizontal overflow on `375x812` screens (pinned in Task 3 & Task 6 Chrome DevTools check).

---

## File Structure

- `next.config.ts` — Next.js image config (`unoptimized: true`, `dangerouslyAllowSVG: true`).
- `src/app/globals.css` — Tailwind v4 import, theme tokens, native `<dialog>` bottom sheet animations, carousel snap, focus styles.
- `src/app/layout.tsx` — Fonts (`Plus Jakarta Sans`, `Geist Mono`), viewport metadata, `MobileAppShell`.
- `src/types/realtor.ts` — All domain TypeScript types (`Locale`, `LocalizedText`, `Property`, `PropertyFilter`, `GuideArticle`, `RealtorProfile`, `BookingRequest`, `MortgageInput`, `MortgageResult`).
- `src/lib/i18n.ts` — `uz`/`ru` UI dictionary and `t(locale, key)` / `pickText(localized, locale)` helpers.
- `src/lib/format.ts` — `formatUsd`, `formatUzsApprox`, `formatArea`, `normalizeUzPhone`.
- `src/lib/validation.ts` — `validateBookingInput` returning field-level error keys.
- `src/data/properties.ts` — 9 bilingual Toshkent properties (`sale` & `rent`, `1`–`4` rooms).
- `src/data/content.ts` — Demo realtor profile, 4 services, 4 testimonials, 5 FAQs, 4 detailed guide articles.
- `src/lib/propertyRepository.ts` — `listProperties`, `getPropertyBySlug`, `listFeaturedProperties`, `listGuides`, `getGuideBySlug`, `listDistricts`.
- `src/services/mortgage.ts` — Pure `calculateMortgage` function.
- `public/images/` — Local curated property, guide, and realtor visuals (generated/created locally).
- `src/hooks/useHydrated.ts` — Hydration safety hook.
- `src/stores/{localeStore,savedStore,bookingStore,toastStore}.ts` — Zustand stores.
- `src/components/ui/BottomSheet.tsx` — Accessible `<dialog>` bottom sheet.
- `src/components/shell/{MobileAppShell,TopHeader,BottomNav,ToastBanner}.tsx` — App shell primitives.
- `src/components/property/{PropertyCard,FilterSheet,PropertyGalleryCarousel}.tsx` — Property browsing UI.
- `src/components/booking/BookingSheet.tsx` — Viewing & consultation booking modal.
- `src/components/calculator/CalculatorWidget.tsx` — Interactive mortgage & 0% installment calculator.
- `src/app/page.tsx` + `src/components/home/HomeClient.tsx` — Home route.
- `src/app/catalog/page.tsx` + `src/components/catalog/CatalogClient.tsx` — Catalog route.
- `src/app/property/[slug]/page.tsx` + `src/components/property/PropertyDetailClient.tsx` — Property detail route.
- `src/app/guides/page.tsx` + `src/components/guides/GuidesClient.tsx` — Guides & calculator route.
- `src/app/guides/[slug]/page.tsx` + `src/components/guides/GuideDetailClient.tsx` — Guide article detail route.
- `src/app/realtor/page.tsx` + `src/components/realtor/RealtorClient.tsx` — Realtor profile route.
- `src/app/saved/page.tsx` + `src/components/saved/SavedClient.tsx` — Saved properties & booking history route.
- `src/app/not-found.tsx` — Localized 404 page.
- `tests/{i18n,mortgage,repository,validation}.test.ts` — Node 22 unit tests.

---

### Task 1: Project Scaffold, Theme Tokens, Domain Types & I18n Dictionary

**Files:**
- Create: `/home/daler/.gemini/antigravity/scratch/makon-realtor/package.json` (via `create-next-app`)
- Modify: `/home/daler/.gemini/antigravity/scratch/makon-realtor/next.config.ts`
- Modify: `/home/daler/.gemini/antigravity/scratch/makon-realtor/src/app/globals.css`
- Create: `/home/daler/.gemini/antigravity/scratch/makon-realtor/src/types/realtor.ts`
- Create: `/home/daler/.gemini/antigravity/scratch/makon-realtor/src/lib/i18n.ts`
- Test: `/home/daler/.gemini/antigravity/scratch/makon-realtor/tests/i18n.test.ts`

**Interfaces:**
- Produces: `Locale`, `LocalizedText`, `DealType`, `RoomCount`, `RenovationType`, `DistrictId`, `Property`, `PropertyFilter`, `SortOption`, `GuideCategory`, `GuideArticle`, `RealtorProfile`, `ServiceItem`, `Testimonial`, `FaqItem`, `BookingRequest`, `MortgageInput`, `MortgageResult` in `src/types/realtor.ts`; `translations`, `pickText(text: LocalizedText, locale: Locale): string` in `src/lib/i18n.ts`.

- [ ] **Step 1: Scaffold Next.js project and install approved packages**

Run in `/home/daler/.gemini/antigravity/scratch`:
```bash
npx create-next-app@latest makon-realtor --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
cd /home/daler/.gemini/antigravity/scratch/makon-realtor
npm install lucide-react zustand
```
Copy spec and plan into `docs/superpowers/` inside `makon-realtor` for repo completeness and initialize clean git commit.

- [ ] **Step 2: Configure `next.config.ts` and `src/app/globals.css`**

Update `next.config.ts` with `images: { unoptimized: true, dangerouslyAllowSVG: true }`.
Update `src/app/globals.css` with exact CSS custom properties (`--bg-backdrop: #F1EDE6`, `--bg-canvas: #FAF8F5`, `--bg-surface: #FFFFFF`, `--bg-muted: #F3EFE8`, `--text-primary: #18181B`, `--text-secondary: #52525B`, `--accent-primary: #1E4D3B`, `--accent-warm: #B45309`, `--border-hairline: #E5DFD5`), `@theme inline`, `.tabular-nums`, `.no-scrollbar`, native `dialog.makon-sheet` bottom-sheet transitions, and `.makon-carousel-track` scroll-snap rules.

- [ ] **Step 3: Create `src/types/realtor.ts`**

Define all domain interfaces and union types listed in Interfaces above.

- [ ] **Step 4: Write failing unit test `tests/i18n.test.ts`**

```ts
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
```

- [ ] **Step 5: Run test to verify it fails, implement `src/lib/i18n.ts`, re-run test**

Run: `node --experimental-strip-types --test tests/i18n.test.ts` (expect fail before file exists, then PASS after implementing `src/lib/i18n.ts`). Note: `src/lib/i18n.ts` imports `../types/realtor.ts` via relative path so Node 22 strip-types runs natively.

- [ ] **Step 6: Verify TypeScript & Commit**

Run: `npx tsc --noEmit && node --experimental-strip-types --test tests/i18n.test.ts`
Expected: 0 errors, all tests pass. Commit `chore: scaffold makon-realtor with tokens, types, and i18n`.

---

### Task 2: Formatting, Validation, Mortgage Calculator, Demo Data & Repository (TDD)

**Files:**
- Create: `src/lib/format.ts`
- Create: `src/lib/validation.ts`
- Create: `src/services/mortgage.ts`
- Create: `src/data/properties.ts`
- Create: `src/data/content.ts`
- Create: `src/lib/propertyRepository.ts`
- Create: `public/images/properties/*.png` (or `.svg` / generated images) & `public/images/guides/*` & `public/images/realtor/*`
- Test: `tests/mortgage.test.ts`
- Test: `tests/validation.test.ts`
- Test: `tests/repository.test.ts`

**Interfaces:**
- Consumes: `src/types/realtor.ts`
- Produces:
  - `formatUsd(amount: number): string`
  - `formatUzsApprox(usdAmount: number, rate?: number, locale?: Locale): string`
  - `formatArea(sqm: number, locale: Locale): string`
  - `normalizeUzPhone(raw: string): string | null`
  - `validateBookingInput(input: { clientName: string; phone: string; preferredDate: string; preferredTime: string }): Record<string, string>`
  - `calculateMortgage(input: MortgageInput): MortgageResult`
  - `listProperties(filter?: PropertyFilter): Property[]`
  - `getPropertyBySlug(slug: string): Property | undefined`
  - `listFeaturedProperties(limit?: number): Property[]`
  - `listGuides(category?: GuideCategory | 'all'): GuideArticle[]`
  - `getGuideBySlug(slug: string): GuideArticle | undefined`
  - `listDistricts(): { id: DistrictId; name: LocalizedText }[]`

- [ ] **Step 1: Write failing tests (`tests/mortgage.test.ts`, `tests/validation.test.ts`, `tests/repository.test.ts`)**

Cover:
- `mortgage.test.ts`:
  - standard 20% down payment, 15 years, 18% annual rate on `$100,000` -> accurate annuity `monthlyPayment` (~`$1,288`) and `loanAmount === 80000`.
  - `0%` installment (`annualRate: 0`) -> exact `loanAmount / months`, `totalInterest === 0`, no `NaN`.
  - `100%` down payment or clamped negative inputs -> `loanAmount === 0`, `monthlyPayment === 0`.
- `validation.test.ts`:
  - valid `"+998 90 123 45 67"` and `"901234567"` -> normalized `"+998901234567"`.
  - invalid short phone `"12345"` -> `null` + error key `"phoneInvalid"`.
  - whitespace-only name `"   "` -> error key `"nameRequired"`.
- `repository.test.ts`:
  - filtering by `dealType: "rent"`, `rooms: [2]`, `districts: ["chilonzor"]`, `minUsd`/`maxUsd`, text query `q` matching `uz` or `ru` title/district.
  - sorting `price_asc`, `price_desc`, `area_desc`.
  - malformed/impossible filters returning `[]` without throwing.
  - `getPropertyBySlug` returning matching property or `undefined`.

- [ ] **Step 2: Run tests to verify failure**

Run: `node --experimental-strip-types --test tests/mortgage.test.ts tests/validation.test.ts tests/repository.test.ts`
Expected: FAIL (modules not found).

- [ ] **Step 3: Implement `src/lib/format.ts`, `src/lib/validation.ts`, `src/services/mortgage.ts`**

Implement pure functions matching exact signatures above, using relative imports (`../types/realtor.ts`).

- [ ] **Step 4: Generate/create local image assets in `public/images/` and implement `src/data/properties.ts`, `src/data/content.ts`, `src/lib/propertyRepository.ts`**

Use `image-generator` subagent (or crisp architectural local assets) to produce high-quality local visuals for interiors/exteriors, realtor portrait, and district guides under `public/images/` so zero external URLs can fail. Populate 9 realistic Toshkent properties (`1`, `2`, `3`, `4` rooms; `sale` & `rent`; Chilonzor, Yunusobod, Mirzo Ulug‘bek, Shayxontohur, Yakkasaroy, Mirobod), realtor profile (`Azizbek Rahimov · MAKON Estate`), 4 services, 4 testimonials, 5 FAQs, and 4 multi-section bilingual guide articles. Ensure zero personal email PII (`hello@makon-estate.example`, `+998 90 000 00 00`, `@makon_realtor_demo`).

- [ ] **Step 5: Run all unit tests + `tsc --noEmit` and commit**

Run: `node --experimental-strip-types --test tests/*.test.ts && npx tsc --noEmit`
Expected: All unit tests pass, 0 TypeScript errors. Commit `feat: add domain services, validation, demo real-estate data, and repository`.

---

### Task 3: Zustand Stores, Hydration Hook & Mobile App Shell

**Files:**
- Create: `src/hooks/useHydrated.ts`
- Create: `src/stores/localeStore.ts`
- Create: `src/stores/savedStore.ts`
- Create: `src/stores/bookingStore.ts`
- Create: `src/stores/toastStore.ts`
- Create: `src/components/ui/BottomSheet.tsx`
- Create: `src/components/shell/TopHeader.tsx`
- Create: `src/components/shell/BottomNav.tsx`
- Create: `src/components/shell/ToastBanner.tsx`
- Create: `src/components/shell/MobileAppShell.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `src/types/realtor.ts`, `src/lib/i18n.ts`
- Produces:
  - `useHydrated(): boolean`
  - `useLocaleStore()` (`locale`, `setLocale`, `toggleLocale`)
  - `useSavedStore()` (`savedIds`, `toggleSaved`, `clearSaved`)
  - `useBookingStore()` (`bookings`, `addBooking`)
  - `useToastStore()` (`message`, `showToast`, `hideToast`)
  - `BottomSheet({ open, onClose, title, children })`
  - `MobileAppShell({ children })`

- [ ] **Step 1: Implement `useHydrated` and the 4 Zustand stores**

Persist `localeStore`, `savedStore`, and `bookingStore` to `localStorage` under `makon-*` keys using `zustand/middleware` `persist`. Keep `toastStore` in-memory with auto-dismiss timer cleanup.

- [ ] **Step 2: Implement `BottomSheet.tsx`**

Use native `<dialog className="makon-sheet">` with `showModal()`, `Escape` handling, backdrop click dismissal, body scroll lock, sticky header with close button (`min-h-[44px] min-w-[44px]`), `aria-labelledby`, and safe scrollable content region.

- [ ] **Step 3: Implement `TopHeader.tsx`, `BottomNav.tsx`, `ToastBanner.tsx`, `MobileAppShell.tsx`, and update `src/app/layout.tsx`**

- `TopHeader`: Brand mark + `MAKON · Azizbek`, compact `UZ / RU` pill switch, `/saved` link showing saved count badge only after `useHydrated()` is `true`.
- `BottomNav`: 4 tabs (`/`, `/catalog`, `/guides`, `/realtor`), icons from `lucide-react`, concise `uz`/`ru` labels styled (`text-[11px] leading-tight whitespace-nowrap`) so 375px width never wraps or clips.
- `layout.tsx`: Load `Plus_Jakarta_Sans` and `Geist_Mono` via `next/font/google`, set `Viewport` (`width: "device-width"`, `initialScale: 1`, `viewportFit: "cover"`, `themeColor: "#FAF8F5"`), wrap `{children}` with `<MobileAppShell>`.

- [ ] **Step 4: Run `npx tsc --noEmit && npm run lint` and commit**

Expected: 0 errors, 0 lint warnings. Commit `feat: add persisted client stores, accessible BottomSheet, and MobileAppShell`.

---

### Task 4: Reusable Property, Filter, Calculator & Booking Components

**Files:**
- Create: `src/components/property/PropertyCard.tsx`
- Create: `src/components/property/FilterSheet.tsx`
- Create: `src/components/property/PropertyGalleryCarousel.tsx`
- Create: `src/components/booking/BookingSheet.tsx`
- Create: `src/components/calculator/CalculatorWidget.tsx`

**Interfaces:**
- Consumes: `src/types/realtor.ts`, `src/lib/i18n.ts`, `src/lib/format.ts`, `src/lib/validation.ts`, `src/services/mortgage.ts`, `src/lib/propertyRepository.ts`, `src/stores/*`, `src/components/ui/BottomSheet.tsx`
- Produces:
  - `PropertyCard({ property: Property, priority?: boolean })`
  - `FilterSheet({ open: boolean, onClose: () => void, value: PropertyFilter, onApply: (next: PropertyFilter) => void, onReset: () => void })`
  - `PropertyGalleryCarousel({ images: string[], title: string })`
  - `BookingSheet({ open: boolean, onClose: () => void, property?: Property })`
  - `CalculatorWidget({ initialPriceUsd?: number, compact?: boolean })`

- [ ] **Step 1: Implement `PropertyCard.tsx` and `PropertyGalleryCarousel.tsx`**

Ensure `<Image>` uses local `/images/...` paths, `PropertyCard` shows `dealType` badge, optional promo badge, save button (`useSavedStore` + `useToastStore`, hydrated safely), specs (`X xona · Y m² · Z/N`), district, USD + approximate UZS price, and full link to `/property/[slug]`.

- [ ] **Step 2: Implement `FilterSheet.tsx`**

Inside `<BottomSheet>`, render dealType selector (`all` / `sale` / `rent`), multi-select room chips (`1`, `2`, `3`, `4+`), multi-select district chips, renovation pills (`euro`, `designer`, `cosmetic`, `box`), min/max USD inputs, and sticky bottom Reset + Apply buttons.

- [ ] **Step 3: Implement `BookingSheet.tsx`**

Inside `<BottomSheet>`, display optional selected property summary, inputs for `clientName`, `phone`, `preferredDate` (default tomorrow), `preferredTime` chips (`10:00`, `13:00`, `16:00`, `18:30`), and optional `note`. Validate via `validateBookingInput`; on success save via `useBookingStore.addBooking`, show success confirmation state inside sheet + `useToastStore.showToast`, and clear errors on input edit.

- [ ] **Step 4: Implement `CalculatorWidget.tsx`**

Support `Ipoteka` (interest rate `8%–26%`) and `0% Bo'lib to'lash` (`annualRate = 0`) mode toggle, synchronized range + numeric inputs for property price (`$20,000–$400,000`), down payment (`10%–80%`), term (`1–20` years), and annual interest (`0%–26%`). Display live `monthlyPayment`, `loanAmount`, `downPaymentAmount`, and `totalInterest` in USD and approximate UZS.

- [ ] **Step 5: Run `npx tsc --noEmit && npm run lint` and commit**

Expected: Clean pass. Commit `feat: add property cards, filter sheet, gallery carousel, booking sheet, and mortgage calculator`.

---

### Task 5: App Pages & Complete Client Flows

**Files:**
- Create: `src/components/home/HomeClient.tsx` & modify `src/app/page.tsx`
- Create: `src/components/catalog/CatalogClient.tsx` & `src/app/catalog/page.tsx`
- Create: `src/components/property/PropertyDetailClient.tsx` & `src/app/property/[slug]/page.tsx`
- Create: `src/components/guides/GuidesClient.tsx` & `src/app/guides/page.tsx`
- Create: `src/components/guides/GuideDetailClient.tsx` & `src/app/guides/[slug]/page.tsx`
- Create: `src/components/realtor/RealtorClient.tsx` & `src/app/realtor/page.tsx`
- Create: `src/components/saved/SavedClient.tsx` & `src/app/saved/page.tsx`
- Create: `src/app/not-found.tsx`

**Interfaces:**
- Consumes: `src/lib/propertyRepository.ts`, `src/data/content.ts`, `src/components/*`, `src/stores/*`

- [ ] **Step 1: Implement `/` (`HomeClient.tsx`, `src/app/page.tsx`)**

Include realtor hero card with demo portrait & trust metrics, quick search bar submitting to `/catalog?q=...`, horizontal room/deal chips (`1 xona`..`4+ xona`, `Sotuv`, `Ijara`), 4 featured `PropertyCard`s, interactive calculator promo banner linking to `/guides#calculator`, services overview, testimonials snippet, and `BookingSheet` trigger.

- [ ] **Step 2: Implement `/catalog` (`CatalogClient.tsx`, `src/app/catalog/page.tsx`)**

Wrap client query-param parsing in `<Suspense>` cleanly for Next.js App Router static/dynamic builds. Parse `dealType`, `rooms`, `districts`, `renovation`, `minUsd`, `maxUsd`, `q`, `sort` safely (ignoring invalid params). Include `FilterSheet`, active filter pills with single-tap clear, result count, and empty-state reset card.

- [ ] **Step 3: Implement `/property/[slug]` (`PropertyDetailClient.tsx`, `src/app/property/[slug]/page.tsx`)**

Use `generateStaticParams` for all demo property slugs + `notFound()` fallback. Render `PropertyGalleryCarousel`, save & share buttons (clipboard copy with fallback + toast), USD + UZS price, technical specs grid, amenities chips, inline mortgage estimate for `sale` listings linking to `/guides?price=<priceUsd>#calculator`, realtor mini-card, and sticky action bar (`Telegram`, `Qo'ng'iroq`, `Ko'rikka yozilish` opening `BookingSheet`).

- [ ] **Step 4: Implement `/guides` & `/guides/[slug]`**

Render `CalculatorWidget` (reading optional `?price=` param) at `#calculator`, category filter pills (`all`, `district`, `buying`, `mortgage`), guide cards, and full `/guides/[slug]` reading view with `generateStaticParams`, structured sections, checklists, and consultation CTA.

- [ ] **Step 5: Implement `/realtor`, `/saved`, and `not-found.tsx`**

- `/realtor`: Full realtor profile, credentials, 4 services, 4-step work timeline, testimonials list, accessible FAQ accordion (`<button aria-expanded>`), and `BookingSheet` trigger.
- `/saved`: Hydrated tabs (`Sevimlilar` / `Arizalarim`), remove-from-saved button, booking status cards, and empty states with links.
- `not-found.tsx`: Bilingual 404 screen with return-home link.

- [ ] **Step 6: Run `npx tsc --noEmit && npm run lint && npm run build` and commit**

Expected: Build succeeds cleanly with all routes compiled. Commit `feat: implement all mobile realtor pages and interactive flows`.

---

### Task 6: Final Verification, Browser Visual Grounding & Regression Testing

**Files:**
- Verify only (fix any issues discovered during verification).

- [ ] **Step 1: Run full unit test suite & static checks**

```bash
cd /home/daler/.gemini/antigravity/scratch/makon-realtor
node --experimental-strip-types --test tests/*.test.ts
npx tsc --noEmit
npm run lint
npm run build
```
Expected: All unit tests pass, 0 TypeScript/lint errors, production build green.

- [ ] **Step 2: Start production server and verify via Headless/Chrome DevTools at `375x812`**

Run `npm run start -- -p 3105` (or available port) and verify interactively in mobile viewport (`375x812`) plus desktop check (`1280x800`):
- All routes load with 200 status and zero console/network errors; all local images load (`naturalWidth > 0`).
- Zero horizontal overflow (`document.documentElement.scrollWidth <= window.innerWidth`).
- Toggle `UZ` <-> `RU` updates header, bottom nav, property cards, and guides cleanly without overlapping text.
- `/catalog`: test `FilterSheet` (open, Escape/backdrop close, apply room & deal filters, empty state reset).
- `/property/[slug]`: test gallery carousel, wishlist toggle persistence across reload, share toast, `BookingSheet` invalid input errors + valid submission appearing in `/saved` -> `Arizalarim`.
- `/guides`: test `CalculatorWidget` both in interest mode and `0%` installment mode.
- Visually inspect captured screenshots across Home, Catalog, Property Detail, Guides/Calculator, and Realtor pages.

- [ ] **Step 3: Stop temporary test server & ensure clean final git state**

Verify `git status` is clean after any final fixes and re-run tests + build after final edit.
