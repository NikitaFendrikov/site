"use client";

import { useEffect, useState } from "react";
import ScrambleText from "./ScrambleText";
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

  // Видна с момента, когда «Печатная продукция» дошла до верхней половины экрана, и до низа страницы
  useEffect(() => {
    const update = () => {
      const print = document.getElementById("print");
      const reached = !!print && print.getBoundingClientRect().top <= window.innerHeight * 0.5;
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
  // Шаг не больше 85% экрана, чтобы высокие блоки не проскакивали
  const handleClick = () => {
    const minTop = HEADER_OFFSET + window.innerHeight * 0.2;
    const next = Array.from(document.querySelectorAll<HTMLElement>(TARGETS)).find((el) => {
      const r = el.getBoundingClientRect();
      return r.top > minTop && r.bottom > window.innerHeight;
    });

    const limit = window.scrollY + window.innerHeight * 0.85;
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
      <ScrambleText className="typo-nav">СКРОЛЛ ↓</ScrambleText>
    </button>
  );
}
