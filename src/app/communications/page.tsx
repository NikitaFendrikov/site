"use client";

import { useState } from "react";
import Link from "next/link";
import { images } from "@/lib/images";
import ScrambleText from "@/components/ScrambleText";
import ImageReveal from "@/components/ImageReveal";
import { getLenis } from "@/lib/lenis-store";

type Tab = "production" | "animation" | "3d" | "presentations" | "sites";

const TABS: { id: Tab; label: string }[] = [
  { id: "production",    label: "ПЕЧАТНАЯ ПРОДУКЦИЯ" },
  { id: "animation",     label: "АНИМАЦИЯ" },
  { id: "3d",            label: "3D" },
  { id: "presentations", label: "ПРЕЗЕНТАЦИИ" },
  { id: "sites",         label: "САЙТЫ" },
];

function ProductionTab() {
  const p = images.communications.production;
  return (
    <div className="comms-tab-content">
      <div className="comms-group">
        <div className="comms-prod-banners">
          <img src={p.one}   alt="" className="block w-full h-auto" />
          <img src={p.two}   alt="" className="block w-full h-auto" />
        </div>
        <p className="typo-body1 text-primary">Баннеры для выставочных стендов (рендеры делал сам).</p>
      </div>

      <div className="comms-group">
        <div className="comms-prod-poster">
          <img src={p.three} alt="" className="comms-prod-poster-left block h-auto" />
          <div className="comms-prod-poster-right">
            <img src={p.four} alt="" className="block w-full h-auto" />
            <img src={p.five} alt="" className="block w-full h-auto" />
          </div>
        </div>
        <p className="typo-body1 text-primary">Афиша для турнира по единоборствам под разный формат с применением AI-генерации.</p>
      </div>

      <div className="comms-group">
        <div className="comms-prod-cards">
          <img src={p.six}    alt="" className="block w-full h-auto" />
          <img src={p.seven}  alt="" className="block w-full h-auto" />
          <img src={p.eight}  alt="" className="block w-full h-auto" />
          <img src={p.nine}   alt="" className="block w-full h-auto" />
          <img src={p.ten}    alt="" className="block w-full h-auto" />
          <img src={p.eleven} alt="" className="block w-full h-auto" />
        </div>
        <p className="typo-body1 text-primary">Визитки для раздачи на выставках.</p>
      </div>

      <div className="comms-group">
        <div className="comms-prod-stickers">
          <img src={p.twelve}   alt="" className="block w-full h-auto" />
          <img src={p.thirteen} alt="" className="block w-full h-auto" />
          <img src={p.fourteen} alt="" className="block w-full h-auto" />
        </div>
        <p className="typo-body1 text-primary">Подготовка наклеек для роботов к печати.</p>
      </div>
    </div>
  );
}

