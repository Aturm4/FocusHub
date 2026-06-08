"use client";

import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Coffee, Brain } from "lucide-react";
import { useApp } from "@/providers/app-provider";
import { useTranslation } from "@/providers/locale-provider";
import { Button } from "@/components/ui/button";
import type { TimerMode } from "@/types";
import { cn } from "@/utils/cn";

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function PomodoroTimer() {
  const { pomodoro } = useApp();
  const { t } = useTranslation();
  const {
    mode,
    setMode,
    customFocus,
    setCustomFocus,
    customBreak,
    setCustomBreak,
    sessionType,
    timeLeft,
    isRunning,
    progress,
    sessionsCompleted,
    start,
    pause,
    reset,
  } = pomodoro;

  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference * (1 - progress);

  const modes: { id: TimerMode; label: string }[] = [
    { id: "25/5", label: "25 / 5" },
    { id: "50/10", label: "50 / 10" },
    { id: "custom", label: t("timer.custom") },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 flex gap-2">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={cn(
              "rounded-xl px-4 py-2 text-sm font-medium transition-all",
              mode === m.id
                ? "bg-violet-600 text-white shadow-lg shadow-violet-500/25"
                : "bg-surface text-fg-muted hover:bg-surface-hover hover:text-fg"
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      {mode === "custom" && (
        <div className="mb-6 flex gap-4">
          <div className="flex items-center gap-2">
            <label className="text-xs text-fg-subtle">{t("timer.customFocus")}</label>
            <input
              type="number"
              min={1}
              max={120}
              value={customFocus}
              onChange={(e) => setCustomFocus(Number(e.target.value))}
              className="w-16 rounded-lg border border-default bg-surface px-2 py-1 text-sm text-fg"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-fg-subtle">{t("timer.customBreak")}</label>
            <input
              type="number"
              min={1}
              max={60}
              value={customBreak}
              onChange={(e) => setCustomBreak(Number(e.target.value))}
              className="w-16 rounded-lg border border-default bg-surface px-2 py-1 text-sm text-fg"
            />
          </div>
        </div>
      )}

      <div className="relative">
        {isRunning && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                "0 0 60px rgba(139,92,246,0.2)",
                "0 0 100px rgba(139,92,246,0.4)",
                "0 0 60px rgba(139,92,246,0.2)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        <svg width="280" height="280" className="-rotate-90">
          <circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="8"
          />
          <motion.circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke={sessionType === "focus" ? "#8b5cf6" : "#10b981"}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className={cn(
              "mb-2 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
              sessionType === "focus"
                ? "bg-violet-500/20 text-violet-300"
                : "bg-emerald-500/20 text-emerald-300"
            )}
          >
            {sessionType === "focus" ? (
              <Brain className="h-3.5 w-3.5" />
            ) : (
              <Coffee className="h-3.5 w-3.5" />
            )}
            {sessionType === "focus" ? t("timer.focus") : t("timer.break")}
          </div>
          <motion.span
            key={timeLeft}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="font-mono text-5xl font-bold tabular-nums text-fg"
          >
            {formatTime(timeLeft)}
          </motion.span>
          <p className="mt-2 text-xs text-fg-subtle">
            {sessionsCompleted} {t("timer.sessionsCompleted")}
          </p>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        {!isRunning ? (
          <Button size="lg" onClick={start}>
            <Play className="h-5 w-5" /> {t("timer.start")}
          </Button>
        ) : (
          <Button size="lg" variant="secondary" onClick={pause}>
            <Pause className="h-5 w-5" /> {t("timer.pause")}
          </Button>
        )}
        <Button size="lg" variant="outline" onClick={reset}>
          <RotateCcw className="h-5 w-5" /> {t("timer.reset")}
        </Button>
      </div>
    </div>
  );
}
