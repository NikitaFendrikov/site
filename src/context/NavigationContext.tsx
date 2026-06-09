"use client";

import { createContext, useContext, useCallback } from "react";
import { useRouter } from "next/navigation";
const NavContext = createContext<{ navigateTo: (href: string) => void }>({ navigateTo: () => {} });

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const navigateTo = useCallback((href: string) => {
    router.push(href);
  }, [router]);

  return (
    <NavContext.Provider value={{ navigateTo }}>
      {children}
    </NavContext.Provider>
  );
}

export const useNavigation = () => useContext(NavContext);
