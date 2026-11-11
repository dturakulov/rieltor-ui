import type { Locale, LocalizedText, RenovationType } from "../types/realtor.ts";

export const translations = {
  uz: {
    brandName: "MAKON",
    realtorShort: "Azizbek",
    navHome: "Bosh sahifa",
    navCatalog: "Obyektlar",
    navGuides: "Foydali",
    navRealtor: "Rieltor",
    savedLinkLabel: "Saqlangan obyektlar",
    langToggleLabel: "Tilni almashtirish",

    heroEyebrow: "Shaxsiy ko'chmas mulk maslahatchisi · Toshkent",
    heroTitle: "Orzuingizdagi xonadonni tekshirilgan bazadan toping",
    heroSubtitle:
      "Hujjatlari toza kvartira va xonalar, shaffof narxlar hamda shaxsiy ko'rik tashkili.",
    heroBookCta: "Ko'rikka yozilish",
    heroCatalogCta: "Barcha obyektlar",
    statYears: "yil tajriba",
    statDeals: "yopilgan bitim",
    statTrust: "mamnun mijoz",

    searchPlaceholder: "Tuman, ko'cha yoki xonadon nomi...",
    searchBtn: "Qidirish",
    quickFilterTitle: "Tezkor tanlov",
    chip1Room: "1 xona",
    chip2Rooms: "2 xona",
    chip3Rooms: "3 xona",
    chip4Rooms: "4+ xona",
    chipSale: "Sotuv",
    chipRent: "Ijara",

    featuredTitle: "Tanlangan obyektlar",
    viewAll: "Barchasi",
    calcBannerEyebrow: "Onlayn hisob-kitob",
    calcBannerTitle: "Ipoteka va 0% bo'lib to'lash kalkulyatori",
    calcBannerSubtitle:
      "Boshlang'ich to'lov va oylik to'lov miqdorini 10 soniyada hisoblang.",
    calcBannerCta: "Hisoblash",

    servicesTitle: "Rieltor xizmatlari",
    testimonialsTitle: "Mijozlar fikrlari",
    homeFinalTitle: "Aniq talabingiz bormi?",
    homeFinalSubtitle:
      "Byudjet va tumaningizni qoldiring — 3 ta mos variantni tayyorlab ko'rikka olib boraman.",

    dealAll: "Barchasi",
    dealSale: "Sotuv",
    dealRent: "Ijara",
    perMonth: "/ oy",
    roomsShort: "xona",
    floorLabel: "Qavat",
    areaLabel: "Maydon",
    districtLabel: "Tuman",
    renovationLabel: "Ta'mir",
    buildingLabel: "Bino",

    catalogTitle: "Xonalar va kvartiralar",
    catalogSubtitle: "Tekshirilgan sotuv va ijara obyektlari",
    filtersBtn: "Filtrlar",
    sortFeatured: "Tavsiya etilgan",
    sortPriceAsc: "Avval arzonlari",
    sortPriceDesc: "Avval qimmatlari",
    sortAreaDesc: "Katta maydon",
    resultsCountSuffix: "ta obyekt",
    clearFilters: "Filtrlarni tozalash",
    emptyTitle: "Bu mezonlar bo'yicha obyekt topilmadi",
    emptySubtitle:
      "Xonalar sonini kengaytiring yoki narx va tuman filtrlarini tozalab ko'ring.",

    filterSheetTitle: "Obyektlarni filtrlash",
    filterDealType: "Bitim turi",
    filterRooms: "Xonalar soni",
    filterDistricts: "Tumanlar",
    filterRenovation: "Ta'mir holati",
    filterPriceUsd: "Narx diapazoni (USD)",
    filterMinUsd: "Dan ($)",
    filterMaxUsd: "Gacha ($)",
    filterReset: "Tozalash",
    filterApply: "Qo'llash",

    renovationAll: "Barchasi",
    renovationEuro: "Yevrota'mir",
    renovationDesigner: "Dizaynerlik",
    renovationCosmetic: "Yaxshi holat",
    renovationBox: "Karobka",

    saveAdd: "Saqlash",
    saveRemove: "Saqlangan",
    toastSavedAdded: "Obyekt saqlanganlarga qo'shildi",
    toastSavedRemoved: "Obyekt saqlanganlardan olindi",
    toastLinkCopied: "Obyekt havolasi nusxalandi",
    toastBookingCreated: "Ko'rik so'rovingiz qabul qilindi",

    backLabel: "Orqaga",
    shareLabel: "Ulashish",
    specsTitle: "Texnik ma'lumotlar",
    descriptionTitle: "Obyekt haqida",
    amenitiesTitle: "Qulayliklar",
    inlineCalcTitle: "Taxminiy oylik ipoteka",
    inlineCalcNote: "20% boshlang'ich to'lov, 15 yil, yillik 18% misolida",
    inlineCalcOpen: "Batafsil hisoblash",
    realtorBarRole: "Shaxsiy rieltor",
    telegramAction: "Telegram",
    callAction: "Qo'ng'iroq",
    bookViewingAction: "Ko'rikka yozilish",

    bookingTitle: "Ko'rikka yozilish",
    bookingSubtitle:
      "Qulay kun va vaqtni belgilang — rieltor bog'lanib uchrashuvni tasdiqlaydi.",
    bookingNameLabel: "Ismingiz",
    bookingNamePlaceholder: "Masalan: Jasur Alimov",
    bookingPhoneLabel: "Telefon raqamingiz",
    bookingPhonePlaceholder: "+998 90 123 45 67",
    bookingDateLabel: "Qulay sana",
    bookingTimeLabel: "Qulay vaqt",
    bookingNoteLabel: "Izoh (ixtiyoriy)",
    bookingNotePlaceholder: "Masalan: kechki soatlarda ko'rish qulay",
    bookingSubmit: "So'rov yuborish",
    bookingSuccessTitle: "Arizangiz qabul qilindi",
    bookingSuccessBody:
      "Tez orada siz bilan bog'lanib ko'rik vaqtini tasdiqlaymiz. Arizangiz Saqlanganlar bo'limida ham saqlandi.",
    bookingSuccessCta: "Arizalarimni ko'rish",
    bookingClose: "Yopish",

    errNameRequired: "Kamida 2 ta harfdan iborat ism kiriting",
    errPhoneInvalid: "O'zbekiston raqamini to'g'ri kiriting (+998 XX XXX XX XX)",
    errDateRequired: "Ko'rik sanasini tanlang",
    errTimeRequired: "Qulay vaqtni tanlang",

    guidesTitle: "Foydali bo'lim va hisob",
    guidesSubtitle:
      "To'lovni oldindan hisoblang hamda tumanlar va hujjatlar bo'yicha qo'llanmalarni o'qing.",
    calcTitle: "Ipoteka va to'lov kalkulyatori",
    calcModeMortgage: "Ipoteka",
    calcModeInstallment: "0% Bo'lib to'lash",
    calcPriceLabel: "Uy narxi (USD)",
    calcDownPaymentLabel: "Boshlang'ich to'lov",
    calcTermLabel: "Muddat (yil)",
    calcRateLabel: "Yillik foiz stavkasi",
    calcMonthlyResult: "Oylik to'lov",
    calcLoanAmount: "Qoldiq / Kredit",
    calcDownAmount: "Boshlang'ich summa",
    calcTotalInterest: "Foiz ustamasi",
    calcZeroRateNote: "0% bo'lib to'lashda foiz ustamasi hisoblanmaydi.",

    guidesArticlesTitle: "Qo'llanmalar va hududlar sharhi",
    guideCatAll: "Barchasi",
    guideCatDistrict: "Hududlar",
    guideCatBuying: "Xarid",
    guideCatMortgage: "Ipoteka",
    readTimeSuffix: "daq o'qish",
    readMore: "O'qish",
    guideCtaTitle: "Savolingiz bormi?",
    guideCtaBody:
      "Aniq xonadon yoki hujjat tekshiruvi bo'yicha shaxsiy maslahat olishingiz mumkin.",

    realtorPageTitle: "Shaxsiy rieltor profili",
    realtorCredentialsTitle: "Tajriba va kafolatlar",
    realtorWorkflowTitle: "Qanday ishlaymiz",
    realtorFaqTitle: "Ko'p beriladigan savollar",
    realtorContactTitle: "Tezkor aloqa",

    savedPageTitle: "Saqlanganlar",
    savedTabFavorites: "Sevimlilar",
    savedTabBookings: "Arizalarim",
    savedEmptyTitle: "Hozircha saqlangan obyektlar yo'q",
    savedEmptyBody:
      "Yoqqan xonadonlarni yurakcha orqali saqlab qo'ying — ularni solishtirish oson bo'ladi.",
    bookingsEmptyTitle: "Hali ko'rik so'rovlari yuborilmagan",
    bookingsEmptyBody:
      "Obyekt sahifasidan yoki bosh sahifadan ko'rikka yozilishingiz mumkin.",
    goCatalogCta: "Obyektlarni ko'rish",
    bookingStatusBadge: "So'rov yuborilgan",

    notFoundTitle: "Sahifa topilmadi",
    notFoundBody:
      "So'ralgan xonadon yoki maqola o'chirilgan yoki havola noto'g'ri kiritilgan.",
    notFoundCta: "Bosh sahifaga qaytish",
    closeLabel: "Yopish",
    prevPhoto: "Oldingi rasm",
    nextPhoto: "Keyingi rasm",
  },
  ru: {
    brandName: "MAKON",
    realtorShort: "Азизбек",
    navHome: "Главная",
    navCatalog: "Объекты",
    navGuides: "Гид",
    navRealtor: "Риелтор",
    savedLinkLabel: "Избранные объекты",
    langToggleLabel: "Сменить язык",

    heroEyebrow: "Персональный риелтор · Ташкент",
    heroTitle: "Найдите проверенную квартиру без лишних переплат",
    heroSubtitle:
      "Юридически чистые квартиры и комнаты, прозрачные цены и организация личного показа.",
    heroBookCta: "Записаться на показ",
    heroCatalogCta: "Смотреть объекты",
    statYears: "лет опыта",
    statDeals: "закрытых сделок",
    statTrust: "довольных клиентов",

    searchPlaceholder: "Район, улица или название объекта...",
    searchBtn: "Найти",
    quickFilterTitle: "Быстрый выбор",
    chip1Room: "1 комн.",
    chip2Rooms: "2 комн.",
    chip3Rooms: "3 комн.",
    chip4Rooms: "4+ комн.",
    chipSale: "Продажа",
    chipRent: "Аренда",

    featuredTitle: "Избранные объекты",
    viewAll: "Все",
    calcBannerEyebrow: "Онлайн-расчет",
    calcBannerTitle: "Калькулятор ипотеки и рассрочки 0%",
    calcBannerSubtitle:
      "Рассчитайте первоначальный взнос и ежемесячный платеж за 10 секунд.",
    calcBannerCta: "Рассчитать",

    servicesTitle: "Услуги риелтора",
    testimonialsTitle: "Отзывы клиентов",
    homeFinalTitle: "Есть конкретный запрос?",
    homeFinalSubtitle:
      "Оставьте бюджет и район — подготовлю 3 подходящих варианта и организую просмотр.",

    dealAll: "Все",
    dealSale: "Продажа",
    dealRent: "Аренда",
    perMonth: "/ мес.",
    roomsShort: "комн.",
    floorLabel: "Этаж",
    areaLabel: "Площадь",
    districtLabel: "Район",
    renovationLabel: "Ремонт",
    buildingLabel: "Дом",

    catalogTitle: "Квартиры и комнаты",
    catalogSubtitle: "Проверенные объекты на продажу и аренду",
    filtersBtn: "Фильтры",
    sortFeatured: "Рекомендуемые",
    sortPriceAsc: "Сначала дешевле",
    sortPriceDesc: "Сначала дороже",
    sortAreaDesc: "Больше площадь",
    resultsCountSuffix: "объект(ов)",
    clearFilters: "Сбросить фильтры",
    emptyTitle: "По заданным параметрам ничего не найдено",
    emptySubtitle:
      "Попробуйте выбрать другое число комнат или сбросить фильтры по району и цене.",

    filterSheetTitle: "Фильтр объектов",
    filterDealType: "Тип сделки",
    filterRooms: "Количество комнат",
    filterDistricts: "Районы",
    filterRenovation: "Состояние ремонта",
    filterPriceUsd: "Бюджет (USD)",
    filterMinUsd: "От ($)",
    filterMaxUsd: "До ($)",
    filterReset: "Сбросить",
    filterApply: "Применить",

    renovationAll: "Любой",
    renovationEuro: "Евроремонт",
    renovationDesigner: "Дизайнерский",
    renovationCosmetic: "Хорошее состояние",
    renovationBox: "Коробка",

    saveAdd: "Сохранить",
    saveRemove: "Сохранено",
    toastSavedAdded: "Объект добавлен в избранное",
    toastSavedRemoved: "Объект удален из избранного",
    toastLinkCopied: "Ссылка на объект скопирована",
    toastBookingCreated: "Заявка на просмотр принята",

    backLabel: "Назад",
    shareLabel: "Поделиться",
    specsTitle: "Характеристики",
    descriptionTitle: "Об объекте",
    amenitiesTitle: "Удобства",
    inlineCalcTitle: "Примерный платеж по ипотеке",
    inlineCalcNote: "При взносе 20%, на 15 лет, ставка 18% годовых",
    inlineCalcOpen: "Открыть калькулятор",
    realtorBarRole: "Личный риелтор",
    telegramAction: "Telegram",
    callAction: "Позвонить",
    bookViewingAction: "Записаться на показ",

    bookingTitle: "Запись на просмотр",
    bookingSubtitle:
      "Выберите удобный день и время — риелтор свяжется для подтверждения встречи.",
    bookingNameLabel: "Ваше имя",
    bookingNamePlaceholder: "Например: Жасур Алимов",
    bookingPhoneLabel: "Номер телефона",
    bookingPhonePlaceholder: "+998 90 123 45 67",
    bookingDateLabel: "Удобная дата",
    bookingTimeLabel: "Удобное время",
    bookingNoteLabel: "Комментарий (необязательно)",
    bookingNotePlaceholder: "Например: удобнее посмотреть вечером",
    bookingSubmit: "Отправить заявку",
    bookingSuccessTitle: "Заявка принята",
    bookingSuccessBody:
      "Скоро свяжусь с вами для подтверждения показа. Запись сохранена в разделе Избранное.",
    bookingSuccessCta: "Мои заявки",
    bookingClose: "Закрыть",

    errNameRequired: "Введите имя минимум из 2 букв",
    errPhoneInvalid: "Введите корректный номер Узбекистана (+998 XX XXX XX XX)",
    errDateRequired: "Выберите дату просмотра",
    errTimeRequired: "Выберите удобное время",

    guidesTitle: "Полезное и калькулятор",
    guidesSubtitle:
      "Рассчитайте платеж заранее и изучите обзоры районов и документы перед сделкой.",
    calcTitle: "Калькулятор ипотеки и рассрочки",
    calcModeMortgage: "Ипотека",
    calcModeInstallment: "Рассрочка 0%",
    calcPriceLabel: "Цена объекта (USD)",
    calcDownPaymentLabel: "Первоначальный взнос",
    calcTermLabel: "Срок (лет)",
    calcRateLabel: "Годовая ставка",
    calcMonthlyResult: "Ежемесячный платеж",
    calcLoanAmount: "Сумма кредита / остаток",
    calcDownAmount: "Первый взнос",
    calcTotalInterest: "Переплата по процентам",
    calcZeroRateNote: "При рассрочке 0% переплата по процентам не начисляется.",

    guidesArticlesTitle: "Гайды и обзоры районов",
    guideCatAll: "Все",
    guideCatDistrict: "Районы",
    guideCatBuying: "Покупка",
    guideCatMortgage: "Ипотека",
    readTimeSuffix: "мин чтения",
    readMore: "Читать",
    guideCtaTitle: "Нужна консультация?",
    guideCtaBody:
      "Помогу подобрать квартиру или проверить документы перед оформлением.",

    realtorPageTitle: "Профиль риелтора",
    realtorCredentialsTitle: "Опыт и гарантии",
    realtorWorkflowTitle: "Как проходит работа",
    realtorFaqTitle: "Частые вопросы",
    realtorContactTitle: "Быстрая связь",

    savedPageTitle: "Избранное",
    savedTabFavorites: "Сохраненные",
    savedTabBookings: "Мои заявки",
    savedEmptyTitle: "Пока нет сохраненных объектов",
    savedEmptyBody:
      "Нажмите на сердечко у понравившихся квартир, чтобы легко сравнить их позже.",
    bookingsEmptyTitle: "Заявок на просмотр пока нет",
    bookingsEmptyBody:
      "Вы можете записаться на просмотр со страницы любого объекта или с главной.",
    goCatalogCta: "Смотреть объекты",
    bookingStatusBadge: "Заявка отправлена",

    notFoundTitle: "Страница не найдена",
    notFoundBody:
      "Запрошенный объект или статья удалены, либо ссылка указана неверно.",
    notFoundCta: "Вернуться на главную",
    closeLabel: "Закрыть",
    prevPhoto: "Предыдущее фото",
    nextPhoto: "Следующее фото",
  },
} as const;

export type TranslationKey = keyof typeof translations.uz;

export function pickText(text: LocalizedText, locale: Locale): string {
  return text[locale];
}

export function getRenovationLabel(
  renovation: RenovationType,
  locale: Locale,
): string {
  const t = translations[locale];
  switch (renovation) {
    case "euro":
      return t.renovationEuro;
    case "designer":
      return t.renovationDesigner;
    case "cosmetic":
      return t.renovationCosmetic;
    case "box":
      return t.renovationBox;
  }
}
