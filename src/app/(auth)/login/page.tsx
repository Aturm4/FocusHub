"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Zap, Mail, Lock, Chrome } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedBackground } from "@/components/shared/animated-background";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { useTranslation } from "@/providers/locale-provider";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success(t("auth.login.welcomeBack"));
      router.push("/dashboard");
    } catch {
      toast.info(t("auth.login.demoRedirect"));
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) throw error;
    } catch {
      toast.info(t("auth.login.googleHint"));
      router.push("/dashboard");
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-page p-4">
      <AnimatedBackground />
      <div className="absolute right-4 top-4 z-20">
        <LanguageSwitcher />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-fg">{t("common.appName")}</span>
          </Link>
          <p className="mt-2 text-sm text-fg-muted">{t("auth.login.subtitle")}</p>
        </div>

        <div className="glass-panel p-8">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs text-fg-subtle">{t("auth.login.email")}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs text-fg-subtle">{t("auth.login.password")}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t("auth.login.signingIn") : t("common.signIn")}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-fg-subtle">{t("common.or")}</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <Button variant="secondary" className="w-full" onClick={handleGoogle}>
            <Chrome className="h-4 w-4" />
            {t("auth.login.google")}
          </Button>

          <p className="mt-6 text-center text-sm text-fg-subtle">
            {t("auth.login.noAccount")}{" "}
            <Link href="/register" className="text-violet-400 hover:text-violet-300">
              {t("common.signUp")}
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
