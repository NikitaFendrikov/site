"use client";

import { useEffect, useState } from "react";
import { getLenis } from "@/lib/lenis-store";

/* Отступ под шапку: верх следующего блока встаёт сразу под ней */
const HEADER_OFFSET = 100;

/* Блоки, по которым шагает кнопка: раздел целиком (с подписью) и его группы */
const TARGETS = [
  "#print", "#print .case-tile",
  "#presentations", "#presentations .case-card",
  "#three-d", "#three-d .comms-group",
  "#animation", "#animation .comms-anim-item",
].join(", ");

export default function HomeScrollHint() {
  const [visible, setVisible] = useState(false);

  // Видна с момента, когда «Презентации» дошли до верхней половины экрана, и до низа страницы
  useEffect(() => {
    const update = () => {
      const start = document.getElementById("presentations");
      const reached = !!start && start.getBoundingClientRect().top <= window.innerHeight * 0.5;
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
      setVisible(reached && !atBottom);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Следующий блок — первый заметно ниже шапки, который ещё не виден целиком.
    const handleClick = () => {
    // Шаг не меньше 70% экрана и не больше экрана минус шапка
    const minTop = window.innerHeight * 0.7 + HEADER_OFFSET;
    const next = Array.from(document.querySelectorAll<HTMLElement>(TARGETS)).find((el) => {
      const r = el.getBoundingClientRect();
      return r.top >= minTop && r.bottom > window.innerHeight;
    });

    const limit = window.scrollY + window.innerHeight - HEADER_OFFSET;
    const target = next
      ? Math.min(next.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET, limit)
      : limit;

    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target);
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="scroll-hint home-scroll-hint"
      aria-label="Прокрутить к следующему блоку"
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: visible ? "all" : "none",
      }}
    >
      <span className="typo-nav hover-fade">СКРОЛЛ ↓</span>
    </button>
  );
}
