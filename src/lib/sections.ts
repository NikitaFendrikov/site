import { getLenis } from "@/lib/lenis-store";

/* Разделы главной: id якоря и подпись в навигации */
export const SECTIONS = [
  { id: "cases",         label: "Кейсы" },
  { id: "print",         label: "Печатная продукция" },
  { id: "animation",     label: "Анимация" },
  { id: "three-d",       label: "3D" },
  { id: "presentations", label: "Презентации" },
  { id: "sites",         label: "Сайты" },
] as const;

export const TELEGRAM_URL = "https://t.me/Nikita_Fendrikov";

/* Отступ под плавающую шапку при прокрутке к разделу */
const HEADER_OFFSET = -100;

export function scrollToSection(id: string) {
  const lenis = getLenis();

  if (id === "top") {
    lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, { offset: HEADER_OFFSET });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }
}
