"use client";

import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const NavContext = createContext<{ navigateTo: (href: string) => void }>({ navigateTo: () => {} });

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const [dotCount, setDotCount] = useState(1);
  const dotInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const targetHref = useRef<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (targetHref.current && pathname === targetHref.current) {
      targetHref.current = null;
      setFading(true);
      setTimeout(() => {
        setVisible(false);
        setFading(false);
        if (dotInterval.current) clearInterval(dotInterval.current);
      }, 800);
    }
  }, [pathname]);

  const navigateTo = useCallback((href: string) => {
    setVisible(true);
    setFading(false);
    setDotCount(1);
    targetHref.current = href;

    dotInterval.current = setInterval(() => {
      setDotCount(c => c === 3 ? 1 : c + 1);
    }, 400);

    setTimeout(() => {
      router.push(href);
    }, 1000);
  }, [router]);

  return (
    <NavContext.Provider value={{ navigateTo }}>
      {visible && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "var(--background)",
            opacity: fading ? 0 : 1,
            transition: fading ? "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
            pointerEvents: fading ? "none" : "all",
          }}
        >
          <div className="site-header">
            <span className="typo-nav text-primary">
              ЗАГРУЗКА
              <span style={{ visibility: dotCount >= 1 ? "visible" : "hidden" }}>.</span>
              <span style={{ visibility: dotCount >= 2 ? "visible" : "hidden" }}>.</span>
              <span style={{ visibility: dotCount >= 3 ? "visible" : "hidden" }}>.</span>
            </span>
          </div>
        </div>
      )}
      {children}
    </NavContext.Provider>
  );
}

export const useNavigation = () => useContext(NavContext);
