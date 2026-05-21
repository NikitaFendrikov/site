"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDotCount(c => c === 3 ? 1 : c + 1);
    }, 400);
    return () => clearInterval(dotInterval);
  }, []);

  useEffect(() => {
    let loaded = false;
    let timerDone = false;

    const tryFade = () => {
      if (loaded && timerDone) {
        setFading(true);
        setTimeout(() => setGone(true), 800);
      }
    };

    const onLoad = () => { loaded = true; tryFade(); };
    const onTimer = () => { timerDone = true; tryFade(); };

    setTimeout(onTimer, 1500);

    if (document.readyState === "complete") {
      loaded = true;
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    if (fading) {
      setTimeout(() => window.dispatchEvent(new CustomEvent("preloader:done")), 300);
    }
  }, [fading]);

  useEffect(() => {
    if (gone) setGone(true);
  }, [gone]);

  if (gone) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "var(--background)",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: fading ? "none" : "all",
      }}
    >
      <div aria-hidden="true" className="border-lines">
        <div className="absolute top-0 bottom-0 w-px bg-primary opacity-10" style={{ left: "var(--border-x)" }} />
        <div className="absolute top-0 bottom-0 w-px bg-primary opacity-10" style={{ right: "var(--border-x)" }} />
      </div>
      <div className="site-header">
        <span className="typo-nav text-primary">
          ЗАГРУЗКА
          <span style={{ visibility: dotCount >= 1 ? "visible" : "hidden" }}>.</span>
          <span style={{ visibility: dotCount >= 2 ? "visible" : "hidden" }}>.</span>
          <span style={{ visibility: dotCount >= 3 ? "visible" : "hidden" }}>.</span>
        </span>
      </div>
    </div>
  );
}
