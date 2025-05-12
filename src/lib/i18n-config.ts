
export const validLocales = ['en', 'zh'] as const;
export type Locale = (typeof validLocales)[number];

export const isLocale = (lang: string): lang is Locale => {
    return validLocales.includes(lang as Locale);
}
