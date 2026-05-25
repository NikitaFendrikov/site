"use client";

import { useEffect, useState } from "react";
import ScrambleText from "./ScrambleText";
import { getLenis } from "@/lib/lenis-store";

export default function ScrollHint({ targetSelector, offset = 0 }: { targetSelector?: string; offset?: number }) {
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const check = () => {
      setAtBottom(window.innerHeight + window.scrollY >= document.body.scrollHeight - 4);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  const handleClick = () => {
    const lenis = getLenis();

    let target = window.scrollY + window.innerHeight * 0.6;

    if (targetSelector) {
      const elements = Array.from(document.querySelectorAll<HTMLElement>(targetSelector));
      const next = elements.find(el => el.getBoundingClientRect().top > window.innerHeight * 0.5);
      if (next) {
        const rect = next.getBoundingClientRect();
        const center = (window.innerHeight - rect.height) / 2;
        target = window.scrollY + rect.top - center + offset;
      }
    }

    if (lenis) {
      lenis.scrollTo(target);
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="scroll-hint"
      aria-label="Прокрутить вниз"
      style={{
        opacity: atBottom ? 0 : 1,
        transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: atBottom ? "none" : "all",
      }}
    >
      <ScrambleText className="typo-nav">СКРОЛЛ ↓</ScrambleText>
    </button>
  );
}
