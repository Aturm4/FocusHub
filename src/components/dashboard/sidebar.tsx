"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CheckSquare,
  Timer,
  BarChart3,
  Settings,
  Zap,
  Flame,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useApp } from "@/providers/app-provider";
import { useTranslation } from "@/providers/locale-provider";

const navConfig = [
  { href: "/dashboard", labelKey: "nav.dashboard", icon: LayoutDashboard },
  { href: "/dashboard/tasks", labelKey: "nav.tasks", icon: CheckSquare },
  { href: "/dashboard/timer", labelKey: "nav.focusTimer", icon: Timer },
  { href: "/dashboard/statistics", labelKey: "nav.statistics", icon: BarChart3 },
  { href: "/dashboard/settings", labelKey: "nav.settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { pomodoro } = useApp();
  const { t } = useTranslation();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-default bg-white/80 backdrop-blur-xl dark:bg-black/20 lg:flex">
      <div className="flex items-center gap-2 border-b border-default px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <span className="text-lg font-bold text-fg">{t("common.appName")}</span>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navConfig.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-violet-600/15 text-violet-700 dark:bg-violet-600/20 dark:text-violet-300"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-fg-muted dark:hover:bg-white/5 dark:hover:text-white"
                )}
              >
                <item.icon className="h-4 w-4" />
                {t(item.labelKey)}
                {active && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-500 dark:bg-violet-400"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-default p-4">
        <div className="rounded-xl bg-gradient-to-br from-violet-600/15 to-indigo-600/10 p-4 dark:from-violet-600/20 dark:to-indigo-600/10">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <Flame className="h-4 w-4" />
            <span className="text-xs font-medium">12 {t("nav.streak")}</span>
          </div>
          <p className="mt-1 text-[10px] text-fg-subtle">
            {pomodoro.sessionsCompleted} {t("nav.sessionsCompleted")}
          </p>
        </div>
      </div>
    </aside>
  );
}
