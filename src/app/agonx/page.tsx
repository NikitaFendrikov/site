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
    text: "С&nbsp;российского рынка платформ для&nbsp;проведения турниров ушёл Smoothcomp. Самым распространённым аналогом Shakasports неудобно пользоваться.",
    photo: images.agonx.one,
  },
  {
    number: "02",
    title: "Идея",
    text: "Мы&nbsp;решили создать собственную платформу, применяя продуктовый подход.",
    photo: images.agonx.two,
  },
  {
    number: "03",
    title: "Ресёрч",
    text: "Я&nbsp;провёл анализ конкурентов и&nbsp;исследование пользователей по&nbsp;трём ролям — атлет, организатор, судья. Ключевой инсайт: главный пользователь платформы — организатор, его&nbsp;мнение о&nbsp;платформе в&nbsp;приоритете.",
    photo: images.agonx.three,
  },
  {
    number: "04",
    title: "Разработка",
    text: "Пропустили этап вайрфреймов, чтобы принимать решения уже на&nbsp;основе реальных данных пользователей. Одновременно создавал первые экраны и&nbsp;дизайн-концепцию, на&nbsp;этой базе вместе с&nbsp;командой разработчиков развернули дизайн-систему, продолжаем итерировать продукт.",
    photo: images.agonx.four,
  },
  {
    number: "05",
    title: "Бренд",
    text: "Придумал название, разработал логотип и&nbsp;стратегию бренда. AgonX&nbsp;— от&nbsp;греческого ἀγών (состязание, турнир), X&nbsp;добавляет tech-ощущение.",
    photo: images.agonx.five,
  },
  {
    number: "06",
    title: "Результат",
    text: "Платформа сэкономила минимум два часа времени атлетам и&nbsp;организаторам уже на&nbsp;первом турнире. Известна дата следующего турнира, скоро будем полноценно выходить на&nbsp;рынок.",
    photo: images.agonx.six,
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

export default function AgonxPage() {
  return (
    <main className="page-root theme-agonx">

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
              AgonX&nbsp;— цифровая платформа для&nbsp;проведения турниров по&nbsp;единоборствам.{" "}
              Я&nbsp;дизайнер проекта: спроектировал интерфейс с&nbsp;нуля и&nbsp;создал бренд со&nbsp;стратегией.
            </p>
            <a
              href="https://agonx.ru"
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
                <span className="typo-metrics text-primary">358 ↑</span>
                <span className="typo-body2 text-secondary">регистраций атлетов</span>
              </div>
              <div className="metrics-cell">
                <span className="typo-metrics text-primary">392 ↑</span>
                <span className="typo-body2 text-secondary">схватки проведено</span>
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
