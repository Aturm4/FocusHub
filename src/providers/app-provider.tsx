"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useTheme } from "@/providers/theme-provider";
import { useTasks } from "@/hooks/use-tasks";
import { usePomodoro } from "@/hooks/use-pomodoro";
import { useAmbient } from "@/hooks/use-ambient";
import type { AppSettings } from "@/types";
import type { Task } from "@/types";

type AppContextType = {
  settings: AppSettings;
  updateSettings: (s: Partial<AppSettings>) => void;
  tasks: ReturnType<typeof useTasks>;
  pomodoro: ReturnType<typeof usePomodoro>;
  ambient: ReturnType<typeof useAmbient>;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (v: boolean) => void;
  matrixMode: boolean;
  setMatrixMode: (v: boolean) => void;
  showShortcuts: boolean;
  setShowShortcuts: (v: boolean) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const { settings, updateSettings } = useTheme();
  const tasks = useTasks();
  const pomodoro = usePomodoro();
  const ambient = useAmbient();
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  return (
    <AppContext.Provider
      value={{
        settings,
        updateSettings,
        tasks,
        pomodoro,
        ambient,
        commandPaletteOpen,
        setCommandPaletteOpen,
        matrixMode,
        setMatrixMode,
        showShortcuts,
        setShowShortcuts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
