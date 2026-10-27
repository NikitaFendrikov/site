"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { images } from "@/lib/images";

/* Раздел «3D» на главной: те же три блока, что на /communications,
   но каждый помещается в экран, а расходники — горизонтальной лентой */
export default function ThreeDSection() {
  const d = images.communications.threeD;
  const ribbon = [d.two, d.three, d.four, d.five, d.six, d.seven, d.eight, d.nine];

  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const wheelLock = useRef(false);
  const [edges, setEdges] = useState({ start: true, end: false });

  // Шаг ленты — ширина карточки плюс отступ
  const step = useCallback((dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>(".three-d-card");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  }, []);

  const updateEdges = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 2,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
    });
  }, []);

  // Колесо с Shift листает ленту по одной карточке, не трогая страницу
  useEffect(() => {
    const el = track.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (!e.shiftKey) return;
      e.preventDefault();
      e.stopPropagation();
      if (wheelLock.current) return;
      const delta = e.deltaY || e.deltaX;
      if (!delta) return;
      wheelLock.current = true;
      step(delta > 0 ? 1 : -1);
      setTimeout(() => { wheelLock.current = false; }, 350);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", updateEdges);
    };
  }, [step, updateEdges]);

  // Перетаскивание мышью; после отпускания — к ближайшей карточке
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !track.current) return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft };
    track.current.setPointerCapture(e.pointerId);
    track.current.classList.add("is-dragging");
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !track.current) return;
    track.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };

  const onPointerUp = () => {
    const el = track.current;
    if (!drag.current || !el) return;
    drag.current = null;

    const cards = Array.from(el.querySelectorAll<HTMLElement>(".three-d-card"));
    const nearest = cards.reduce((best, c) =>
      Math.abs(c.offsetLeft - el.scrollLeft) < Math.abs(best.offsetLeft - el.scrollLeft) ? c : best
    );
    el.scrollTo({ left: nearest.offsetLeft, behavior: "smooth" });
    setTimeout(() => el.classList.remove("is-dragging"), 400);
  };

  return (
    <div className="comms-tab-content">
      <div className="comms-group">
        <img src={d.one} alt="" className="three-d-fit block" />
        <p className="typo-body1 text-primary">Иллюстрация для hero-блока страницы одной из моделей робота уборщика.</p>
      </div>

      <div className="comms-group">
        <div className="three-d-ribbon-nav">
          <button
            type="button"
            className="three-d-arrow"
            aria-label="Предыдущие иллюстрации"
            disabled={edges.start}
            onClick={() => step(-1)}
          >
            ←
          </button>
          <button
            type="button"
            className="three-d-arrow"
            aria-label="Следующие иллюстрации"
            disabled={edges.end}
            onClick={() => step(1)}
          >
            →
          </button>
        </div>

        <div
          ref={track}
          className="three-d-ribbon"
          onScroll={updateEdges}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {ribbon.map((src) => (
            <div key={src} className="three-d-card">
              <img src={src} alt="" draggable={false} />
            </div>
          ))}
        </div>

        <p className="typo-body1 text-primary">Иллюстрации для страниц расходных материалов.</p>
      </div>

      <div className="comms-group">
        <div className="comms-3d-pair">
          <img src={d.ten}    alt="" className="three-d-fit block" />
          <img src={d.eleven} alt="" className="three-d-fit block" />
        </div>
        <p className="typo-body1 text-primary">3D-рендеры моделей роботов с нанесением логотипов клиентов или инвесторов компании.</p>
      </div>
    </div>
  );
}
