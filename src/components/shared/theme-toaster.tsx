"use client";

import { Toaster } from "sonner";
import { useTheme } from "@/providers/theme-provider";

export function ThemeToaster() {
  const { settings } = useTheme();
  const isLight = settings.theme === "light";

  return (
    <Toaster
      theme={isLight ? "light" : "dark"}
      position="bottom-right"
      toastOptions={{
        style: isLight
          ? {
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.08)",
              color: "#0f172a",
            }
          : {
              background: "#0c0c12",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
            },
      }}
    />
  );
}
