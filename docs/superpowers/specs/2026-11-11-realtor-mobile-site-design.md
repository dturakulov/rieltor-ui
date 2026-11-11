# Design Spec: Rieltor uchun Shaxsiy Mobil Veb-Sayt (`MAKON Estate`)

**Maqsadli papka:** `/home/daler/.gemini/antigravity/scratch/makon-realtor`  
**Stek:** Next.js (App Router), TypeScript, Tailwind CSS v4, `lucide-react`, `zustand`  
**Tillar:** O‘zbekcha (`uz`) va Ruscha (`ru`)  
**Format:** Mobile App Shell (`max-w-[430px]` markazlashgan mobil korpus + pastki navigatsiya)

---

## 1. Umumiy Arxitektura va Vizual Tizim

### 1.1. Vizual til va tokenlar
Sayt ishonch uyg‘otadigan zamonaviy me’moriy-editorial uslubda quriladi:
- **Ranglar:**
  - `--bg-backdrop`: `#F1EDE6` (desktopdagi tashqi fon)
  - `--bg-canvas`: `#FAF8F5` (asosiy mobil sahifa foni)
  - `--bg-surface`: `#FFFFFF` (kartalar va sheet modallar)
  - `--bg-muted`: `#F3EFE8` (chip va ikkilamchi bloklar)
  - `--text-primary`: `#18181B`
  - `--text-secondary`: `#52525B`
  - `--accent-primary`: `#1E4D3B` (asosiy CTA va brend aksenti — chuqur zumrad)
  - `--accent-warm`: `#B45309` (badge va tanlangan urg‘ular — issiq bronza)
  - `--border-hairline`: `#E5DFD5`
- **Tipografiya:** Sarlavha va matnlar uchun `Plus Jakarta Sans` (yoki `Geist`), narxlar, maydon (`m²`) va kalkulyator raqamlari uchun `tabular-nums` + `Geist Mono`.
- **Mikro-interaksiyalar:** Barcha tugma va kartalarda `transition`, `hover`, `focus-visible` halqasi va `active:scale-[0.98]`; `min-h-[44px]` barmoq tegish zonalari.

### 1.2. `MobileAppShell` tuzilmasi
- **Outer Frame:** Desktopda markazlashtirilgan `max-w-[430px]`, `min-h-dvh`, ingichka chegara va yumshoq soya; telefonda to‘liq `100%` kenglik, gorizontal scroll yo‘q (`overflow-x-clip`).
- **Sticky `TopHeader` (56px):**
  - Chapda: brend belgisi va rieltor nomi (**MAKON · Azizbek**).
  - O‘ngda: `UZ / RU` til almashtirgich hamda Saqlanganlar (`/saved`) tugmasi (saqlanganlar soni badge bilan).
- **Sticky `BottomNav` (4 ta tab):**
  1. **Bosh sahifa (`/`)**
  2. **Obyektlar (`/catalog`)**
  3. **Foydali (`/guides`)**
  4. **Rieltor (`/realtor`)**
- **`ToastBanner`:** BottomNav ustida qisqa suzuvchi bildirishnoma (masalan, sevimliga qo‘shilganda, link nusxalanganda yoki ko‘rik arizasi yuborilganda).

---

## 2. Sahifalar (Routes) va Funksional Tarkib

1. **`/` — Bosh sahifa (Home):**
   - Rieltor qisqa vizitka-hero kartasi (rasm/avatar, tajriba va bitimlar statistikasi, "Obyektlar" va "Ko‘rikka yozilish" tugmalari).
   - Tezkor xona va bitim chip-filtrlari (`1 xona`, `2 xona`, `3 xona`, `4+ xona`, `Sotuv`, `Ijara`) — bosilganda `/catalog` ga tegishli query param bilan o‘tadi.
   - "Tanlangan obyektlar" bo‘limi (4 ta top obyekt kartasi + "Barchasini ko‘rish").
   - "Ipoteka kalkulyatori" tezkor kirish kartasi (`/guides#calculator` ga olib boradi).
   - Xizmatlar qisqa ro‘yxati, mijozlar fikrlari slayderi va yakuniy maslahat/ko‘rik CTA.

