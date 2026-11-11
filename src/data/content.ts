import type {
  FaqItem,
  GuideArticle,
  RealtorProfile,
  ServiceItem,
  Testimonial,
  WorkflowStep,
} from "../types/realtor.ts";

export const REALTOR_PROFILE: RealtorProfile = {
  name: "Azizbek Rahimov",
  brand: "MAKON Estate",
  role: {
    uz: "Toshkent shahri bo'yicha shaxsiy rieltor",
    ru: "Персональный риелтор по Ташкенту",
  },
  city: { uz: "Toshkent, O'zbekiston", ru: "Ташкент, Узбекистан" },
  avatar: "/images/realtor/azizbek.svg",
  experienceYears: 7,
  dealsClosed: 148,
  satisfactionPct: 98,
  phoneDisplay: "+998 90 000 00 00",
  phoneHref: "tel:+998900000000",
  telegramHandle: "@makon_realtor_demo",
  telegramHref: "https://t.me/makon_realtor_demo",
  email: "hello@makon-estate.example",
  bio: {
    uz: "7 yildan beri Toshkentning markaziy va rivojlanayotgan tumanlarida tekshirilgan xonadonlarni topish, bozor narxini xolisona baholash va hujjatlarni xavfsiz rasmiylashtirishda mijozlarga hamrohlik qilaman.",
    ru: "7 лет помогаю клиентам находить проверенные квартиры в Ташкенте, объективно оценивать рыночную стоимость и безопасно оформлять сделки под ключ.",
  },
  credentials: [
    {
      uz: "Har bir obyekt bo'yicha kadastr va taqiq yo'qligini oldindan tekshirish",
      ru: "Предварительная проверка кадастра и отсутствия обременений",
    },
    {
      uz: "Sotuvchi bilan to'g'ridan-to'g'ri muzokara va narxni asoslash",
      ru: "Аргументированный торг с собственником в интересах клиента",
    },
    {
      uz: "Notarius va bank ipotekasi bosqichlarida to'liq hamrohlik",
      ru: "Полное сопровождение у нотариуса и в банке при ипотеке",
    },
  ],
};

