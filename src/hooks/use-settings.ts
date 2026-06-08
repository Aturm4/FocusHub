"use client";

import { useTheme } from "@/providers/theme-provider";

/** @deprecated Use useTheme() — kept for compatibility */
export function useSettings() {
  const { settings, updateSettings } = useTheme();
  return { settings, updateSettings };
}