function AnimationTab() {
  const a = images.communications.animation;
  const items = [
    { src: a.one,   label: "3D-анимация для LED-вентилятора." },
    { src: a.two,   label: "Лоудер для страниц интерфейса." },
    { src: a.three, label: "Анимация при прерванном соединении." },
    { src: a.four,  label: "Анимация при блокировке планшета." },
  ];
  return (
    <div className="comms-tab-content">
      <div className="comms-anim-grid">
        {items.map(({ src, label }) => (
          <div key={src} className="comms-anim-item">
            <div className="comms-anim-video">
              <video src={src} autoPlay muted loop playsInline />
            </div>
            <p className="typo-body1 text-primary">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ThreeDTab() {
  const d = images.communications.threeD;
  return (
    <div className="comms-tab-content">
      <div className="comms-group">
        <img src={d.one} alt="" className="comms-3d-hero block w-full h-auto" />
        <p className="typo-body1 text-primary">Иллюстрация для hero-блока страницы одной из моделей робота уборщика.</p>
      </div>

      <div className="comms-group">
        <div className="comms-3d-grid">
          <img src={d.two}   alt="" className="block w-full h-auto" />
          <img src={d.three} alt="" className="block w-full h-auto" />
          <img src={d.four}  alt="" className="block w-full h-auto" />
          <img src={d.five}  alt="" className="block w-full h-auto" />
          <img src={d.six}   alt="" className="block w-full h-auto" />
          <img src={d.seven} alt="" className="block w-full h-auto" />
          <img src={d.eight} alt="" className="block w-full h-auto" />
          <img src={d.nine}  alt="" className="block w-full h-auto" />
          <p className="typo-body1 text-primary comms-3d-caption">Иллюстрации для страниц расходных материалов.</p>
        </div>
      </div>

      <div className="comms-group">
        <div className="comms-3d-pair">
          <img src={d.ten}    alt="" className="block w-full h-auto" />
          <img src={d.eleven} alt="" className="block w-full h-auto" />
        </div>
        <p className="typo-body1 text-primary">3D-рендеры моделей роботов с нанесением логотипов клиентов или инвесторов компании.</p>
      </div>
    </div>
  );
}

function PresentationCard({ src, label, desc, href, align }: {
  src: string; label: string; desc: string; href: string; align: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className={`case-card align-${align}`}>
      <ImageReveal>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="case-card-image"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img src={src} alt={label} className="w-full h-full object-cover" />
          <div className="card-overlay">
            <ScrambleText className="typo-nav site-overlay-text" style={{ color: "#ffffff" }} playing={hovered}>
              ОТКРЫТЬ PDF
            </ScrambleText>
          </div>
        </a>
      </ImageReveal>
      <div className="case-card-meta">
        <span className="typo-title text-primary">{label}</span>
        <span className="typo-body2 text-secondary">{desc}</span>
      </div>
    </div>
  );
}

function PresentationsTab() {
  const p = images.communications.presentations;
  const items = [
    { src: p.one,   label: "/ REFINED RENDERS", desc: "Концепт бренда для студии 3D-визуализации",       href: "/renders.pdf",       align: "left"  },
    { src: p.two,   label: "/ WAYBOT ROBOTICS", desc: "Презентация для зарубежных инвесторов",           href: "/waybot.pdf",        align: "right" },
    { src: p.three, label: "/ WAYBOT ROBOTICS", desc: "Презентация для спикеров по шаблону мероприятий", href: "/cleaning-club.pdf", align: "left"  },
  ];
  return (
    <div className="comms-tab-content">
      {items.map((item) => (
        <PresentationCard key={item.src} {...item} />
      ))}
    </div>
  );
}

function SiteCard({ src, label, desc, href, align }: {
  src: string; label: string; desc: string; href: string; align: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className={`case-card align-${align}`}>
      <ImageReveal>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="case-card-image"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img src={src} alt={label} className="w-full h-full object-cover" />
          <div className="card-overlay">
            <ScrambleText className="typo-nav site-overlay-text" style={{ color: "#ffffff" }} playing={hovered}>
              ПЕРЕЙТИ НА САЙТ
            </ScrambleText>
          </div>
        </a>
      </ImageReveal>
      <div className="case-card-meta">
        <span className="typo-title text-primary">{label}</span>
        <span className="typo-body2 text-secondary">{desc}</span>
      </div>
    </div>
  );
}

function SitesTab() {
  const s = images.communications.sites;
  const items = [
    { src: s.one,   label: "/ CRIA.TEAM",      desc: "Сайт-портфолио",                       href: "https://cria.team/", align: "left"  },
    { src: s.two,   label: "/ LYNK & CO",       desc: "Сайт для приёма заявок на автомобили", href: "https://lynkco-cars.ru/", align: "right" },
    { src: s.three, label: "/ WAYBOT ROBOTICS", desc: "Корпоративный сайт компании",          href: "https://waybotrobotics.com/", align: "left"  },
  ];
  return (
    <div className="comms-tab-content">
      {items.map((item) => (
        <SiteCard key={item.src} {...item} />
      ))}
    </div>
  );
}

export default function CommunicationsPage() {
  const [tab, setTab] = useState<Tab>("production");

  function handleTab(id: Tab) {
    setTab(id);
    getLenis()?.scrollTo(0, { immediate: true });
  }

  return (
    <main className="page-root comms-page">
      <div aria-hidden className="border-lines">
        <div className="absolute top-0 bottom-0 w-px bg-primary opacity-10" style={{ left: "var(--border-x)" }} />
        <div className="absolute top-0 bottom-0 w-px bg-primary opacity-10" style={{ right: "var(--border-x)" }} />
      </div>

      <div className="site-header">
        <Link href="/"><ScrambleText className="typo-nav">НА ГЛАВНУЮ</ScrambleText></Link>
      </div>

      <nav className="comms-tabs-nav">
        <div className="comms-tabs-pill">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              className={`comms-tab-btn${tab === id ? " active" : ""}`}
              onClick={() => handleTab(id)}
            >
              <span className="typo-nav">{label}</span>
              {tab === id && <div className="comms-tab-dot" />}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile placeholder */}
      <div className="comms-mobile-placeholder">
        <p className="typo-body2 text-primary" style={{ textAlign: "center" }}>
          Мобильная адаптация страницы находится на стадии разработки. К сожалению эту страницу пока можно посмотреть только на компьютере.
        </p>
        <Link href="/"><ScrambleText className="typo-nav">НА ГЛАВНУЮ</ScrambleText></Link>
      </div>

      <div className="comms-content">
        {tab === "production"    && <ProductionTab />}
        {tab === "animation"     && <AnimationTab />}
        {tab === "3d"            && <ThreeDTab />}
        {tab === "presentations" && <PresentationsTab />}
        {tab === "sites"         && <SitesTab />}
      </div>
    </main>
  );
}
