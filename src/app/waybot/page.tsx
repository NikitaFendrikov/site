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
    text: "Продукт планомерно подходил к&nbsp;этапу разработки, когда робота можно было уже использовать для&nbsp;уборки без&nbsp;участия технической команды. Под&nbsp;запуск и&nbsp;другие функции нужен был интерфейс.",
    photo: images.waybot.one,
  },
  {
    number: "02",
    title: "Задача",
    text: "Кроме запуска при&nbsp;помощи интерфейса нужно было решать другие задачи: составление сценариев уборки и&nbsp;расписания, диагностика расходников, оценка качества уборки при&nbsp;помощи статистики.",
    photo: images.waybot.two,
  },
  {
    number: "03",
    title: "Ограничения",
    text: "Аудитория&nbsp;— операторы без&nbsp;технической подготовки. В&nbsp;процессе исследования аудитории выяснили, какие задачи для&nbsp;них приоритетны, а&nbsp;какие второстепенны&nbsp;— это определило иерархию функций в&nbsp;интерфейсе.",
    photo: images.waybot.three,
  },
  {
    number: "04",
    title: "Архитектура",
    text: "До&nbsp;отрисовки макетов согласовали структуру на&nbsp;словах: какие экраны нужны, зачем каждый и&nbsp;какой функционал на&nbsp;нём будет.",
    photo: images.waybot.four,
  },
  {
    number: "05",
    title: "Разработка",
    text: "Предложил три концепции, выбрали мягкую со&nbsp;множеством цветов для&nbsp;снижения лишней тревоги. Собрали дизайн-систему с&nbsp;разработчиком и&nbsp;итерационно довели интерфейс до&nbsp;финала&nbsp;— через фидбек от&nbsp;операторов.",
    photo: images.waybot.five,
  },
  {
    number: "06",
    title: "Результат",
    text: "Интерфейс запущен на&nbsp;реальных роботах. Операторы самостоятельно запускают уборку и&nbsp;настраивают сценарии без&nbsp;помощи технической команды.",
    photo: images.waybot.six,
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

export default function WaybotPage() {
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

        {/* Левая колонка — описание и результат */}
        <aside className="case-sidebar">
          <div className="case-sidebar-info">
            <p className="typo-body1 text-primary">
              Waybot Robotics&nbsp;— производитель автономных роботов-уборщиков для&nbsp;коммерческих помещений.{" "}
              Я спроектировал интерфейс управления роботом для&nbsp;технически неподкованных пользователей.
            </p>
          </div>

          <div className="metrics-box">
            <div className="metrics-header">
              <div className="nav-dot" />
              <span className="typo-title text-primary">АВТОНОМНАЯ НАСТРОЙКА</span>
            </div>
            <div className="metrics-cells">
              <div className="metrics-cell">
                <span className="typo-body2 text-secondary">Операторы самостоятельно настраивают сценарии уборки без&nbsp;помощи технической команды.</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Правая колонка — карточки */}
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
