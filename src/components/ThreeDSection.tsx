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
  const target = useRef(0);
  const frame = useRef<number | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 2,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
    });
  }, []);

  // Плавная прокрутка без привязки к карточкам: позиция догоняет цель,
  // цель упирается в края ленты
  const glideTo = useCallback((left: number) => {
    const el = track.current;
    if (!el) return;
    target.current = Math.max(0, Math.min(left, el.scrollWidth - el.clientWidth));

    if (frame.current !== null) return;
    // Позицию считаем дробной: scrollLeft округляется до пикселя и иначе застревает у цели
    let pos = el.scrollLeft;
    const tick = () => {
      const diff = target.current - pos;
      if (Math.abs(diff) < 0.5) {
        el.scrollLeft = target.current;
        frame.current = null;
        return;
      }
      pos += diff * 0.14;
      el.scrollLeft = pos;
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }, []);

  const stopGlide = () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
  };

  // От текущей цели, если лента ещё едет, иначе от текущей позиции
  const base = () => (frame.current !== null ? target.current : track.current?.scrollLeft ?? 0);

  // Стрелки сдвигают на ширину одной карточки
  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>(".three-d-card");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    glideTo(base() + dir * (card.offsetWidth + gap));
  };

  // Колесо с Shift двигает ленту, не трогая страницу
  useEffect(() => {
    const el = track.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (!e.shiftKey) return;
      e.preventDefault();
      e.stopPropagation();
      const delta = e.deltaY || e.deltaX;
      if (delta) glideTo(base() + delta * 1.5);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", updateEdges);
      stopGlide();
    };
  }, [glideTo, updateEdges]);

  // Перетаскивание мышью
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !track.current) return;
    stopGlide();
    drag.current = { x: e.clientX, left: track.current.scrollLeft };
    track.current.setPointerCapture(e.pointerId);
    track.current.classList.add("is-dragging");
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !track.current) return;
    track.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };

  const onPointerUp = () => {
    if (!drag.current || !track.current) return;
    drag.current = null;
    track.current.classList.remove("is-dragging");
  };

  return (
    <div className="comms-tab-content">
      <div className="comms-group">
        <img src={d.one} alt="" className="three-d-fit block" />
        <p className="typo-body1 text-primary text-center">Иллюстрация для hero-блока страницы одной из моделей робота уборщика.</p>
      </div>

      <div className="comms-group">
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

        <div className="three-d-ribbon-foot">
          <p className="typo-body1 text-primary">Иллюстрации для страниц расходных материалов.</p>
          <div className="three-d-ribbon-nav">
            <button
              type="button"
              className="three-d-arrow"
              aria-label="Прокрутить ленту влево"
              disabled={edges.start}
              onClick={() => step(-1)}
            >
              ←
            </button>
            <button
              type="button"
              className="three-d-arrow"
              aria-label="Прокрутить ленту вправо"
              disabled={edges.end}
              onClick={() => step(1)}
            >
              →
            </button>
          </div>
        </div>
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