2. **`/catalog` — Xonalar va Kvartiralar Katalogi:**
   - Sotuv / Ijara / Barchasi segmentli tugma va matnli qidiruv (tuman, ko‘cha, nom bo‘yicha).
   - Saralash (`Tavsiya etilgan`, `Avval arzonlari`, `Avval qimmatlari`, `Katta maydon`) va `FilterSheet` tugmasi (faol filtrlar soni bilan).
   - `FilterSheet` (BottomSheet): Bitim turi (`sale`/`rent`), Xonalar soni (`1`, `2`, `3`, `4+`), Tumanlar (Chilonzor, Yunusobod, Mirzo Ulug‘bek, Shayxontohur, Yakkasaroy, Mirobod), Ta’mir holati (`euro`, `designer`, `cosmetic`, `box`), Narx oralig‘i (`minUsd` – `maxUsd`).
   - Filtr natijasi bo‘sh bo‘lsa: tushunarli bo‘sh holat kartasi va "Filtrlarni tozalash" tugmasi.

3. **`/property/[slug]` — Obyekt Batafsil Sahifasi:**
   - Swipe/tugmali `PropertyGalleryCarousel` (rasmlar + slayd indikatori), yurakcha (Sevimli) va Ulashish (URL nusxalash) tugmalari.
   - Narx: USD (`$118,000`) va taxminiy so‘mdagi ekvivalent, `Sotuv` / `Ijara` badge.
   - Asosiy texnik ko‘rsatkichlar: xonalar soni, maydon (`m²`), qavat (`4/9`), tuman, ta’mir turi, bino turi.
   - Batafsil tavsif va qulayliklar ro‘yxati (metroga yaqinlik, parkovka, lift, konditsioner va h.k.).
   - Sotuv obyektlari uchun shu uy narxiga bog‘langan tezkor oylik ipoteka hisobi kartasi (`/guides` dagi to‘liq kalkulyatorga o‘tish imkoniyati bilan).
   - Pastki yopishqoq panel: **Telegram**, **Qo‘ng‘iroq** va asosiy **"Ko‘rikka yozilish"** (`BookingSheet`) tugmasi.

4. **`/guides` va `/guides/[slug]` — Foydali Kontentlar va Kalkulyator:**
   - Yuqori qismda interaktiv **`CalculatorWidget`** (`id="calculator"`):
     - Rejim: `Ipoteka` yoki `0% Bo‘lib to‘lash`.
     - Kiritmalar: Uy narxi (`$`), Boshlang‘ich to‘lov (`%` slader/input, masalan `15%–70%`), Muddat (`1–20 yil`), Yillik foiz (`0%–26%`).
     - Natija: Oylik to‘lov (`$` va taxminiy `so‘m`), Kredit summasi, Umumiy to‘lov va Foiz xarajati.
   - Pastki qismda **Foydali maqolalar va hududlar sharhi**: kategoriya filtrlari (`Barchasi`, `Hududlar`, `Xarid`, `Ipoteka`) va 4–5 ta maqola kartasi.
   - `/guides/[slug]` sahifasida to‘liq o‘qish formati, cheklistlar va konsultatsiya/katalogga o‘tish CTA.

5. **`/realtor` — Rieltor Shaxsiy Profili:**
   - Rieltor haqida batafsil ma’lumot (demo persona: **Azizbek Rahimov · MAKON Estate**, Toshkent bo‘yicha 7 yillik tajriba, 140+ bitim, 98% tavsiya).
   - Xizmatlar (Sotib olish, Sotish, Ijara, Huquqiy ekspertiza), 4 bosqichli ish jarayoni, mijozlar fikrlari va FAQ akkordeoni.
   - Shaxsiy konsultatsiya / ko‘rikka yozilish (`BookingSheet`) va aloqa kanallari (`tel:`, `https://t.me/...` demo havola).

6. **`/saved` — Saqlanganlar va Arizalar:**
   - Tab 1 (`Sevimlilar`): Saqlangan obyektlar ro‘yxati, bo‘sh bo‘lsa katalogga yo‘naltirish.
   - Tab 2 (`Arizalarim`): Foydalanuvchi yuborgan ko‘rik va konsultatsiya so‘rovlari tarixi.

7. **`not-found.tsx`:** Topilmagan obyekt yoki sahifa uchun ikki tilli 404 sahifa.

---

## 3. Ma’lumotlar Modeli, Repository va State Oqimi