export const SERVICES: ServiceItem[] = [
  {
    id: "srv-buy",
    title: {
      uz: "Kvartira sotib olishda hamrohlik",
      ru: "Подбор и покупка квартиры",
    },
    description: {
      uz: "Byudjet va tuman talabingizga ko'ra 3–5 ta eng yaxshi variantni saralash, ko'rik tashkili va bitimni xavfsiz yopish.",
      ru: "Подбор 3–5 лучших вариантов под ваш бюджет, организация просмотров и безопасное закрытие сделки.",
    },
    durationLabel: { uz: "3–14 kun", ru: "3–14 дней" },
  },
  {
    id: "srv-rent",
    title: {
      uz: "Ishonchli uzoq muddatli ijara",
      ru: "Надежная долгосрочная аренда",
    },
    description: {
      uz: "Hujjati toza kvartiralarni topish, shartnoma shartlarini himoyalash va muammosiz ko'chib kirish.",
      ru: "Поиск проверенных квартир с официальным договором аренды и прозрачными условиями.",
    },
    durationLabel: { uz: "1–3 kun", ru: "1–3 дня" },
  },
  {
    id: "srv-sell",
    title: {
      uz: "Xonadonni bozor narxida sotish",
      ru: "Продажа квартиры по рыночной цене",
    },
    description: {
      uz: "Professional foto/video taqdimot, real xaridorlarni saralash va eng qisqa muddatda sotuv.",
      ru: "Профессиональная презентация, фильтрация реальных покупателей и выход на сделку без потери цены.",
    },
    durationLabel: { uz: "2–4 hafta", ru: "2–4 недели" },
  },
  {
    id: "srv-legal",
    title: {
      uz: "Hujjatlar va ipoteka ekspertizasi",
      ru: "Проверка документов и ипотека",
    },
    description: {
      uz: "Kadastr, kommunal qarzdorlik, ro'yxatdagilar tarixi va bank ipoteka talablarini to'liq tekshirish.",
      ru: "Проверка кадастра, коммунальных долгов, прописанных лиц и соответствия объекта банковской ипотеке.",
    },
    durationLabel: { uz: "1 kun", ru: "1 день" },
  },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: "01",
    title: { uz: "Talab va byudjet tahlili", ru: "Анализ запроса и бюджета" },
    description: {
      uz: "15 daqiqalik suhbatda xonalar soni, tuman va to'lov turini aniqlaymiz.",
      ru: "За 15 минут фиксируем нужное число комнат, районы и удобный способ оплаты.",
    },
  },
  {
    step: "02",
    title: { uz: "Saralangan ko'riklar", ru: "Организованные просмотры" },
    description: {
      uz: "Foydasiz e'lonlarsiz, faqat real va tekshirilgan xonadonlarga birgalikda boramiz.",
      ru: "Смотрим только реальные проверенные варианты без фейковых объявлений.",
    },
  },
  {
    step: "03",
    title: { uz: "Narx kelishuvi va tekshiruv", ru: "Торг и юридическая проверка" },
    description: {
      uz: "Sotuvchi bilan optimal narxni kelishib, barcha hujjatlarni notariusgacha tekshiramiz.",
      ru: "Согласовываем лучшую цену с владельцем и проверяем документы до задатка.",
    },
  },
  {
    step: "04",
    title: { uz: "Notarius va kalit topshirish", ru: "Сделка и передача ключей" },
    description: {
      uz: "Shartnoma imzolash, hisob-kitob xavfsizligi va kalit topshirishgacha birga bo'lamiz.",
      ru: "Сопровождаем подписание договора, безопасный расчет и прием-передачу квартиры.",
    },
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    clientName: "Dilshod & Malika",
    dealSummary: {
      uz: "Mirobod, 3 xonali xarid",
      ru: "Мирабад, покупка 3-комн.",
    },
    quote: {
      uz: "Ikki hafta ichida byudjetimizga mos, hujjati toza uy topib berishdi. Savdolashishda $4,500 tejadik.",
      ru: "За две недели нашли квартиру с чистыми документами в нашем бюджете. На торге сэкономили $4,500.",
    },
  },
  {
    id: "t-2",
    clientName: "Timur Karimov",
    dealSummary: {
      uz: "Yunusobod, ipoteka orqali 2 xona",
      ru: "Юнусабад, 2-комн. в ипотеку",
    },
    quote: {
      uz: "Bank talablariga tushadigan uyni oldindan ajratib bergani juda ko'p vaqtimizni tejadi.",
      ru: "Сразу отфильтровали варианты, подходящие под банковскую ипотеку — сэкономили массу времени.",
    },
  },
  {
    id: "t-3",
    clientName: "Kamola Rustamova",
    dealSummary: {
      uz: "Darxon, 1 xonali ijara",
      ru: "Дархан, аренда студии",
    },
    quote: {
      uz: "Bir kunda ko'rib, rasmiy shartnoma bilan ko'chib kirdim. Hammasi aniq va ortiqcha va'dalarsiz.",
      ru: "Посмотрела за один день и въехала с официальным договором. Все четко и без навязывания.",
    },
  },
  {
    id: "t-4",
    clientName: "Sardorbek N.",
    dealSummary: {
      uz: "Chilonzor, kvartira sotuvi",
      ru: "Чиланзар, продажа квартиры",
    },
    quote: {
      uz: "Kvartiramizni 18 kun ichida bozor narxida sotib berishdi, notariusda ham hamma jarayon silliq o'tdi.",
      ru: "Продали квартиру по рыночной цене за 18 дней, на сделке у нотариуса все прошло спокойно.",
    },
  },
];

