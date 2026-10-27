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

function SectionLabel({ children, className = "typo-nav" }: { children: string; className?: string }) {
  return <h2 className={`home-section-label ${className}`}>/&nbsp;&nbsp;{children}</h2>;
}

/* Кейсы: плитка 2×2 */
const CASES: {
  name: string;
  kind: string;
  desc: string;
  tags: string[];
  href: string;
  external?: boolean;
  src: string;
  imgStyle?: React.CSSProperties;
}[] = [
  {
    name: "AgonX",
    kind: "платформа турниров по единоборствам",
    desc: "Придумал название и бренд, перенёс айдентику в интерфейс и дизайн-систему",
    tags: ["2025–2026", "Product & Brand Designer", "Нейминг, айдентика, UX/UI, дизайн-система"],
    href: "/agonx",
    src: images.home.agonx,
  },
  {
    name: "Refined Renders",
    kind: "студия 3D-визуализации",
    desc: "Платформа бренда, ключевая идея «From rough to refined» и фирменный стиль",
    tags: ["2026 — сейчас", "Brand Designer", "Нейминг, платформа бренда, айдентика"],
    href: "/renders.pdf",
    external: true,
    src: images.communications.presentations.one,
  },
  {
    name: "Waybot Robotics",
    kind: "роботы-уборщики",
    desc: "Интерфейс управления автономным роботом",
    tags: ["2025–2026", "Communications & UX/UI Designer", "UX/UI, 3D, полиграфия, сайт"],
    href: "/waybot",
    src: images.home.waybot,
  },
  {
    name: "CRIA",
    kind: "студия архитектурной визуализации",
    desc: "Дизайн и разработка сайта-портфолио",
    tags: ["2024–2025", "Web Designer", "Структура, дизайн, вёрстка"],
    href: "/cria-team",
    src: images.home.criateam,
    imgStyle: { transform: "scale(1.38)", transformOrigin: "center 40%" },
  },
];

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

        <section id="cases" className="home-section home-section--cases">
          <SectionLabel className="typo-title">Кейсы</SectionLabel>

          <div className="cases-grid">
            {CASES.map((c) => (
              <article key={c.name} className="case-tile">
                <ImageReveal>
                  <CaseCardLink href={c.href} external={c.external}>
                    <img src={c.src} alt={c.name} className="w-full h-full object-cover" style={c.imgStyle} />
                    <ul className="case-tile-tags">
                      {c.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </CaseCardLink>
                </ImageReveal>

                <div className="case-tile-head">
                  <h3 className="case-tile-title">
                    {c.name} <span className="text-secondary">{c.kind}</span>
                  </h3>
                  <p className="typo-body2 text-primary">{c.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="sites" className="home-section">
          <SectionLabel>Сайты</SectionLabel>
          <SitesTab />
        </section>

        <section id="print" className="home-section">
          <SectionLabel>Печатная продукция</SectionLabel>
          <ProductionTab />
        </section>

        <section id="presentations" className="home-section">
          <SectionLabel>Презентации</SectionLabel>
          <PresentationsTab />
        </section>

        <section id="three-d" className="home-section">
          <SectionLabel>3D</SectionLabel>
          <ThreeDTab />
        </section>

        <section id="animation" className="home-section">
          <SectionLabel>Анимация</SectionLabel>
          <AnimationTab />
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
