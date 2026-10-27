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
          <strong className="nowrap">Бренд- и&nbsp;веб-дизайнер</strong> с&nbsp;коммерческим
          опытом <strong>более 3&nbsp;лет</strong>. Создаю айдентику с&nbsp;нуля и&nbsp;переношу
          её на&nbsp;сайт и&nbsp;другие носители. Сделал бренд для&nbsp;спортивной платформы,
          через которую прошли <strong>500+&nbsp;атлетов</strong>, и&nbsp;сайт для&nbsp;производителя
          роботов, который принёс <strong>50+&nbsp;заявок</strong>. Делаю 3D и&nbsp;сам пишу&nbsp;код.
        </p>

        <p className="hero-note" style={{ opacity: play ? 1 : 0 }}>
          <ScrambleText className="typo-nav" playing={play}>
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
        <ScrambleText className="typo-nav">Скролл ↓</ScrambleText>
      </button>
    </section>
  );
}
