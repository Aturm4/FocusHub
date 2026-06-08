"use client";

import { LocaleProvider } from "@/providers/locale-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { ThemeToaster } from "@/components/shared/theme-toaster";

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        {children}
        <ThemeToaster />
      </LocaleProvider>
    </ThemeProvider>
  );
}
