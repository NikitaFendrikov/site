"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { images } from "@/lib/images";
import ScrambleText from "@/components/ScrambleText";
import ScrollHint from "@/components/ScrollHint";

const cards = [
  {
    number: "01",
    title: "Проблема",
    text: "У студии не было своего сайта. В&nbsp;общении с&nbsp;новыми клиентами каждый раз приходилось по новой рассказывать о&nbsp;себе и&nbsp;показывать свои работы. Была попытка сделать сайт самостоятельно.",
    photo: images.criateam.one,
  },
  {
    number: "02",
    title: "Стратегия",
    text: "Предложил спроектировать сайт в&nbsp;Figma вокруг рендеров студии и&nbsp;собрать его кодом, а&nbsp;не&nbsp;шаблонами Тильды.",
    photo: images.criateam.three,
  },
  {
    number: "03",
    title: "Фича",
    text: "Перенёс хранение изображений на&nbsp;отдельный сервис&nbsp;— рендеры грузятся быстрее и&nbsp;без&nbsp;потери качества.",
    photo: images.criateam.four,
  },
  {
    number: "04",
    title: "Результат",
    text: "У&nbsp;студии появился сайт, который сам рассказывает о&nbsp;ней клиентам. Он&nbsp;привёл 3&nbsp;новых постоянных клиента.",
    photo: images.criateam.five,
  },
];

function CaseCard({ number, title, text, photo }: (typeof cards)[0]) {
  return (
    <div className="case-card-item">
      <motion.div
        className="case-card-photo"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="case-card-photo-inner">
          <img src={photo} alt={title} className="w-full h-auto block" />
        </div>
      </motion.div>
      <div className="case-card-desc">
        <div className="case-card-title-row">
          <div className="case-card-title-left">
            <span className="case-card-number">
              <span>[</span>
              <span className="case-card-number-val">{number}</span>
              <span>]</span>
            </span>
            <span className="typo-title text-primary uppercase">{title}</span>
          </div>
        </div>
        <p className="typo-body2 text-secondary" dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </div>
  );
}

export default function CriaTeamPage() {
  return (
    <main className="page-root">

      {/* Боковые линии */}
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

      {/* Хедер — назад */}
      <div className="site-header">
        <Link href="/"><ScrambleText className="typo-nav">НАЗАД</ScrambleText></Link>
      </div>

      {/* Грид страницы */}
      <div className="case-page-grid">

        {/* Левая колонка — описание и метрики */}
        <aside className="case-sidebar">
          <div className="case-sidebar-info">
            <p className="typo-body1 text-primary">
              CRIA&nbsp;— студия архитектурной 3D-визуализации, которая работает с&nbsp;бюро из&nbsp;Швеции, Норвегии, Дании и&nbsp;США.{" "}
              Я&nbsp;полностью создал сайт-портфолио от&nbsp;дизайна до&nbsp;кода.
            </p>
            <a
              href="https://cria.team"
              target="_blank"
              rel="noopener noreferrer"
              className="case-site-link"
            >
              <ScrambleText className="typo-nav">ССЫЛКА НА САЙТ</ScrambleText>
              <div className="case-site-link-line" />
            </a>
          </div>

          <div className="metrics-box">
            <div className="metrics-header">
              <div className="nav-dot" />
              <span className="typo-title text-primary">МЕТРИКИ</span>
            </div>
            <div className="metrics-cells">
              <div className="metrics-cell">
                <span className="typo-metrics text-primary">580 ↑</span>
                <span className="typo-body2 text-secondary">посетителя сайта</span>
              </div>
              <div className="metrics-cell">
                <span className="typo-metrics text-primary">3 ↑</span>
                <span className="typo-body2 text-secondary">новых клиента</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Правая колонка — карточки-аккордеон */}
        <div className="case-cards-col">
          {cards.map((card) => (
            <CaseCard key={card.number} {...card} />
          ))}
        </div>

      </div>
      <ScrollHint targetSelector=".case-card-photo" offset={60} />
    </main>
  );
}
