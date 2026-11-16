"use client";

import { TelegramIcon } from "./Icons";
import { TELEGRAM_URL, scrollToSection } from "@/lib/sections";

export default function HomeFooter() {
  return (
    <footer className="home-footer">
      <p className="typo-body1 text-primary">
        В&nbsp;работе опираюсь на&nbsp;продуктовые метрики и&nbsp;интерес бизнеса. Считаю, что дизайн
        должен давать результат, а&nbsp;не&nbsp;только хорошо выглядеть. Открыт к&nbsp;full-time предложениям
        и&nbsp;проектному сотрудничеству.
      </p>

      <nav className="home-footer-links">
        <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="icon-link hover-fade">
          <TelegramIcon />
          <span className="typo-nav link-underline">Написать в Телеграм</span>
        </a>
        <div className="nav-dot" />
        <a
          href="#top"
          className="text-primary hover-fade"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("top");
          }}
        >
          <span className="typo-nav">Наверх</span>
        </a>
      </nav>
    </footer>
  );
}
