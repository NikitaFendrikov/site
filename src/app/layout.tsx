import type { Metadata } from "next";
import { Handjet, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import { NavigationProvider } from "@/context/NavigationContext";

/* ─────────────────────────────────────────────────────────────────────────────
   ШРИФТЫ
   Handjet — акцентный моноширинный шрифт для заголовков / hero
   Manrope — основной UI-шрифт для всего остального текста
   ───────────────────────────────────────────────────────────────────────────── */

const handjet = Handjet({
  subsets: ["latin", "cyrillic"],
  axes: ["ELGR", "ELSH"],
  variable: "--font-handjet",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

/* ─────────────────────────────────────────────────────────────────────────────
   МЕТАДАННЫЕ САЙТА
   Меняй title, description, url и OpenGraph-изображение
   ───────────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  // ↓ Измени на своё имя/бренд
  title: {
    default: "Никита Фендриков",
    template: "%s — Никита Фендриков",
  },
  description: "Продуктовый дизайнер.",
  metadataBase: new URL("https://nikitafendrikov.com"),
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://nikitafendrikov.com",
    siteName: "Никита Фендриков",
    // ↓ Добавь /public/og-image.jpg для превью в соцсетях (1200×630 px)
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Никита Фендриков — Дизайнер",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon/white-theme.png", type: "image/png" },
      { url: "/favicon/dark-theme.png", type: "image/png", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   ROOT LAYOUT
   Применяет шрифты и базовые классы ко всему сайту
   ───────────────────────────────────────────────────────────────────────────── */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ↓ Убери класс "dark" для светлой темы по умолчанию, добавь "dark" для тёмной
    <html lang="ru" className="">
      <body
        className={`${handjet.variable} ${manrope.variable}`}
      >
        <Preloader />
        <NavigationProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </NavigationProvider>
      </body>
    </html>
  );
}
