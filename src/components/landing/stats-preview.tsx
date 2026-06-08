"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { GlassCard } from "@/components/ui/glass-card";
import { useTranslation } from "@/providers/locale-provider";
import { translations } from "@/i18n";

const chartData = [
  { day: "Mon", hours: 3.2 },
  { day: "Tue", hours: 4.5 },
  { day: "Wed", hours: 2.8 },
  { day: "Thu", hours: 5.1 },
  { day: "Fri", hours: 4.0 },
  { day: "Sat", hours: 1.5 },
  { day: "Sun", hours: 2.2 },
];

export function StatsPreview() {
  const { locale } = useTranslation();
  const s = translations[locale].landing.stats;
  const dayLabels = translations[locale].stats.days;

  const data = chartData.map((d) => ({
    ...d,
    day: dayLabels[d.day as keyof typeof dayLabels] ?? d.day,
  }));

  const statCards = [
    { label: s.focusHours, value: "127.5h" },
    { label: s.tasksDone, value: "342" },
    { label: s.bestStreak, value: "28d" },
  ];

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-fg sm:text-4xl">
              {s.title1}{" "}
              <span className="text-violet-400">{s.title2}</span>
            </h2>
            <p className="mt-4 text-fg-muted">{s.subtitle}</p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {statCards.map((card) => (
                <div
                  key={card.label}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-2xl font-bold text-fg">{card.value}</p>
                  <p className="text-xs text-fg-subtle">{card.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <GlassCard className="p-6">
            <p className="mb-4 text-sm font-medium text-fg/60">{s.weeklyChart}</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#ffffff30" fontSize={12} />
                  <YAxis stroke="#ffffff30" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "#0c0c12",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="hours"
                    stroke="#8b5cf6"
                    fill="url(#colorHours)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
