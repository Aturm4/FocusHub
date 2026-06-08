"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Bell, Menu, Command, LogOut } from "lucide-react";
import { RealtimeClock } from "@/components/shared/realtime-clock";
import { AmbientPlayer } from "@/components/music/ambient-player";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { useApp } from "@/providers/app-provider";
import { useTranslation } from "@/providers/locale-provider";
import { createClient } from "@/lib/supabase/client";

const mobileNav = [
  { href: "/dashboard", labelKey: "nav.dashboard" },
  { href: "/dashboard/tasks", labelKey: "nav.tasks" },
  { href: "/dashboard/timer", labelKey: "nav.focusTimer" },
  { href: "/dashboard/statistics", labelKey: "nav.statistics" },
  { href: "/dashboard/settings", labelKey: "nav.settings" },
];

export function Navbar() {
  const { setCommandPaletteOpen } = useApp();
  const { t } = useTranslation();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // demo mode
    }
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b border-default bg-white/80 px-4 backdrop-blur-xl dark:bg-black/40 lg:px-6">
      <div className="flex items-center gap-3 lg:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-white/60 dark:hover:bg-white/10"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link href="/dashboard" className="font-bold text-fg">
          {t("common.appName")}
        </Link>
      </div>

      <button
        onClick={() => setCommandPaletteOpen(true)}
        className="hidden items-center gap-2 rounded-xl border border-default bg-surface px-4 py-2 text-sm text-fg-subtle transition-colors hover:border-slate-300 hover:text-fg-muted sm:flex dark:hover:border-white/20 dark:hover:text-white/60"
      >
        <Search className="h-4 w-4" />
        <span>{t("common.search")}</span>
        <kbd className="ml-8 rounded-md border border-default bg-surface px-1.5 py-0.5 font-mono text-[10px]">
          Ctrl K
        </kbd>
      </button>

      <div className="hidden md:block">
        <RealtimeClock />
      </div>

      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <AmbientPlayer compact />
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-white/60 dark:hover:bg-white/10 sm:hidden"
        >
          <Command className="h-4 w-4" />
        </button>
        <button className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-white/60 dark:hover:bg-white/10">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-violet-500" />
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-xs font-medium text-fg">
          FH
        </div>
        <button
          onClick={handleLogout}
          className="hidden rounded-lg p-2 text-fg-subtle hover:bg-slate-100 hover:text-fg dark:hover:bg-white/10 dark:hover:text-white lg:block"
          title={t("nav.logout")}
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-0 right-0 top-16 border-b border-default bg-white p-4 dark:bg-[#0a0a0f] lg:hidden"
        >
          <nav className="space-y-1">
            {mobileNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-fg-muted dark:hover:bg-white/10"
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
}