export const FAQS: FaqItem[] = [
  {
    id: "faq-1",
    question: {
      uz: "Ko'rikka yozilish bepulmi?",
      ru: "Запись на просмотр бесплатная?",
    },
    answer: {
      uz: "Ha, dastlabki konsultatsiya va saytdagi obyektlarni ko'rikdan o'tkazish mutlaqo bepul.",
      ru: "Да, первичная консультация и показ объектов из каталога абсолютно бесплатны.",
    },
  },
  {
    id: "faq-2",
    question: {
      uz: "Ipoteka orqali ikkilamchi uy olsa bo'ladimi?",
      ru: "Можно ли купить вторичное жилье в ипотеку?",
    },
    answer: {
      uz: "Ha, kadastr hujjati tayyor va bank mezonlariga mos (odatda 1980-yildan keyin qurilgan g'isht/monolit) uylarni ipotekaga rasmiylashtirish mumkin.",
      ru: "Да, квартиры с готовым кадастром, соответствующие требованиям банка, можно оформить в ипотеку.",
    },
  },
  {
    id: "faq-3",
    question: {
      uz: "Hujjatlarda taqiq yoki qarzdorlik yo'qligini qanday tekshirasiz?",
      ru: "Как вы проверяете отсутствие запретов и долгов?",
    },
    answer: {
      uz: "Zakolat berishdan oldin kadastr ma'lumotnomasi, notarial taqiq bazasi va kommunal xizmatlar bo'yicha qoldiqlar tekshiriladi.",
      ru: "До передачи задатка проверяем выписку из кадастра, реестр обременений и отсутствие коммунальных задолженностей.",
    },
  },
  {
    id: "faq-4",
    question: {
      uz: "Rieltor xizmat haqi qachon to'lanadi?",
      ru: "Когда оплачиваются услуги риелтора?",
    },
    answer: {
      uz: "Xizmat haqi shartnoma shartlariga ko'ra faqat bitim muvaffaqiyatli yakunlanganda to'lanadi; oldindan yashirin to'lovlar yo'q.",
      ru: "Комиссия оплачивается только по факту успешного завершения сделки, без скрытых предоплат.",
    },
  },
  {
    id: "faq-5",
    question: {
      uz: "Boshqa viloyat yoki chet elda bo'lsam ham uy ko'ra olamanmi?",
      ru: "Можно ли посмотреть квартиру онлайн из другого города?",
    },
    answer: {
      uz: "Albatta — jonli video-ko'rik tashkil qilib, xonadon, hovli va infratuzilmani real vaqtda ko'rsatib beraman.",
      ru: "Конечно — проведу живой видеопоказ квартиры, подъезда и двора в удобное для вас время.",
    },
  },
];

