"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useApp } from "@/providers/app-provider";
import { useTranslation } from "@/providers/locale-provider";
import { translations } from "@/i18n";

export function KeyboardShortcuts() {
  const { showShortcuts, setShowShortcuts } = useApp();
  const { locale, t } = useTranslation();
  const items = translations[locale].shortcuts.items;

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "?" && !e.ctrlKey && !e.metaKey) {
        const target = e.target as HTMLElement;
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
        e.preventDefault();
        setShowShortcuts(true);
      }
      if (e.key === "n" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        window.location.href = "/dashboard/tasks";
      }
      if (e.key === "t" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        window.location.href = "/dashboard/timer";
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setShowShortcuts]);

  return (
    <AnimatePresence>
      {showShortcuts && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm dark:bg-black/60"
          onClick={() => setShowShortcuts(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel w-full max-w-md p-6 shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-fg">{t("shortcuts.title")}</h3>
              <button
                onClick={() => setShowShortcuts(false)}
                className="rounded-lg p-1 text-fg-subtle hover:bg-slate-100 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-2">
              {items.map((s) => (
                <div
                  key={s.action}
                  className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-white/5"
                >
                  <span className="text-sm text-fg-muted">{s.action}</span>
                  <div className="flex gap-1">
                    {s.keys.map((k) => (
                      <kbd
                        key={k}
                        className="rounded-md border border-default bg-surface px-2 py-0.5 font-mono text-xs text-fg-muted"
                      >
                        {k}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
