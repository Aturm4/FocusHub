"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Quote } from "lucide-react";
import { useTranslation } from "@/providers/locale-provider";
import { translations } from "@/i18n";

export function QuoteGenerator() {
  const { locale } = useTranslation();
  const quotes = translations[locale].quotes;
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % quotes.length);

  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
      <Quote className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
      <div className="min-w-0 flex-1">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-sm italic text-fg-muted"
          >
            &ldquo;{quotes[index]}&rdquo;
          </motion.p>
        </AnimatePresence>
      </div>
      <button
        onClick={next}
        className="shrink-0 rounded-lg p-1.5 text-fg-subtle transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Next quote"
      >
        <RefreshCw className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
