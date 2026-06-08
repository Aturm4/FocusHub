"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { useTranslation } from "@/providers/locale-provider";
import { translations } from "@/i18n";

const avatars = ["SC", "MJ", "ER"];

export function Testimonials() {
  const { locale } = useTranslation();
  const tm = translations[locale].landing.testimonials;

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold text-fg sm:text-4xl">{tm.title}</h2>
          <p className="mt-4 text-fg-muted">{tm.subtitle}</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {tm.items.map((item, i) => (
            <GlassCard key={item.name} delay={i * 0.1} className="p-6">
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mb-6 text-sm leading-relaxed text-fg-muted">
                &ldquo;{item.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-xs font-bold text-fg">
                  {avatars[i]}
                </div>
                <div>
                  <p className="text-sm font-medium text-fg">{item.name}</p>
                  <p className="text-xs text-fg-subtle">{item.role}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
