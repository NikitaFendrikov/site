import Link from "next/link";
import { images } from "@/lib/images";
import ScrambleText from "@/components/ScrambleText";
import CaseCardLink from "@/components/CaseCardLink";
import ImageReveal from "@/components/ImageReveal";
import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import {
  ProductionTab,
  AnimationTab,
  ThreeDTab,
  PresentationsTab,
  SitesTab,
} from "@/components/CommsSections";

function SectionLabel({ children }: { children: string }) {
  return <h2 className="home-section-label typo-nav">/&nbsp;&nbsp;{children}</h2>;
}

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

      <SiteHeader />

      <Hero />

      {/* Разделы — якоря навигации в шапке */}
      <div className="home-sections">

        <section id="cases" className="home-section">
          <SectionLabel>Кейсы</SectionLabel>

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
        </section>

        <section id="print" className="home-section">
          <SectionLabel>Печатная продукция</SectionLabel>
          <ProductionTab />
        </section>

        <section id="animation" className="home-section">
          <SectionLabel>Анимация</SectionLabel>
          <AnimationTab />
        </section>

        <section id="three-d" className="home-section">
          <SectionLabel>3D</SectionLabel>
          <ThreeDTab />
        </section>

        <section id="presentations" className="home-section">
          <SectionLabel>Презентации</SectionLabel>
          <PresentationsTab />
        </section>

        <section id="sites" className="home-section">
          <SectionLabel>Сайты</SectionLabel>
          <SitesTab />
        </section>

      </div>

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