export const GUIDES: GuideArticle[] = [
  {
    id: "guide-1",
    slug: "toshkent-tumanlari-sharhi-2026",
    category: "district",
    readTimeMin: 4,
    coverImage: "/images/guides/tashkent-district.svg",
    title: {
      uz: "Toshkent tumanlari sharhi: qaysi hudud kimga mos?",
      ru: "Обзор районов Ташкента: где лучше покупать жилье",
    },
    excerpt: {
      uz: "Mirobod, Yunusobod, Mirzo Ulug'bek va Chilonzor narx dinamikasi, metroga yaqinlik va ijara salohiyati.",
      ru: "Сравнение Мирабада, Юнусабада, Мирзо-Улугбека и Чиланзара по ценам, метро и потенциалу аренды.",
    },
    sections: [
      {
        heading: {
          uz: "1. Mirobod va Yakkasaroy — markaziy qulaylik",
          ru: "1. Мирабад и Яккасарай — деловой и живой центр",
        },
        body: {
          uz: "Yuqori ijara talabi va rivojlangan infratuzilma sababli bu tumanlar ham yashash, ham uzoq muddatli investitsiya uchun barqaror tanlov bo'lib qolmoqda.",
          ru: "Высокий спрос на аренду, школы и пешая доступность к метро делают эти районы лидерами по ликвидности.",
        },
        bullets: [
          {
            uz: "2 xonali yangi uylar o'rtacha $95,000 – $125,000",
            ru: "2-комнатные новостройки в среднем $95,000 – $125,000",
          },
          {
            uz: "Ijara daromadi: yiliga 7% – 8.5%",
            ru: "Доходность от аренды: 7% – 8.5% годовых",
          },
        ],
      },
      {
        heading: {
          uz: "2. Yunusobod va Chilonzor — oilaviy va metroga yaqin",
          ru: "2. Юнусабад и Чиланзар — семейный комфорт у метро",
        },
        body: {
          uz: "Yashil hovlilar, maktablar va metro bekatlari ko'pligi tufayli birinchi uy xarid qilayotgan oilalar orasida eng ommabop yo'nalishlar.",
          ru: "Обилие зеленых дворов, школ и станций метро делает их самыми популярными для покупки первого жилья.",
        },
      },
    ],
  },
  {
    id: "guide-2",
    slug: "uy-olishda-7-muhim-hujjat",
    category: "buying",
    readTimeMin: 5,
    coverImage: "/images/guides/buying-checklist.svg",
    title: {
      uz: "Kvartira sotib olishda tekshiriladigan 7 ta muhim hujjat",
      ru: "7 документов, которые нужно проверить перед покупкой квартиры",
    },
    excerpt: {
      uz: "Zakolat berishdan oldin kadastr, rozilik xati va kommunal qarzdorliklarni qanday tekshirish kerak?",
      ru: "Чек-лист безопасности: кадастр, согласие супруга и справки по коммунальным платежам до задатка.",
    },
    sections: [
      {
        heading: {
          uz: "Zakolatdan oldingi tekshiruv ro'yxati",
          ru: "Чек-лист до передачи задатка",
        },
        body: {
          uz: "Ko'plab muammolar hujjatlarga shoshqaloqlik bilan qarashdan kelib chiqadi. Bitimdan oldin quyidagilarni albatta ko'rib chiqing:",
          ru: "Большинство рисков снимается еще до визита к нотариусу при системной проверке следующих бумаг:",
        },
        bullets: [
          {
            uz: "Kadastr pasporti va mulk huquqi ko'chirmasi (QR-kodli)",
            ru: "Кадастровый паспорт и актуальная выписка из реестра",
          },
          {
            uz: "Turmush o'rtoq va voyaga yetgan oila a'zolarining notarial roziligi",
            ru: "Нотариальное согласие супруга(и) и совладельцев",
          },
          {
            uz: "Elektr, gaz, issiq/sovuq suv va boshqaruv kompaniyasi qarzi yo'qligi",
            ru: "Отсутствие долгов по свету, газу, воде и ЖЭК/УК",
          },
        ],
      },
    ],
  },
  {
    id: "guide-3",
    slug: "ipoteka-yoki-bolib-tolash-qaysi-foydali",
    category: "mortgage",
    readTimeMin: 4,
    coverImage: "/images/guides/mortgage-guide.svg",
    title: {
      uz: "Bank ipotekasi vs 0% bo'lib to'lash: qaysi biri foydaliroq?",
      ru: "Банковская ипотека или рассрочка 0%: что выгоднее в 2026 году",
    },
    excerpt: {
      uz: "Qisqa muddatda foizsiz bo'lib to'lash va uzoq muddatli ipoteka to'lovlarini amaliy raqamlarda solishtiramiz.",
      ru: "Сравниваем короткую рассрочку от застройщика и долгосрочную ипотеку на реальных цифрах.",
    },
    sections: [
      {
        heading: {
          uz: "Qachon 0% bo'lib to'lash ustun?",
          ru: "Когда выгодна рассрочка 0%",
        },
        body: {
          uz: "Agar 30–40% boshlang'ich to'lov va qolgan summani 24–36 oy ichida yopish imkoningiz bo'lsa, bank foizlarisiz sezilarli darajada tejaysiz.",
          ru: "Если вы готовы внести 30–40% и закрыть остаток за 2–3 года, рассрочка избавляет от банковской переплаты.",
        },
      },
      {
        heading: {
          uz: "Qachon bank ipotekasi qulay?",
          ru: "Когда лучше выбрать ипотеку",
        },
        body: {
          uz: "Oylik yuklamani yengillashtirish uchun 10–15 yillik ipoteka qulay; ayniqsa tayyor uyni darhol ijaraga qo'yib to'lovning bir qismini qoplash mumkin.",
          ru: "При длинном горизонте 10–15 лет ежемесячный платеж ниже, а готовую квартиру можно сразу сдавать.",
        },
      },
    ],
  },
  {
    id: "guide-4",
    slug: "ijara-shartnomasida-nimalarga-etibor-berish-kerak",
    category: "buying",
    readTimeMin: 3,
    coverImage: "/images/properties/apt-studio-1.svg",
    title: {
      uz: "Kvartira ijarasida shartnoma tuzish bo'yicha 5 maslahat",
      ru: "5 важных правил при заключении договора аренды квартиры",
    },
    excerpt: {
      uz: "Depozit, kommunal to'lovlar va narx o'zgarmasligi bandlarini qanday to'g'ri yozish kerak?",
      ru: "Как зафиксировать депозит, коммуналку и неизменность цены в официальном договоре.",
    },
    sections: [
      {
        heading: {
          uz: "Ijara xavfsizligi asoslari",
          ru: "Базовые пункты безопасной аренды",
        },
        body: {
          uz: "Og'zaki kelishuvlar o'rniga qisqa va aniq yozma shartnoma ikkala tomonni kutilmagan vaziyatlardan himoya qiladi.",
          ru: "Письменный договор защищает и арендатора, и собственника от спорных ситуаций с оплатой или сроками.",
        },
        bullets: [
          {
            uz: "Mulk egasi pasporti va kadastrini solishtirish",
            ru: "Сверка паспорта собственника и кадастра",
          },
          {
            uz: "Hisoblagich ko'rsatkichlari va jihozlar ro'yxatini ilova qilish",
            ru: "Фиксация показаний счетчиков и описи техники",
          },
        ],
      },
    ],
  },
];
