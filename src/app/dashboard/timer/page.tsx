"use client";

import { PomodoroTimer } from "@/components/timer/pomodoro-timer";
import { AmbientPlayer } from "@/components/music/ambient-player";
import { GlassCard } from "@/components/ui/glass-card";
import { useApp } from "@/providers/app-provider";
import { useTranslation } from "@/providers/locale-provider";
import { format } from "date-fns";
import { ru, enUS } from "date-fns/locale";

export default function TimerPage() {
  const { pomodoro } = useApp();
  const { t, locale } = useTranslation();
  const dateLocale = locale === "ru" ? ru : enUS;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-fg">{t("timer.title")}</h1>
        <p className="text-sm text-fg-subtle">{t("timer.subtitle")}</p>
      </div>

      <GlassCard className="flex flex-col items-center p-10">
        <PomodoroTimer />
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <AmbientPlayer />
        <GlassCard className="p-5">
          <h3 className="mb-4 font-medium text-fg">{t("timer.focusHistory")}</h3>
          {pomodoro.focusHistory.length === 0 ? (
            <p className="text-sm text-fg-subtle">{t("timer.noSessions")}</p>
          ) : (
            <div className="space-y-2">
              {pomodoro.focusHistory.slice(-7).reverse().map((h) => (
                <div
                  key={h.date}
                  className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2"
                >
                  <span className="text-sm text-fg-muted">
                    {format(new Date(h.date), "MMM d, yyyy", { locale: dateLocale })}
                  </span>
                  <span className="text-sm font-medium text-violet-400">
                    {h.minutes} {t("common.min")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
