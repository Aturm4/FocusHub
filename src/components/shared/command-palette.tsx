"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  LayoutDashboard,
  CheckSquare,
  Timer,
  BarChart3,
  Settings,
  Plus,
  Moon,
  Sun,
  Music,
} from "lucide-react";
import { useApp } from "@/providers/app-provider";
import { useTranslation } from "@/providers/locale-provider";

export function CommandPalette() {
  const router = useRouter();
  const { commandPaletteOpen, setCommandPaletteOpen, updateSettings, settings, ambient } =
    useApp();
  const { t } = useTranslation();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  const run = (fn: () => void) => {
    fn();
    setCommandPaletteOpen(false);
  };

  if (!commandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[20vh]">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm dark:bg-black/60"
        onClick={() => setCommandPaletteOpen(false)}
      />
      <Command
        className="relative z-10 w-full max-w-lg overflow-hidden glass-panel shadow-2xl"
        label="Command Menu"
      >
        <Command.Input
          placeholder={t("command.placeholder")}
          className="w-full border-b border-default bg-transparent px-4 py-3 text-sm text-fg placeholder:text-fg-subtle focus:outline-none"
        />
        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-sm text-fg-subtle">
            {t("command.noResults")}
          </Command.Empty>
          <Command.Group heading={t("command.navigation")} className="px-2 py-1.5 text-xs text-fg-subtle">
            <Command.Item
              onSelect={() => run(() => router.push("/dashboard"))}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 aria-selected:bg-slate-100 dark:text-white/80 dark:aria-selected:bg-white/10"
            >
              <LayoutDashboard className="h-4 w-4" /> {t("nav.dashboard")}
            </Command.Item>
            <Command.Item
              onSelect={() => run(() => router.push("/dashboard/tasks"))}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 aria-selected:bg-slate-100 dark:text-white/80 dark:aria-selected:bg-white/10"
            >
              <CheckSquare className="h-4 w-4" /> {t("nav.tasks")}
            </Command.Item>
            <Command.Item
              onSelect={() => run(() => router.push("/dashboard/timer"))}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 aria-selected:bg-slate-100 dark:text-white/80 dark:aria-selected:bg-white/10"
            >
              <Timer className="h-4 w-4" /> {t("nav.focusTimer")}
            </Command.Item>
            <Command.Item
              onSelect={() => run(() => router.push("/dashboard/statistics"))}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 aria-selected:bg-slate-100 dark:text-white/80 dark:aria-selected:bg-white/10"
            >
              <BarChart3 className="h-4 w-4" /> {t("nav.statistics")}
            </Command.Item>
            <Command.Item
              onSelect={() => run(() => router.push("/dashboard/settings"))}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 aria-selected:bg-slate-100 dark:text-white/80 dark:aria-selected:bg-white/10"
            >
              <Settings className="h-4 w-4" /> {t("nav.settings")}
            </Command.Item>
          </Command.Group>
          <Command.Group heading={t("command.actions")} className="px-2 py-1.5 text-xs text-fg-subtle">
            <Command.Item
              onSelect={() => run(() => router.push("/dashboard/tasks"))}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 aria-selected:bg-slate-100 dark:text-white/80 dark:aria-selected:bg-white/10"
            >
              <Plus className="h-4 w-4" /> {t("command.newTask")}
            </Command.Item>
            <Command.Item
              onSelect={() => run(() => router.push("/dashboard/timer"))}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 aria-selected:bg-slate-100 dark:text-white/80 dark:aria-selected:bg-white/10"
            >
              <Timer className="h-4 w-4" /> {t("command.startTimer")}
            </Command.Item>
            <Command.Item
              onSelect={() => run(() => ambient.play("lofi"))}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 aria-selected:bg-slate-100 dark:text-white/80 dark:aria-selected:bg-white/10"
            >
              <Music className="h-4 w-4" /> {t("command.playLofi")}
            </Command.Item>
            <Command.Item
              onSelect={() =>
                run(() =>
                  updateSettings({
                    theme: settings.theme === "dark" ? "light" : "dark",
                  })
                )
              }
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 aria-selected:bg-slate-100 dark:text-white/80 dark:aria-selected:bg-white/10"
            >
              {settings.theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              {t("command.toggleTheme")}
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
