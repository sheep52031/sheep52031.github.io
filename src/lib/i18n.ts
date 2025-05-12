import 'server-only'; // Ensures this module is only used on the server

// Define a type for our dictionary. This helps with type safety.
// We use `typeof import(...)` to dynamically get the type from the JSON file.
export type Dictionary = typeof import('@/dictionaries/en.json');

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  zh: () => import('@/dictionaries/zh.json').then((module) => module.default),
};

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  if (locale === 'zh') {
    return dictionaries.zh();
  }
  // Default to English if locale is not supported or is 'en'
  return dictionaries.en();
};

export const validLocales = ['en', 'zh'] as const;
export type Locale = (typeof validLocales)[number];

export const isLocale = (lang: string): lang is Locale => {
    return validLocales.includes(lang as Locale);
}
