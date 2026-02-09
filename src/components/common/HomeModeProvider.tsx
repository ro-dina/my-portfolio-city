"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type HomeMode = "standard" | "city";

type Ctx = {
  mode: HomeMode;
  setMode: (mode: HomeMode) => void;
  toggleMode: () => void;
};

const STORAGE_KEY = "home_mode";

const HomeModeContext = createContext<Ctx | null>(null);

export function HomeModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<HomeMode>("standard");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "standard" || saved === "city") {
      setModeState(saved);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const setMode = (next: HomeMode) => setModeState(next);
  const toggleMode = () => setModeState((prev) => (prev === "standard" ? "city" : "standard"));

  const value = useMemo(() => ({ mode, setMode, toggleMode }), [mode]);

  return <HomeModeContext.Provider value={value}>{children}</HomeModeContext.Provider>;
}

export function useHomeMode() {
  const ctx = useContext(HomeModeContext);
  if (!ctx) throw new Error("useHomeMode must be used within <HomeModeProvider>");
  return ctx;
}
