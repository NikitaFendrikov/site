import Link from "next/link";
import { images } from "@/lib/images";
import ScrambleText from "@/components/ScrambleText";
import CaseCardLink from "@/components/CaseCardLink";
import ImageReveal from "@/components/ImageReveal";
import NameReveal from "@/components/NameReveal";
import ScrollHint from "@/components/ScrollHint";

export default function Home() {
  return (
    <main className="page-root">

      {/* Декоративные боковые линии */}
      <div aria-hidden="true" className="border-lines">
        <div
          className="absolute top-0 bottom-0 w-px bg-primary opacity-10"
          style={{ left: "var(--border-x)" }}
        />
        <div
          className="absolute top-0 bottom-0 w-px bg-primary opacity-10"
          style={{ right: "var(--border-x)" }}
        />
      </div>

      {/* Имя — fixed, кликабельно только по тексту */}
      <div className="site-header">
        <NameReveal>
          <a href="/">
            <ScrambleText className="typo-nav">Никита Фендриков</ScrambleText>
          </a>
        </NameReveal>
      </div>

      {/* Контент */}
      <div className="main-content">

        {/* AGONX — первый, лево */}
        <div className="case-card align-left">
          <ImageReveal>
            <CaseCardLink href="/agonx">
              <img src={images.home.agonx} alt="AGONX" className="w-full h-full object-cover" />
            </CaseCardLink>
          </ImageReveal>
          <div className="case-card-meta">
            <span className="typo-title text-primary">
              /&nbsp;&nbsp;AGONX
            </span>
            <span className="typo-body2 text-secondary">
              Дизайн интерфейса платформы для турниров, создание бренда
            </span>
          </div>
        </div>

        {/* WAYBOT ROBOTICS — второй, право */}
        <div className="case-card align-right">
          <ImageReveal>
            <CaseCardLink href="/waybot">
              <img src={images.home.waybot} alt="WAYBOT ROBOTICS" className="w-full h-full object-cover" />
            </CaseCardLink>
          </ImageReveal>
          <div className="case-card-meta">
            <span className="typo-title text-primary">
              /&nbsp;&nbsp;WAYBOT ROBOTICS
            </span>
            <span className="typo-body2 text-secondary">
              Интерфейс управления автономным роботом
            </span>
          </div>
        </div>

        {/* CRIA.TEAM — третий, лево */}
        <div className="case-card align-left">
          <ImageReveal>
            <CaseCardLink href="/cria-team">
              <img src={images.home.criateam} alt="CRIA.TEAM" className="w-full h-full object-cover" style={{ transform: "scale(1.38)", transformOrigin: "center 40%" }} />
            </CaseCardLink>
          </ImageReveal>
          <div className="case-card-meta">
            <span className="typo-title text-primary">
              /&nbsp;&nbsp;CRIA.TEAM
            </span>
            <span className="typo-body2 text-secondary">
              Дизайн и разработка сайта-портфолио
            </span>
          </div>
        </div>

        {/* Описание */}
        <div className="info-section">
          <p className="typo-body1 text-primary">
            UX/UI-дизайнер веб-сервисов, приложений и&nbsp;интерфейсов. Работаю над&nbsp;продуктом от&nbsp;исследования и&nbsp;концепции до&nbsp;передачи макетов в&nbsp;разработку, учитывая задачи бизнеса, потребности пользователей и&nbsp;технические стороны продукта. 
            Открыт к&nbsp;full-time предложениям и&nbsp;проектному сотрудничеству.
          </p>
          <a
            href="https://t.me/Nikita_Fendrikov"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            <ScrambleText className="typo-nav">TG: NIKITA_FENDRIKOV</ScrambleText>
          </a>
        </div>

      </div>

      <ScrollHint targetSelector=".case-card" offset={-80} />

      {/* Футер */}
      <nav className="site-nav">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline"
        >
          <ScrambleText className="typo-nav">РЕЗЮМЕ</ScrambleText>
        </a>
        <div className="nav-dot" />
        <Link href="/sandbox">
          <ScrambleText className="typo-nav">ПЕСОЧНИЦА</ScrambleText>
        </Link>
      </nav>
    </main>
  );
}
