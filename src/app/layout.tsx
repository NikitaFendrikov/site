import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { NavigationProvider } from "@/context/NavigationContext";

/* Шрифты подключены в globals.css из /public/fonts */
const FONT_PRELOADS = [
  "/fonts/handjet-latin-full-normal.woff2",
  "/fonts/handjet-cyrillic-full-normal.woff2",
  "/fonts/manrope-latin-wght-normal.woff2",
  "/fonts/manrope-cyrillic-wght-normal.woff2",
];

/* ─────────────────────────────────────────────────────────────────────────────
   МЕТАДАННЫЕ САЙТА
   Меняй title, description, url и OpenGraph-изображение
   ───────────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  // ↓ Измени на своё имя/бренд
  title: {
    default: "Никита Фендриков",
    template: "%s - Никита Фендриков",
  },
  description: "Дизайнер с коммерческим опытом более 3 лет. Проектирую B2B-сервисы от исследований до дизайн-системы.",
  metadataBase: new URL("https://nikitafendrikov.ru"),
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://nikitafendrikov.ru",
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
      <head>
        {FONT_PRELOADS.map((href) => (
          <link key={href} rel="preload" href={href} as="font" type="font/woff2" crossOrigin="anonymous" />
        ))}
      </head>
      <body>
        <NavigationProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </NavigationProvider>
      </body>
    </html>
  );
}
