"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { useTranslation } from "@/providers/locale-provider";
import { translations } from "@/i18n";

export function AIAssistant() {
  const { t, locale } = useTranslation();
  const responses = translations[locale].ai.responses;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: t("ai.greeting") },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((m) => [
      ...m,
      { role: "user", text: userMsg },
      { role: "ai", text: responses[Math.floor(Math.random() * responses.length)] },
    ]);
    setInput("");
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/30"
        aria-label="AI Assistant"
      >
        {open ? <X className="h-5 w-5 text-white" /> : <Bot className="h-5 w-5 text-white" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-40 right-6 z-50 flex h-96 w-80 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0f]/95 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <Sparkles className="h-4 w-4 text-violet-400" />
              <span className="text-sm font-medium text-fg">FocusAI</span>
              <span className="ml-auto rounded-full bg-violet-500/20 px-2 py-0.5 text-[10px] text-violet-300">
                {t("common.beta")}
              </span>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-xs ${
                      m.role === "user"
                        ? "bg-violet-600 text-white"
                        : "bg-white/5 text-white/80"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 border-t border-white/10 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder={t("ai.placeholder")}
                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder:text-fg-subtle focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
              <button
                onClick={send}
                className="rounded-lg bg-violet-600 p-2 text-white hover:bg-violet-500"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
