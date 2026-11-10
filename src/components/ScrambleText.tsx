"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function ScrambleText({
  children,
  className,
  playing,
  style,
  msPerChar = 33,
  shuffleMs = 50,
}: {
  children: string;
  className?: string;
  playing?: boolean;
  style?: React.CSSProperties;
  msPerChar?: number; // сколько мс на одну букву: меньше — быстрее
  shuffleMs?: number; // как часто меняются случайные символы, мс (0 — каждый кадр)
}) {
  const [display, setDisplay] = useState(children);
  const frameRef = useRef<number | null>(null);

  const scramble = useCallback(() => {
    const original = children;
    const total = original.length * msPerChar;
    let start: number | null = null;
    let lastShuffle = -Infinity;
    let noise = "";

    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    // Время, а не кадры: скорость одинакова на 60 и 120 Гц
    const animate = (now: number) => {
      if (start === null) start = now;
      const elapsed = now - start;

      if (elapsed >= total) {
        setDisplay(original);
        return;
      }

      if (now - lastShuffle >= shuffleMs) {
        noise = original.split("").map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join("");
        lastShuffle = now;
      }

      const revealed = Math.floor(elapsed / msPerChar);
      setDisplay(
        original.split("").map((char, i) => {
          if (char === " ") return " ";
          if (i < revealed) return char;
          return noise[i];
        }).join("")
      );
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
  }, [children, msPerChar, shuffleMs]);

  const reset = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setDisplay(children);
  }, [children]);

  const prevPlaying = useRef(playing);
  useEffect(() => {
    if (playing && !prevPlaying.current) scramble();
    if (!playing && prevPlaying.current) reset();
    prevPlaying.current = playing;
  }, [playing, scramble, reset]);

  const selfManaged = playing === undefined;

  return (
    <span
      className={className}
      style={style}
      onMouseEnter={selfManaged ? scramble : undefined}
      onMouseLeave={selfManaged ? reset : undefined}
    >
      {display}
    </span>
  );
}
