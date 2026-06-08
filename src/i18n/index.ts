import { en } from "./en";
import { ru } from "./ru";
import type { Locale } from "./types";

export const translations = { en, ru } as const;

export function getNestedValue(obj: unknown, path: string): string | undefined {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" ? current : undefined;
}

export function interpolate(
  template: string,
  params?: Record<string, string | number>
): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    String(params[key] ?? `{${key}}`)
  );
}

export function t(
  locale: Locale,
  key: string,
  params?: Record<string, string | number>
): string {
  const dict = translations[locale];
  const value = getNestedValue(dict, key) ?? getNestedValue(en, key) ?? key;
  return interpolate(value, params);
}

export function getStoredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const raw = localStorage.getItem("fh-locale");
    if (raw) {
      const parsed = JSON.parse(raw) as Locale;
      if (parsed === "en" || parsed === "ru") return parsed;
    }
  } catch {
    // ignore
  }
  return "en";
}

export { en, ru };
export type { Locale } from "./types";
