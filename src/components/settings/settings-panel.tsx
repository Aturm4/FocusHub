"use client";

import { motion } from "framer-motion";
import { Moon, Sun, Bell, User, Palette } from "lucide-react";
import { useApp } from "@/providers/app-provider";
import { useTranslation } from "@/providers/locale-provider";
import { ACCENT_COLORS } from "@/lib/constants";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";

export function SettingsPanel() {
  const { settings, updateSettings, matrixMode, setMatrixMode } = useApp();
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-fg">{t("settings.title")}</h1>
        <p className="text-sm text-fg-subtle">{t("settings.subtitle")}</p>
      </div>

      <section className="glass-panel p-6">
        <LanguageSwitcher variant="full" />
      </section>

      <section className="glass-panel p-6">
        <div className="mb-4 flex items-center gap-2">
          <Palette className="h-5 w-5 text-violet-400" />
          <h2 className="font-medium text-fg">{t("settings.appearance")}</h2>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm text-fg-muted">{t("settings.theme")}</label>
          <div className="flex gap-2">
            {(["dark", "light"] as const).map((theme) => (
              <button
                key={theme}
                onClick={() => updateSettings({ theme })}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm transition-all",
                  settings.theme === theme
                    ? "border-violet-500/50 bg-violet-500/10 text-violet-300"
                    : "border-default bg-surface text-fg-muted hover:border-slate-300 dark:hover:border-white/20"
                )}
              >
                {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                {t(`settings.${theme}`)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-fg-muted">{t("settings.accentColor")}</label>
          <div className="flex flex-wrap gap-3">
            {ACCENT_COLORS.map((color) => (
              <button
                key={color.value}
                onClick={() => updateSettings({ accentColor: color.value })}
                className={cn(
                  "h-10 w-10 rounded-xl transition-transform hover:scale-110",
                  settings.accentColor === color.value &&
                    "ring-2 ring-white ring-offset-2 ring-offset-[#0a0a0f]"
                )}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel p-6">
        <div className="mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-violet-400" />
          <h2 className="font-medium text-fg">{t("settings.profile")}</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs text-fg-subtle">{t("settings.fullName")}</label>
            <Input placeholder={t("settings.yourName")} defaultValue="Пользователь" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-fg-subtle">{t("settings.email")}</label>
            <Input placeholder="email@example.com" defaultValue="user@focushub.app" disabled />
          </div>
        </div>
      </section>

      <section className="glass-panel p-6">
        <div className="mb-4 flex items-center gap-2">
          <Bell className="h-5 w-5 text-violet-400" />
          <h2 className="font-medium text-fg">{t("settings.notifications")}</h2>
        </div>
        <div className="space-y-4">
          {[
            {
              key: "notifications" as const,
              label: t("settings.browserNotifications"),
              desc: t("settings.browserNotificationsDesc"),
            },
            {
              key: "soundEnabled" as const,
              label: t("settings.soundEffects"),
              desc: t("settings.soundEffectsDesc"),
            },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm text-fg">{item.label}</p>
                <p className="text-xs text-fg-subtle">{item.desc}</p>
              </div>
              <button
                onClick={() =>
                  updateSettings({
                    [item.key]: !settings[item.key],
                  })
                }
                className={cn(
                  "relative h-6 w-11 rounded-full transition-colors",
                  settings[item.key] ? "bg-violet-600" : "bg-white/10"
                )}
              >
                <motion.div
                  layout
                  className={cn(
                    "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow",
                    settings[item.key] ? "left-5" : "left-0.5"
                  )}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-panel p-6">
        <h2 className="mb-2 font-medium text-fg">{t("settings.easterEgg")}</h2>
        <p className="mb-4 text-xs text-fg-subtle">{t("settings.matrixHint")}</p>
        <button
          onClick={() => setMatrixMode(!matrixMode)}
          className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400 hover:bg-emerald-500/20"
        >
          {matrixMode ? t("matrix.exitButton") : t("settings.enterMatrix")}
        </button>
      </section>
    </div>
  );
}
