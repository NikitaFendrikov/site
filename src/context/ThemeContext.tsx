"use client";

import { createContext, useContext, useState } from "react";

type Theme = "default" | "agonx";

const ThemeContext = createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({
  theme: "default",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("default");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        className={theme === "agonx" ? "theme-agonx" : ""}
        style={{
          backgroundColor: "var(--background)",
          transition: "background-color 0.5s ease",
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
