"use client";

import { useEffect, useState } from "react";
import ScrambleText from "./ScrambleText";
import { scrollToSection } from "@/lib/sections";

export default function Hero() {
  // Строка про Next.js появляется со scramble-эффектом после загрузки
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPlay(true), 400);
    return () => clearTimeout(t);
  }, []);

  // Подсказка к скроллу прячется, как только страницу начали листать
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <section id="top" className="hero">
      <div className="hero-inner">
        <p className="hero-statement">
          <strong className="nowrap">Дизайнер</strong> с&nbsp;коммерческим опытом <strong>более
          3&nbsp;лет</strong>. Проектирую B2B-сервисы от&nbsp;исследования и&nbsp;сценариев
          до&nbsp;дизайн-системы. Сократил обращения операторов в&nbsp;техподдержку
          на&nbsp;<strong>80%</strong>, привлёк сайтом <strong>50+</strong> заявок на&nbsp;продукт
          стоимостью от&nbsp;<strong className="nowrap">1,5&nbsp;млн&nbsp;₽</strong> и&nbsp;спроектировал
          сценарии, которые экономят пользователям минимум <strong className="nowrap">2&nbsp;часа</strong> на&nbsp;задачу.
        </p>

        <p className="hero-note" style={{ opacity: play ? 1 : 0 }}>
          <ScrambleText className="typo-nav" playing={play} framesPerChar={1}>
            Этот сайт собран на Next.js с помощью Claude Code
          </ScrambleText>
        </p>
      </div>

      <button
        type="button"
        className={`hero-scroll${scrolled ? " is-hidden" : ""}`}
        aria-label="Прокрутить к кейсам"
        aria-hidden={scrolled}
        tabIndex={scrolled ? -1 : undefined}
        onClick={() => scrollToSection("cases")}
      >
        <span className="typo-nav hover-fade">Скролл ↓</span>
      </button>
    </section>
  );
}