### 3.1. Tiplar (`src/types/realtor.ts`)
- `Locale = 'uz' | 'ru'`
- `LocalizedText = { uz: string; ru: string }`
- `Property`: `id`, `slug`, `dealType` (`'sale' | 'rent'`), `category` (`'apartment' | 'studio' | 'house'`), `rooms` (`1 | 2 | 3 | 4`), `areaSqm`, `floor`, `totalFloors`, `priceUsd`, `districtId`, `districtName: LocalizedText`, `address: LocalizedText`, `title: LocalizedText`, `description: LocalizedText`, `renovation` (`'euro' | 'designer' | 'cosmetic' | 'box'`), `amenities: LocalizedText[]`, `images: string[]`, `featured: boolean`, `badge?: LocalizedText`, `createdAt: string`.
- `GuideArticle`: `id`, `slug`, `category` (`'district' | 'buying' | 'mortgage'`), `readTimeMin`, `coverImage`, `title`, `excerpt`, `sections: { heading: LocalizedText; body: LocalizedText; bullets?: LocalizedText[] }[]`.
- `BookingRequest`: `id`, `propertySlug?`, `propertyTitle?`, `clientName`, `phone`, `preferredDate`, `preferredTime`, `note?`, `createdAt`.

### 3.2. Ajratilgan qatlamlar (Backend-ready)
- `src/data/properties.ts` & `src/data/content.ts`: 9 ta Toshkent tumanlaridagi obyekt (sotuv va ijara, 1–4 xonali) hamda 4 ta batafsil maqola, xizmatlar, fikrlar va FAQ.
- `src/lib/propertyRepository.ts`: `listProperties(filter)`, `getPropertyBySlug(slug)`, `listFeaturedProperties()`, `listGuides(category?)`, `getGuideBySlug(slug)`. Kelajakda Python FastAPI/Django API ga ulashda faqat shu repository funksiyalari `fetch` ga almashtiriladi.
- `src/services/mortgage.ts`: Anuitet va `0%` bo‘lib to‘lash formulasini hisoblaydigan sof funksiya (`calculateMortgage`).
- `src/lib/i18n.ts`: Barcha UI matnlar, statuslar, filter yorliqlari va xatolik xabarlari uchun `uz` / `ru` lug‘at.
- `src/stores/` (`zustand` + `persist`):
  - `localeStore.ts` (`locale`, `setLocale`, `toggleLocale`)
  - `savedStore.ts` (`savedIds`, `toggleSaved`, `isSaved`)
  - `bookingStore.ts` (`bookings`, `addBooking`)
  - `toastStore.ts` (`message`, `showToast`, `hideToast`)
  - `useHydrated.ts` hooki SSR va client `localStorage` orasidagi hydration mismatchni oldini oladi.

---

## 4. Xatoliklar, Chegaralar va Media

- **Lokal rasmlar (`public/images/`):** Tashqi serverlarga bog‘liq bo‘lmasligi va har doim tez ochilishi uchun barcha obyekt va maqola rasmlari lokal assetlar sifatida saqlanadi.
- **Modallar (`BottomSheet`):** `Escape` tugmasi, tashqi fon bosilganda yopilish, scroll lock va `role="dialog"` / `aria-modal="true"` bilan boshqariladi. Native `alert()`/`confirm()` ishlatilmaydi.
- **Forma validatsiyasi (`BookingSheet`):** Ism (kamida 2 belgi), telefon raqami (`+998` formati tekshiruvi), qulay sana va vaqt majburiy maydonlar; xatolar maydon ostida ko‘rsatiladi.
- **Maxfiylik:** Demo ma’lumotlarda faqat xavfsiz namunaviy kontaktlar (`+998 90 000 00 00`, `@makon_realtor_demo`, `hello@makon-estate.example`) ishlatiladi.

---

## 5. Tekshirish va Testlash Rejasi

1. **Unit testlar (`node --test`):**
   - `mortgage.ts`: standart foizli ipoteka, `0%` bo‘lib to‘lash, `100%` boshlang‘ich to‘lov va noto‘g‘ri/manfiy qiymatlardan himoya.
   - `propertyRepository.ts`: bitim turi, xonalar soni, tuman, narx oralig‘i va saralash mantiqlari.
2. **Statik tekshiruv:** `npx tsc --noEmit`, `npm run lint`, `npm run build`.
3. **Brauzer tekshiruvi (`375x812` mobil viewport):**
   - Barcha sahifalarda gorizontal overflow yo‘qligi.
   - `UZ / RU` almashtirgich barcha sahifalarda ishlashi.
   - Katalog filtrlari va bo‘sh natija holati.
   - Sevimliga qo‘shish va `/saved` da saqlanishi.
   - Kalkulyator hisob-kitobi va `BookingSheet` orqali ko‘rikka yozilish oqimi.
