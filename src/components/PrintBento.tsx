"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { images } from "@/lib/images";
import { getLenis } from "@/lib/lenis-store";
import ImageReveal from "./ImageReveal";

const p = images.communications.production;

/* Группы работ. В плитке показываем cover, в просмотре листаются все items */
const GROUPS = [
  {
    id: "tb",
    cover: ["one"],
    title: "Выставочные баннеры",
    text: "Баннеры для стендов Waybot Robotics на выставках. Сам сделал 3D-рендеры роботов и подготовил макеты к печати в большом формате.",
    items: [
      { area: "one", src: p.one },
      { area: "two", src: p.two },
    ],
  },
  {
    id: "tp",
    cover: ["three"],
    title: "Афиша турнира AgonX",
    text: "Афиша турнира по единоборствам в нескольких форматах для печати и соцсетей. Ключевой визуал собран с применением AI-генерации.",
    items: [
      { area: "three", src: p.three },
    ],
  },
  {
    id: "tc",
    cover: ["cards"],
    title: "Три варианта визитки",
    text: "Визитки для раздачи на выставках в фирменном стиле компании. Разработал макеты и подготовил их к печати.",
    items: [
      { area: "cards", src: p.cards },
    ],
  },
  {
    id: "ts",
    cover: ["twelve", "thirteen"],
    title: "Наклейки для роботов",
    text: "Наклейки для корпусов роботов Waybot Robotics. Разработал макеты и подготовил их к печати.",
    items: [
      { area: "twelve", src: p.twelve },
      { area: "thirteen", src: p.thirteen },
      { area: "fourteen", src: p.fourteen },
    ],
  },
];

/* Все работы подряд — для листания в просмотре */
const SLIDES = GROUPS.flatMap((g) => g.items.map((item) => ({ ...item, group: g.title })));

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
      <div className="cases-grid">
        {GROUPS.map((g) => (
          <article key={g.id} className="case-tile">
            <ImageReveal>
              <div className="print-frame">
                {g.cover.map((area) => {
                  const index = SLIDES.findIndex((s) => s.area === area);
                  return (
                    <button
                      key={area}
                      type="button"
                      className="print-shot"
                      aria-label={`Открыть: ${g.title}`}
                      onClick={() => setOpen(index)}
                    >
                      <img src={SLIDES[index].src} alt={g.title} />
                    </button>
                  );
                })}
              </div>
            </ImageReveal>

            <div className="case-tile-head">
              <h3 className="case-tile-title">{g.title}</h3>
              <p className="typo-body2 text-primary">{g.text}</p>
            </div>
          </article>
        ))}
      </div>

      {open !== null && <Lightbox index={open} onClose={close} onStep={step} />}
    </>
  );
}
