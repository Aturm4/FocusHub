"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { useTranslation } from "@/providers/locale-provider";
import { cn } from "@/utils/cn";

export function LandingNavbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-default bg-white/90 backdrop-blur-xl dark:bg-black/60"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-fg">{t("common.appName")}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <a href="#features" className="text-sm text-fg-muted hover:text-fg">
            {t("common.features")}
          </a>
          <Link href="/dashboard" className="text-sm text-fg-muted hover:text-fg">
            {t("common.demo")}
          </Link>
          <Link href="/login" className="text-sm text-fg-muted hover:text-fg">
            {t("common.login")}
          </Link>
          <LanguageSwitcher />
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              {t("common.signIn")}
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">{t("common.getStarted")}</Button>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            className="rounded-lg p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-default bg-white px-4 py-4 dark:bg-black/90 md:hidden">
          <nav className="flex flex-col gap-3">
            <a
              href="#features"
              className="text-sm text-fg-muted"
              onClick={() => setMobileOpen(false)}
            >
              {t("common.features")}
            </a>
            <Link href="/dashboard" className="text-sm text-slate-700 dark:text-fg-muted">
              {t("common.demo")}
            </Link>
            <Link href="/login" className="text-sm text-slate-700 dark:text-fg-muted">
              {t("common.login")}
            </Link>
            <Link href="/register">
              <Button className="w-full">{t("common.getStarted")}</Button>
            </Link>
          </nav>
        </div>
      )}
    </motion.header>
  );
}
