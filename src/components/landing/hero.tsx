"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Timer, CheckCircle2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/providers/locale-provider";
import { translations } from "@/i18n";

export function Hero() {
  const { t, locale } = useTranslation();
  const h = translations[locale].landing.hero;

  const previewStats = [
    { label: h.focusHours, value: "127.5h", icon: Timer },
    { label: h.completed, value: "342", icon: CheckCircle2 },
    { label: h.streak, value: `12 ${t("common.days")}`, icon: TrendingUp },
  ];

  const columns = [h.columns.todo, h.columns.inProgress, h.columns.done];

  return (
    <section className="relative min-h-screen overflow-hidden pt-24">
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-20 h-72 w-72 animate-blob rounded-full bg-violet-600/30 blur-[100px]" />
        <div className="absolute right-1/4 top-40 h-96 w-96 animate-blob rounded-full bg-indigo-600/20 blur-[120px] [animation-delay:2s]" />
        <div className="absolute bottom-20 left-1/3 h-64 w-64 animate-blob rounded-full bg-cyan-500/15 blur-[80px] [animation-delay:4s]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300"
          >
            <Sparkles className="h-4 w-4" />
            {h.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl text-5xl font-bold tracking-tight text-fg sm:text-6xl lg:text-7xl"
          >
            {h.title1}{" "}
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              {h.title2}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg text-fg-muted"
          >
            {h.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="/register">
              <Button size="lg" className="group">
                {h.startFocusing}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="secondary" size="lg">
                <Play className="h-4 w-4" />
                {h.viewDemo}
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="relative mx-auto mt-20 max-w-5xl">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 top-8 z-10 hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl sm:block lg:-left-12"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-fg-subtle">{h.tasksDone}</p>
                <p className="text-lg font-bold text-fg">342</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -right-4 top-16 z-10 hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl sm:block lg:-right-12"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20">
                <Timer className="h-5 w-5 text-violet-400" />
              </div>
              <div>
                <p className="text-xs text-fg-subtle">{h.focusToday}</p>
                <p className="text-lg font-bold text-fg">4.5h</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-1 shadow-2xl backdrop-blur-xl"
          >
            <div className="rounded-xl bg-[#0a0a0f] p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-4 text-xs text-fg-subtle">{h.dashboardPreview}</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {previewStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/5 bg-white/5 p-4"
                  >
                    <stat.icon className="mb-2 h-4 w-4 text-violet-400" />
                    <p className="text-xs text-fg-subtle">{stat.label}</p>
                    <p className="text-xl font-bold text-fg">{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {columns.map((col, i) => (
                  <div key={col} className="rounded-lg bg-white/5 p-3">
                    <p className="mb-2 text-xs font-medium text-fg/50">{col}</p>
                    {[1, 2].slice(0, 3 - i).map((n) => (
                      <div key={n} className="mb-2 h-8 rounded-lg bg-white/5" />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
