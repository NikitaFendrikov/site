import { images } from "@/lib/images";
import CaseCardLink from "@/components/CaseCardLink";
import ImageReveal from "@/components/ImageReveal";
import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import PrintBento from "@/components/PrintBento";
import HomeScrollHint from "@/components/HomeScrollHint";
import ThreeDSection from "@/components/ThreeDSection";
import HomeFooter from "@/components/HomeFooter";
import {
  AnimationTab,
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
  label?: string; // текст на ховере, по умолчанию «СМОТРЕТЬ КЕЙС»
  src: string;
  imgStyle?: React.CSSProperties;
}[] = [
  {
    name: "AgonX",
    desc: "Платформа для турниров по единоборствам: 3 турнира, 500+ атлетов, 550+ схваток. Исследовал процессы организаторов и судей, спроектировал регистрацию, участие и цифровое судейство, которое экономит организаторам минимум 2 часа на турнир. Собрал дизайн-систему из 50+ компонентов.",
    tags: ["2025–2026", "Исследование", "UX/UI", "Дизайн-система"],
    href: "/agonx",
    src: images.home.agonx,
  },
  {
    name: "Waybot Robotics",
    desc: "Производитель автономных роботов-уборщиков, резидент «Сколково». Спроектировал интерфейс робота для операторов и техспециалистов, и обращений к технической команде стало на 80% меньше. Сделал корпоративный сайт, который принёс 50+ B2B-заявок.",
    tags: ["2025–2026", "UX/UI", "B2B", "Сайт"],
    href: "/waybot",
    src: images.waybot.six,
  },
  {
    name: "CRIA",
    desc: "Студия архитектурной 3D-визуализации, клиенты из Швеции, Норвегии, Дании и США. Спроектировал структуру сайта-портфолио и сам сверстал его на HTML, CSS и JS. Сайт привёл студии 3 новых постоянных клиента.",
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
    desc: "Портфолио студии архитектурной 3D-визуализации. Разработал дизайн вокруг рендеров студии и сам всё сверстал. Сайт привлёк трёх новых постоянных клиентов.",
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
                  <CaseCardLink
                    href={c.href}
                    external={c.external}
                    label={c.label}
                    labelClassName={c.label ? "typo-nav site-overlay-text" : undefined}
                  >
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

        <section id="print" className="home-section home-section--cases">
          <SectionLabel className="typo-title">Печатная продукция</SectionLabel>
          <PrintBento />
        </section>

        <section id="presentations" className="home-section home-section--cases">
          <SectionLabel className="typo-title">Презентации</SectionLabel>
          <PresentationsTab slash={false} />
        </section>

        <section id="three-d" className="home-section home-section--cases">
          <SectionLabel className="typo-title">3D</SectionLabel>
          <ThreeDSection />
        </section>

        <section id="animation" className="home-section home-section--cases">
          <SectionLabel className="typo-title">Анимация</SectionLabel>
          <AnimationTab />
        </section>

      </div>

      <HomeScrollHint />

      <HomeFooter />
    </main>
  );
}
