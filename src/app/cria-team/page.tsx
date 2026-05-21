"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { images } from "@/lib/images";
import ScrambleText from "@/components/ScrambleText";

const cards = [
  {
    number: "01",
    title: "Проблема",
    text: "У студии не было своего сайта. В&nbsp;общении с&nbsp;новыми клиентами каждый раз приходилось по новой рассказывать о&nbsp;себе и&nbsp;показывать свои работы. Была попытка сделать сайт самостоятельно.",
    photo: images.criateam.one,
  },
  {
    number: "02",
    title: "Ограничения",
    text: "Сайт нужен был «вчера», что не&nbsp;совпадало с&nbsp;долгим ожиданием разработки в&nbsp;студии. Плюс был оплачен тариф в&nbsp;тильде на&nbsp;год вперёд.",
    photo: images.criateam.two,
  },
  {
    number: "03",
    title: "Стратегия",
    text: "Дизайн сайта предложил сделать в&nbsp;фигме, а&nbsp;разработку сайта сделать не&nbsp;при&nbsp;помощи тильдовских инструментов, а&nbsp;кодом и&nbsp;нейросетями.",
    photo: images.criateam.three,
  },
  {
    number: "04",
    title: "Фича",
    text: "Заменил CDN тильды для&nbsp;более качественного и&nbsp;быстрого отображения рендеров на&nbsp;CDN Sanity.",
    photo: images.criateam.four,
  },
  {
    number: "05",
    title: "Результат",
    text: "У&nbsp;студии появился сайт. Теперь не&nbsp;нужно каждый раз по&nbsp;новой рассказывать о&nbsp;себе&nbsp;клиентам и&nbsp;показывать им&nbsp;работы.",
    photo: images.criateam.five,
  },
];

function CaseCard({ number, title, text, photo }: (typeof cards)[0]) {
  const [open, setOpen] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    const answer = answerRef.current;
    if (!answer) return;

    if (open) {
      answer.style.height = answer.scrollHeight + "px";
      requestAnimationFrame(() => {
        answer.style.height = "0";
      });
      setOpen(false);
    } else {
      setOpen(true);
      answer.style.height = "0";
      requestAnimationFrame(() => {
        answer.style.height = answer.scrollHeight + "px";
      });
      const handler = (e: TransitionEvent) => {
        if (e.propertyName === "height") {
          answer.style.height = "auto";
          answer.removeEventListener("transitionend", handler);
        }
      };
      answer.addEventListener("transitionend", handler);
    }
  };

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
        <div
          className="case-card-title-row"
          onClick={handleToggle}
          role="button"
          aria-expanded={open}
        >
          <div className="case-card-title-left">
            <span className="case-card-number">
              <span>[</span>
              <span className="case-card-number-val">{number}</span>
              <span>]</span>
            </span>
            <span className="typo-title text-primary uppercase">{title}</span>
          </div>
          <span className="case-card-toggle typo-title text-primary">
            <span>[</span>
            <span className="case-card-toggle-icon">{open ? "-" : "+"}</span>
            <span>]</span>
          </span>
        </div>
        <div
          ref={answerRef}
          style={{ height: 0, overflow: "hidden", transition: "height 0.25s ease" }}
        >
          <p className="typo-body2 text-secondary" dangerouslySetInnerHTML={{ __html: text }} />
        </div>
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
              CRIA — студия архитектурной визуализации, которая работает с&nbsp;бюро США и&nbsp;Европы.{" "}
              Я полностью создал сайт-портфолио — от&nbsp;дизайна до&nbsp;конечного кода.
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
    </main>
  );
}
