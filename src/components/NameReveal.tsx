"use client";

import { useEffect, useRef } from "react";

export default function NameReveal({ children }: { children: React.ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.style.animationPlayState = "running";
    }
  }, []);

  return (
    <div className="reveal-wrap">
      <div
        ref={innerRef}
        style={{
          display: "inline-block",
          animation: "slide-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both paused",
        }}
      >
        {children}
      </div>
    </div>
  );
}
