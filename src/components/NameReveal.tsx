"use client";

import { useEffect, useRef } from "react";

export default function NameReveal({ children }: { children: React.ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animate = () => {
      if (innerRef.current) {
        innerRef.current.style.animationPlayState = "running";
      }
      sessionStorage.setItem("preloader-done", "1");
    };

    const alreadyLoaded = sessionStorage.getItem("preloader-done");

    if (alreadyLoaded) {
      animate();
    } else {
      window.addEventListener("preloader:done", animate, { once: true });
      return () => window.removeEventListener("preloader:done", animate);
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
