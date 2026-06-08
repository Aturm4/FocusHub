"use client";

import { Languages } from "lucide-react";
import { useTranslation } from "@/providers/locale-provider";
import type { Locale } from "@/i18n";
import { cn } from "@/utils/cn";

interface LanguageSwitcherProps {
  variant?: "compact" | "full";
  className?: string;
}

export function LanguageSwitcher({
  variant = "compact",
  className,
}: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useTranslation();

  const options: { value: Locale; label: string }[] = [
    { value: "en", label: t("common.english") },
    { value: "ru", label: t("common.russian") },
  ];

  if (variant === "full") {
    return (
      <div className={cn("space-y-2", className)}>
        <div className="flex items-center gap-2 text-sm text-fg-muted">
          <Languages className="h-4 w-4" />
          {t("common.language")}
        </div>
        <div className="flex gap-2">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setLocale(opt.value)}
              className={cn(
                "flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all",
                locale === opt.value
                  ? "border-violet-500/50 bg-violet-500/10 text-violet-700 dark:text-violet-300"
                  : "border-default bg-surface text-fg-muted hover:border-slate-300 dark:hover:border-white/20"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center rounded-xl border border-default bg-surface p-0.5",
        className
      )}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setLocale(opt.value)}
          className={cn(
            "rounded-lg px-2.5 py-1 text-xs font-medium transition-all",
            locale === opt.value
              ? "bg-violet-600 text-white"
              : "text-fg-muted hover:text-fg"
          )}
          aria-label={opt.label}
        >
          {opt.value.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
