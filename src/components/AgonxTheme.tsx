"use client";

import { useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function AgonxTheme() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("agonx");
    return () => setTheme("default");
  }, [setTheme]);

  return null;
}
