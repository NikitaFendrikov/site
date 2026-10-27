"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { images } from "@/lib/images";
import { getLenis } from "@/lib/lenis-store";
import ImageReveal from "./ImageReveal";

const p = images.communications.production;

/* Группы работ: текстовая плитка + картинки. area — имя ячейки в grid-template-areas */
const GROUPS = [
  {
    id: "tb",
    title: "Выставочные баннеры",
    text: "Баннеры для стендов Waybot Robotics на выставках. Сам сделал 3D-рендеры роботов и подготовил макеты к печати в большом формате.",
    items: [
      { area: "one", src: p.one },
      { area: "two", src: p.two },
    ],
  },
  {
    id: "tp",
    title: "Афиша турнира AgonX",
    text: "Афиша турнира по единоборствам в нескольких форматах для печати и соцсетей. Ключевой визуал собран с применением AI-генерации.",
    items: [
      { area: "three", src: p.three },
      { area: "four", src: p.four },
      { area: "five", src: p.five },
    ],
  },
  {
    id: "tc",
    title: "Визитки Waybot Robotics",
    text: "Визитки для раздачи на выставках в фирменном стиле компании. Разработал макеты и подготовил их к печати.",
    items: [
      { area: "six", src: p.six },
      { area: "seven", src: p.seven },
      { area: "eight", src: p.eight },
      { area: "nine", src: p.nine },
      { area: "ten", src: p.ten },
      { area: "eleven", src: p.eleven },
    ],
  },
  {
    id: "ts",
    title: "Наклейки для роботов",
    text: "Наклейки для корпусов роботов Waybot Robotics. Разработал макеты и подготовил их к печати.",
    items: [
      { area: "twelve", src: p.twelve },
      { area: "thirteen", src: p.thirteen },
      { area: "fourteen", src: p.fourteen },
    ],
  },
];

/* Все 14 работ подряд — для листания в просмотре */
const SLIDES = GROUPS.flatMap((g) => g.items.map((item) => ({ ...item, group: g.title })));

/* Порядок плиток в разметке: группа за группой, текст после картинок */
const TILES = GROUPS.flatMap((g) => [
  ...g.items.map((item) => ({ kind: "image" as const, area: item.area, src: item.src, group: g.title })),
  { kind: "text" as const, area: g.id, title: g.title, text: g.text },
]);

function Lightbox({ index, onClose, onStep }: {
  index: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const touchX = useRef<number | null>(null);
  const slide = SLIDES[index];

  useEffect(() => {
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onStep]);

  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${slide.group}, ${index + 1} из ${SLIDES.length}`}
      onClick={onClose}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) onStep(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <span className="lightbox-counter">{index + 1} / {SLIDES.length}</span>

      <button type="button" className="lightbox-close" aria-label="Закрыть" onClick={onClose}>
        ✕
      </button>

      <button
        type="button"
        className="lightbox-arrow lightbox-prev"
        aria-label="Предыдущая работа"
        onClick={(e) => { stop(e); onStep(-1); }}
      >
        ←
      </button>

      <img key={slide.src} src={slide.src} alt={slide.group} className="lightbox-img" onClick={stop} />

      <button
        type="button"
        className="lightbox-arrow lightbox-next"
        aria-label="Следующая работа"
        onClick={(e) => { stop(e); onStep(1); }}
      >
        →
      </button>

      <p className="lightbox-caption">{slide.group}</p>
    </div>
  );
}

export default function PrintBento() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((dir: 1 | -1) => {
    setOpen((i) => (i === null ? i : (i + dir + SLIDES.length) % SLIDES.length));
  }, []);

  return (
    <>
      <div className="bento">
        {TILES.map((tile, i) => (
          <ImageReveal
            key={tile.area}
            className="bento-tile"
            style={{ gridArea: tile.area }}
            delay={(i % 4) * 0.08}
          >
            {tile.kind === "image" ? (
              <button
                type="button"
                className="bento-inner bento-media"
                aria-label={`Открыть: ${tile.group}`}
                onClick={() => setOpen(SLIDES.findIndex((s) => s.area === tile.area))}
              >
                <img src={tile.src} alt={tile.group} />
              </button>
            ) : (
              <div className="bento-inner bento-text">
                <h3 className="case-tile-title">{tile.title}</h3>
                <p className="typo-body2 text-primary">{tile.text}</p>
              </div>
            )}
          </ImageReveal>
        ))}
      </div>

      {open !== null && <Lightbox index={open} onClose={close} onStep={step} />}
    </>
  );
}
