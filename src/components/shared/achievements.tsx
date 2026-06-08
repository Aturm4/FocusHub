"use client";

import { motion } from "framer-motion";
import { Lock, Trophy } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { useTranslation } from "@/providers/locale-provider";
import { translations } from "@/i18n";

const icons = ["🎯", "🔥", "✅", "🧠", "🦉", "💯"];
const unlocked = [true, true, true, false, false, false];

export function Achievements() {
  const { t, locale } = useTranslation();
  const items = translations[locale].achievements.items;
  const unlockedCount = unlocked.filter(Boolean).length;

  return (
    <GlassCard className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-400" />
          <h3 className="font-semibold text-fg">{t("achievements.title")}</h3>
        </div>
        <span className="text-xs text-fg-subtle">
          {unlockedCount}/{items.length}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {items.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            title={`${a.title}: ${a.description}`}
            className={`group relative flex flex-col items-center rounded-xl p-3 text-center transition-all ${
              unlocked[i]
                ? "border border-violet-500/20 bg-gradient-to-b from-violet-500/20 to-transparent"
                : "bg-white/5 opacity-50"
            }`}
          >
            <span className="text-2xl">{unlocked[i] ? icons[i] : "🔒"}</span>
            <span className="mt-1 text-[10px] font-medium text-fg/60 line-clamp-1">
              {a.title}
            </span>
            {!unlocked[i] && (
              <Lock className="absolute right-1 top-1 h-3 w-3 text-slate-300 dark:text-white/20" />
            )}
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
