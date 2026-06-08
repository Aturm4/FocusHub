"use client";

import { AppProvider } from "@/providers/app-provider";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Navbar } from "@/components/dashboard/navbar";
import { CommandPalette } from "@/components/shared/command-palette";
import { KeyboardShortcuts } from "@/components/shared/keyboard-shortcuts";
import { MatrixEasterEgg } from "@/components/shared/matrix-easter-egg";
import { MatrixListener } from "@/components/dashboard/matrix-listener";
import { AIAssistant } from "@/components/shared/ai-assistant";
import { AnimatedBackground } from "@/components/shared/animated-background";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AppProvider>
      <div className="relative flex min-h-screen bg-page">
        <AnimatedBackground />
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Navbar />
          <AnimatePresence mode="wait">
            <motion.main
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="relative flex-1 overflow-y-auto p-4 lg:p-6"
            >
              {children}
            </motion.main>
          </AnimatePresence>
        </div>
      </div>
      <CommandPalette />
      <KeyboardShortcuts />
      <MatrixEasterEgg />
      <MatrixListener />
      <AIAssistant />
    </AppProvider>
  );
}
