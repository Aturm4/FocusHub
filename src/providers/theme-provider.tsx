"use client";

import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { AppSettings } from "@/types";

const DEFAULT: AppSettings = {
  theme: "dark",
  accentColor: "#8b5cf6",
  notifications: true,
  soundEnabled: true,
  timerMode: "25/5",
  customFocus: 25,
  customBreak: 5,
};

function applyThemeToDocument(settings: AppSettings) {
  const root = document.documentElement;
  const isLight = settings.theme === "light";
  root.classList.toggle("light", isLight);
  root.classList.toggle("dark", !isLight);
  root.style.colorScheme = isLight ? "light" : "dark";
  root.style.setProperty("--accent", settings.accentColor);
  root.style.setProperty("--primary", settings.accentColor);
}

type ThemeContextType = {
  settings: AppSettings;
  updateSettings: (partial: Partial<AppSettings>) => void;
  isHydrated: boolean;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings, isHydrated] = useLocalStorage<AppSettings>(
    "fh-settings",
    DEFAULT
  );

  useEffect(() => {
    if (isHydrated) applyThemeToDocument(settings);
  }, [settings, isHydrated]);

  const updateSettings = useCallback(
    (partial: Partial<AppSettings>) => {
      setSettings((prev) => {
        const next = { ...prev, ...partial };
        applyThemeToDocument(next);
        return next;
      });
    },
    [setSettings]
  );

  return (
    <ThemeContext.Provider value={{ settings, updateSettings, isHydrated }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
