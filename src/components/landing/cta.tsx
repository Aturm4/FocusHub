"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/providers/locale-provider";
import { translations } from "@/i18n";

export function CTA() {
  const { locale } = useTranslation();
  const c = translations[locale].landing.cta;

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-transparent p-12 text-center backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-600/10 via-transparent to-transparent" />
          <div className="relative">
            <h2 className="text-3xl font-bold text-fg sm:text-4xl">{c.title}</h2>
            <p className="mx-auto mt-4 max-w-lg text-fg-muted">{c.subtitle}</p>
            <Link href="/register" className="mt-8 inline-block">
              <Button size="lg" className="group">
                {c.button}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
