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
} from "@/components/CommsSections";

function SectionLabel({ children, className = "typo-nav" }: { children: string; className?: string }) {
  return <h2 className={`home-section-label ${className}`}>/&nbsp;&nbsp;{children}</h2>;
}

/* Кейсы: плитка 2×2 */
const CASES: {
  name: string;
  desc: string;
  tags: string[];
  href: string;
  external?: boolean;
  src: string;
  imgStyle?: React.CSSProperties;
}[] = [
  {
    name: "AgonX",
    desc: "Платформа для турниров по единоборствам, через которую прошли 500+ атлетов и 550+ схваток. Придумал название и бренд с нуля, спроектировал интерфейс и дизайн-систему из 50+ компонентов на основе айдентики, сделал афиши турниров.",
    tags: ["2025–2026", "Айдентика", "UI"],
    href: "/agonx",
    src: images.home.agonx,
  },
  {
    name: "Refined Renders",
    desc: "Студия 3D-визуализации промышленного оборудования для производителей станков и техники. Придумал название, сформировал платформу бренда и ключевую идею «From rough to refined», собрал фирменный стиль и адаптировал его на 8 носителей.",
    tags: ["2026", "Айдентика", "Носители", "3D"],
    href: "/renders.pdf",
    external: true,
    src: images.communications.presentations.one,
  },
  {
    name: "Waybot Robotics",
    desc: "Производитель автономных роботов-уборщиков, резидент «Сколково» и участник ПМЭФ. Спроектировал интерфейс робота, сделал корпоративный сайт, который принёс 50+ B2B-заявок, готовил полиграфию, 3D-рендеры и презентации.",
    tags: ["2025–2026", "Сайт", "Полиграфия", "3D", "UI"],
    href: "/waybot",
    src: images.waybot.six,
  },
  {
    name: "CRIA",
    desc: "Студия архитектурной 3D-визуализации, которая работает с бюро из Швеции, Норвегии, Дании и США. Разработал структуру и дизайн сайта-портфолио и сам его сверстал — сайт привёл студии 3 новых постоянных клиента.",
    tags: ["2024–2025", "Сайт", "Вёрстка"],
    href: "/cria-team",
    src: images.home.criaSite,
  },
];

/* Сайты: та же плитка, без тегов */
const SITES: { name: string; desc: string; href: string; src: string }[] = [
  {
    name: "Waybot Robotics",
    desc: "Корпоративный сайт производителя автономных роботов-уборщиков. Спроектировал структуру и дизайн, сделал 3D-иллюстрации роботов для страниц. Сайт принёс 50+ холодных B2B-заявок на продукт стоимостью от 1,5 млн ₽.",
    href: "https://waybotrobotics.com/",
    src: images.communications.sites.three,
  },
  {
    name: "CRIA",
    desc: "Портфолио студии архитектурной 3D-визуализации. Разработал дизайн вокруг рендеров студии и сам его сверстал. Сайт привлёк трёх новых постоянных клиентов.",
    href: "https://cria.team/",
    src: images.communications.sites.one,
  },
  {
    name: "Lynk & Co",
    desc: "Сайт для приёма заявок на автомобили Lynk & Co в фирменном стиле бренда. Один из примерно 15 лендингов, которые я сделал в студии «Руформат», вместе они принесли 500+ заявок за год.",
    href: "https://lynkco-cars.ru/",
    src: images.communications.sites.two,
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
                  <h3 className="case-tile-title">{c.name}</h3>
                  <p className="typo-body2 text-primary">{c.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="sites" className="home-section home-section--cases">
          <SectionLabel className="typo-title">Сайты</SectionLabel>

          <div className="cases-grid">
            {SITES.map((s) => (
              <article key={s.name} className="case-tile">
                <ImageReveal>
                  <CaseCardLink
                    href={s.href}
                    external
                    label="ПЕРЕЙТИ НА САЙТ"
                    labelClassName="typo-nav site-overlay-text"
                  >
                    <img src={s.src} alt={s.name} className="w-full h-full object-cover" />
                  </CaseCardLink>
                </ImageReveal>

                <div className="case-tile-head">
                  <h3 className="case-tile-title">{s.name}</h3>
                  <p className="typo-body2 text-primary">{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
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
