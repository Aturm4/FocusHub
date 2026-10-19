export type Locale = "en" | "ru";

type TranslationShape<T> = T extends string
  ? string
  : T extends object
    ? { [K in keyof T]: TranslationShape<T[K]> }
    : T;

export type Translations = TranslationShape<typeof import("./en").en>;
