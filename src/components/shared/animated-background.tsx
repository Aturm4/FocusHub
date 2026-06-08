"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-violet-400/25 blur-[120px] dark:bg-violet-600/20"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-indigo-400/20 blur-[120px] dark:bg-indigo-600/20"
        animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-400/15 blur-[100px] dark:bg-cyan-500/10"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.04] dark:opacity-[0.02]" />
    </div>
  );
}
