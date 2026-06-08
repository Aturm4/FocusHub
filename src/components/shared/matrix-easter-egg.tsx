"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useApp } from "@/providers/app-provider";
import { useTranslation } from "@/providers/locale-provider";

export function MatrixEasterEgg() {
  const { matrixMode, setMatrixMode } = useApp();
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!matrixMode || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01";
    const fontSize = 14;
    let drops: number[] = [];

    const initDrops = () => {
      const columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    };
    initDrops();

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0f0";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, [matrixMode]);

  return (
    <AnimatePresence>
      {matrixMode && (
        <>
          <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed left-1/2 top-4 z-[101] flex -translate-x-1/2 flex-col items-center gap-2"
          >
            <button
              onClick={() => setMatrixMode(false)}
              className="flex items-center gap-2 rounded-full border border-emerald-500/40 bg-black/80 px-4 py-2 text-sm font-medium text-emerald-400 shadow-lg backdrop-blur-xl transition-colors hover:bg-emerald-500/20 hover:text-emerald-300"
            >
              <X className="h-4 w-4" />
              {t("matrix.exitButton")}
            </button>
            <p className="text-center text-[10px] text-emerald-500/60">
              {t("matrix.exitHint")}
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
