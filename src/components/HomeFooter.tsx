"use client";

import ScrambleText from "./ScrambleText";
import { TELEGRAM_URL, scrollToSection } from "@/lib/sections";

export default function HomeFooter() {
  return (
    <footer className="home-footer">
      <p className="typo-body1 text-primary">
        Открыт к&nbsp;full-time предложениям и&nbsp;проектному сотрудничеству.
      </p>

      <nav className="home-footer-links">
        <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="link-underline">
          <ScrambleText className="typo-nav">Написать в Телеграм</ScrambleText>
        </a>
        <div className="nav-dot" />
        <a
          href="#top"
          className="link-underline"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("top");
          }}
        >
          <ScrambleText className="typo-nav">Наверх</ScrambleText>
        </a>
      </nav>
    </footer>
  );
}
