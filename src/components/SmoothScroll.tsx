"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { setLenis, getLenis } from "@/lib/lenis-store";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    getLenis()?.scrollTo(0, { immediate: true });
  }, [pathname]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    setLenis(lenis);
    requestAnimationFrame(raf);

    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
