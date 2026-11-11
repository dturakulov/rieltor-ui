import type { Metadata, Viewport } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { MobileAppShell } from "@/components/shell/MobileAppShell";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin", "cyrillic-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MAKON Estate — Azizbek Rahimov | Shaxsiy Rieltor",
  description:
    "Toshkent bo'ylab tekshirilgan kvartiralar, xonalar, ipoteka kalkulyatori va ko'rikka yozilish uchun mobil sayt.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FAF8F5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uz"
      className={`${plusJakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-dvh">
        <MobileAppShell>{children}</MobileAppShell>
      </body>
    </html>
  );
}
