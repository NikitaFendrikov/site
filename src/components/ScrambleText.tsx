"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function ScrambleText({
  children,
  className,
  playing,
  style,
}: {
  children: string;
  className?: string;
  playing?: boolean;
  style?: React.CSSProperties;
}) {
  const [display, setDisplay] = useState(children);
  const frameRef = useRef<number | null>(null);

  const scramble = useCallback(() => {
    let iteration = 0;
    const original = children;
    const totalFrames = original.length * 3;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    const animate = () => {
      setDisplay(
        original.split("").map((char, i) => {
          if (char === " ") return " ";
          if (i < Math.floor(iteration / 3)) return original[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      );
      iteration++;
      if (iteration <= totalFrames) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplay(original);
      }
    };

    animate();
  }, [children]);

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
