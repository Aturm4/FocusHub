"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { Clock, CheckCircle2, Flame, TrendingUp } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { useTranslation } from "@/providers/locale-provider";
import { translations } from "@/i18n";
import { MOCK_STATS } from "@/utils/mock-data";

function Heatmap({ data, lessLabel, moreLabel }: {
  data: { date: string; value: number }[];
  lessLabel: string;
  moreLabel: string;
}) {
  const weeks: { date: string; value: number }[][] = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  const colors = [
    "bg-white/5",
    "bg-violet-500/20",
    "bg-violet-500/40",
    "bg-violet-500/60",
    "bg-violet-500/80",
  ];

  return (
    <div className="space-y-1">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex gap-1">
          {week.map((day) => (
            <div
              key={day.date}
              title={`${day.date}: ${day.value}h`}
              className={`h-3 w-3 rounded-sm ${colors[day.value] ?? colors[0]}`}
            />
          ))}
        </div>
      ))}
      <div className="mt-2 flex items-center justify-end gap-1 text-[10px] text-fg-subtle">
        <span>{lessLabel}</span>
        {colors.map((c, i) => (
          <div key={i} className={`h-2.5 w-2.5 rounded-sm ${c}`} />
        ))}
        <span>{moreLabel}</span>
      </div>
    </div>
  );
}

export function StatisticsDashboard() {
  const { t, locale } = useTranslation();
  const stats = MOCK_STATS;
  const dayLabels = translations[locale].stats.days;
  const monthLabels = translations[locale].stats.months;

  const weeklyData = stats.weeklyFocus.map((d) => ({
    ...d,
    day: dayLabels[d.day as keyof typeof dayLabels] ?? d.day,
  }));

  const monthlyData = stats.monthlyTasks.map((d) => ({
    ...d,
    month: monthLabels[d.month as keyof typeof monthLabels] ?? d.month,
  }));

  const statCards = [
    { label: t("stats.totalFocusHours"), value: `${stats.totalFocusHours}h`, icon: Clock },
    { label: t("stats.completedTasks"), value: stats.completedTasks, icon: CheckCircle2 },
    { label: t("stats.currentStreak"), value: `${stats.currentStreak} ${t("common.days")}`, icon: Flame },
    { label: t("stats.longestStreak"), value: `${stats.longestStreak} ${t("common.days")}`, icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-fg">{t("stats.title")}</h1>
        <p className="text-sm text-fg-subtle">{t("stats.subtitle")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard className="p-5">
              <s.icon className="mb-3 h-5 w-5 text-violet-400" />
              <p className="text-2xl font-bold text-fg">{s.value}</p>
              <p className="text-xs text-fg-subtle">{s.label}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <h3 className="mb-4 font-medium text-fg">{t("stats.weeklyFocus")}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="day" stroke="#ffffff40" fontSize={12} />
                <YAxis stroke="#ffffff40" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "#0c0c12",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="hours" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="mb-4 font-medium text-fg">{t("stats.monthlyTasks")}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="month" stroke="#ffffff40" fontSize={12} />
                <YAxis stroke="#ffffff40" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "#0c0c12",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={{ fill: "#06b6d4", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h3 className="mb-4 font-medium text-fg">{t("stats.heatmap")}</h3>
        <Heatmap
          data={stats.heatmap}
          lessLabel={t("common.less")}
          moreLabel={t("common.more")}
        />
      </GlassCard>
    </div>
  );
}
