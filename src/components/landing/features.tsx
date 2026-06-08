"use client";

import { motion } from "framer-motion";
import {
  CheckSquare,
  Timer,
  BarChart3,
  Music,
  Keyboard,
  Trophy,
  Zap,
  Shield,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { useTranslation } from "@/providers/locale-provider";
import { translations } from "@/i18n";

const icons = [CheckSquare, Timer, BarChart3, Music, Keyboard, Trophy, Zap, Shield];
const styles = [
  { color: "text-violet-400", bg: "bg-violet-500/10" },
  { color: "text-indigo-400", bg: "bg-indigo-500/10" },
  { color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { color: "text-pink-400", bg: "bg-pink-500/10" },
  { color: "text-amber-400", bg: "bg-amber-500/10" },
  { color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { color: "text-orange-400", bg: "bg-orange-500/10" },
  { color: "text-blue-400", bg: "bg-blue-500/10" },
];

export function Features() {
  const { locale } = useTranslation();
  const f = translations[locale].landing.features;

  return (
    <section id="features" className="relative py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-fg sm:text-4xl">
            {f.title1}{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              {f.title2}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-fg-muted">{f.subtitle}</p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {f.items.map((item, i) => {
            const Icon = icons[i];
            const style = styles[i];
            return (
              <GlassCard key={item.title} hover delay={i * 0.05} className="p-6">
                <div className={`mb-4 inline-flex rounded-xl p-3 ${style.bg}`}>
                  <Icon className={`h-6 w-6 ${style.color}`} />
                </div>
                <h3 className="mb-2 font-semibold text-fg">{item.title}</h3>
                <p className="text-sm text-fg-muted">{item.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
