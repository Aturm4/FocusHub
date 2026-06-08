"use client";

import Link from "next/link";
import { Zap, Github, Twitter } from "lucide-react";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { useTranslation } from "@/providers/locale-provider";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-fg">{t("common.appName")}</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-fg-subtle">
            <Link href="#features" className="hover:text-fg">
              {t("common.features")}
            </Link>
            <Link href="/dashboard" className="hover:text-white">
              {t("common.demo")}
            </Link>
            <Link href="/login" className="hover:text-white">
              {t("common.login")}
            </Link>
            <Link href="/register" className="hover:text-white">
              {t("common.signUp")}
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <a href="#" className="text-fg-subtle hover:text-fg" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-fg-subtle hover:text-fg" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-fg-subtle">
          © {new Date().getFullYear()} {t("common.appName")}. {t("landing.footer.copyright")}
        </p>
      </div>
    </footer>
  );
}
