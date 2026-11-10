"use client";

import { useEffect, useState } from "react";
import ScrambleText from "./ScrambleText";
import { getLenis } from "@/lib/lenis-store";
import { SECTIONS, TELEGRAM_URL, scrollToSection } from "@/lib/sections";

export default function SiteHeader() {
  const [floating, setFloating] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Плавающая плашка после начала скролла + активный раздел
  useEffect(() => {
    const update = () => {
      setFloating(window.scrollY > 40);

      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Открытое меню блокирует скролл страницы, Esc закрывает
  useEffect(() => {
    if (!menuOpen) return;

    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const onResize = () => window.innerWidth >= 1200 && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    getLenis()?.start();
    document.documentElement.style.overflow = "";
    scrollToSection(id);
  };

  const classes = [
    "topbar",
    floating && "is-floating",
    menuOpen && "is-menu-open",
  ].filter(Boolean).join(" ");

  return (
    <>
      <header className={classes}>
        <div className="topbar-inner">
          <a href="#top" className="topbar-logo" onClick={go("top")} aria-label="Наверх">
            <img src="/images/head.png" alt="Никита Фендриков" />
          </a>

          <nav className="topbar-nav" aria-label="Разделы">
            {SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={go(id)}
                className={`topbar-nav-item${active === id ? " active" : ""}`}
                aria-current={active === id ? "true" : undefined}
              >
                <ScrambleText className="typo-nav">{label}</ScrambleText>
                <span className="topbar-nav-dot" aria-hidden="true" />
              </a>
            ))}
          </nav>

          <div className="topbar-links">
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="link-underline">
              <ScrambleText className="typo-nav">Telegram</ScrambleText>
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="link-underline">
              <ScrambleText className="typo-nav">Резюме</ScrambleText>
            </a>
          </div>

          <button
            type="button"
            className="topbar-burger"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav className="mobile-menu-nav" aria-label="Разделы">
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={go(id)}
              tabIndex={menuOpen ? undefined : -1}
              className={`mobile-menu-item${active === id ? " active" : ""}`}
              aria-current={active === id ? "true" : undefined}
            >
              <span className="topbar-nav-dot" aria-hidden="true" />
              <span className="typo-nav">{label}</span>
            </a>
          ))}
        </nav>

        <div className="mobile-menu-links">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={menuOpen ? undefined : -1}
            className="link-underline"
          >
            <span className="typo-nav">Telegram</span>
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={menuOpen ? undefined : -1}
            className="link-underline"
          >
            <span className="typo-nav">Резюме</span>
          </a>
        </div>
      </div>
    </>
  );
}
