export type Locale = "uz" | "ru";

export interface LocalizedText {
  uz: string;
  ru: string;
}

export type DealType = "sale" | "rent";

export type PropertyCategory = "apartment" | "studio" | "house";

export type RoomCount = 1 | 2 | 3 | 4;

export type RenovationType = "euro" | "designer" | "cosmetic" | "box";

export type DistrictId =
  | "chilonzor"
  | "yunusobod"
  | "mirzo-ulugbek"
  | "shayxontohur"
  | "yakkasaroy"
  | "mirobod";

export interface Property {
  id: string;
  slug: string;
  dealType: DealType;
  category: PropertyCategory;
  rooms: RoomCount;
  areaSqm: number;
  floor: number;
  totalFloors: number;
  priceUsd: number;
  districtId: DistrictId;
  districtName: LocalizedText;
  address: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  buildingType: LocalizedText;
  renovation: RenovationType;
  amenities: LocalizedText[];
  images: string[];
  featured: boolean;
  badge?: LocalizedText;
  createdAt: string;
}

export type SortOption = "featured" | "price_asc" | "price_desc" | "area_desc";

export interface PropertyFilter {
  dealType?: DealType | "all";
  rooms?: RoomCount[];
  districts?: DistrictId[];
  renovation?: RenovationType | "all";
  minUsd?: number;
  maxUsd?: number;
  q?: string;
  sort?: SortOption;
}

export type GuideCategory = "district" | "buying" | "mortgage";

export interface GuideSection {
  heading: LocalizedText;
  body: LocalizedText;
  bullets?: LocalizedText[];
}

export interface GuideArticle {
  id: string;
  slug: string;
  category: GuideCategory;
  readTimeMin: number;
  coverImage: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  sections: GuideSection[];
}

export interface RealtorProfile {
  name: string;
  brand: string;
  role: LocalizedText;
  city: LocalizedText;
  avatar: string;
  experienceYears: number;
  dealsClosed: number;
  satisfactionPct: number;
  phoneDisplay: string;
  phoneHref: string;
  telegramHandle: string;
  telegramHref: string;
  email: string;
  bio: LocalizedText;
  credentials: LocalizedText[];
}

export interface ServiceItem {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  durationLabel: LocalizedText;
}

export interface WorkflowStep {
  step: string;
  title: LocalizedText;
  description: LocalizedText;
}

export interface Testimonial {
  id: string;
  clientName: string;
  dealSummary: LocalizedText;
  quote: LocalizedText;
}

export interface FaqItem {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
}

export interface BookingRequest {
  id: string;
  propertySlug?: string;
  propertyTitle?: LocalizedText;
  clientName: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  note?: string;
  createdAt: string;
}

export interface MortgageInput {
  priceUsd: number;
  downPaymentPct: number;
  termYears: number;
  annualRatePct: number;
}

export interface MortgageResult {
  priceUsd: number;
  downPaymentAmount: number;
  loanAmount: number;
  months: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}
