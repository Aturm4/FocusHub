"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Timer, CheckSquare, TrendingUp, ArrowRight, Flame } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { QuoteGenerator } from "@/components/shared/quote-generator";
import { Achievements } from "@/components/shared/achievements";
import { AmbientPlayer } from "@/components/music/ambient-player";
import { PomodoroTimer } from "@/components/timer/pomodoro-timer";
import { useApp } from "@/providers/app-provider";
import { useTranslation } from "@/providers/locale-provider";
import { MOCK_STATS } from "@/utils/mock-data";

export default function DashboardPage() {
  const { pomodoro, tasks } = useApp();
  const { t } = useTranslation();
  const activeTasks = tasks.tasks.filter((tk) => !tk.completed).length;

  const greetingKey =
    new Date().getHours() < 12
      ? "morning"
      : new Date().getHours() < 17
      ? "afternoon"
      : "evening";

  const stats = [
    {
      label: t("dashboard.focusHours"),
      value: `${MOCK_STATS.totalFocusHours}${t("common.hours")}`,
      icon: Timer,
      href: "/dashboard/timer",
      color: "text-violet-400",
      bg: "bg-violet-500/10",
    },
    {
      label: t("dashboard.activeTasks"),
      value: activeTasks,
      icon: CheckSquare,
      href: "/dashboard/tasks",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: t("dashboard.streak"),
      value: `${MOCK_STATS.currentStreak}d`,
      icon: Flame,
      href: "/dashboard/statistics",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      label: t("dashboard.sessions"),
      value: pomodoro.sessionsCompleted,
      icon: TrendingUp,
      href: "/dashboard/statistics",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-fg"
        >
          {t(`dashboard.greeting.${greetingKey}`)}, {t("dashboard.letsFocus")}
        </motion.h1>
        <p className="text-sm text-fg-subtle">
          {t("dashboard.tasksWaiting", { count: activeTasks })}
        </p>
      </div>

      <QuoteGenerator />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Link key={s.label} href={s.href}>
            <GlassCard hover delay={i * 0.05} className="p-5">
              <div className={`mb-3 inline-flex rounded-xl p-2.5 ${s.bg}`}>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <p className="text-2xl font-bold text-fg">{s.value}</p>
              <div className="mt-1 flex items-center justify-between">
                <p className="text-xs text-fg-subtle">{s.label}</p>
                <ArrowRight className="h-3 w-3 text-slate-300 dark:text-white/20" />
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="flex flex-col items-center p-8">
          <h2 className="mb-6 self-start text-lg font-semibold text-fg">
            {t("dashboard.quickFocus")}
          </h2>
          <PomodoroTimer />
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="p-5">
            <h3 className="mb-4 font-medium text-fg">{t("dashboard.recentTasks")}</h3>
            <div className="space-y-2">
              {tasks.tasks
                .filter((tk) => !tk.completed)
                .slice(0, 4)
                .map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5"
                  >
                    <div
                      className={`h-2 w-2 rounded-full ${
                        task.priority === "urgent"
                          ? "bg-red-400"
                          : task.priority === "high"
                          ? "bg-orange-400"
                          : "bg-violet-400"
                      }`}
                    />
                    <span className="flex-1 truncate text-sm text-slate-700 dark:text-white/80">
                      {task.title}
                    </span>
                    <span className="text-[10px] capitalize text-fg-subtle">
                      {t(`dashboard.status.${task.status}`)}
                    </span>
                  </div>
                ))}
            </div>
            <Link
              href="/dashboard/tasks"
              className="mt-4 inline-flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300"
            >
              {t("dashboard.viewAllTasks")} <ArrowRight className="h-3 w-3" />
            </Link>
          </GlassCard>
          <AmbientPlayer />
        </div>
      </div>

      <Achievements />
    </div>
  );
}
