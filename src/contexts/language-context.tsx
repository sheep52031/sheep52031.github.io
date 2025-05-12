"use client";

import type { Dictionary, Locale } from '@/lib/i18n';
import { isLocale, validLocales } from '@/lib/i18n';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { usePathname, useRouter } from 'next/navigation';
import type { Dispatch, ReactNode, SetStateAction} from 'react';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface LanguageContextType {
  locale: Locale;
  setLocale: Dispatch<SetStateAction<Locale>>;
  dictionary: Dictionary;
  changeLanguage: (newLocale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  initialLocale: string; // Passed from [lang]/layout.tsx
  dictionary: Dictionary; // Passed from [lang]/layout.tsx
}

export function LanguageProvider({ children, initialLocale, dictionary: initialDictionary }: LanguageProviderProps) {
  const [locale, setLocale] = useState<Locale>(isLocale(initialLocale) ? initialLocale : 'en');
  const [dictionary, setDictionary] = useState<Dictionary>(initialDictionary);
  const isMounted = useIsMounted();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isMounted) {
      const storedLocale = localStorage.getItem('locale');
      if (storedLocale && isLocale(storedLocale) && storedLocale !== locale) {
        // If localStorage has a different valid locale, update state and URL
        // This handles cases where user changes lang on one tab, opens another
        changeLanguage(storedLocale);
      } else if (isLocale(initialLocale)) {
        // Set initial locale and potentially update localStorage if it's not set or different
        setLocale(initialLocale);
        localStorage.setItem('locale', initialLocale);
      }
    }
  }, [isMounted, initialLocale]);


  const changeLanguage = useCallback(async (newLocale: Locale) => {
    if (!validLocales.includes(newLocale)) {
      console.warn(`Unsupported locale: ${newLocale}. Defaulting to 'en'.`);
      newLocale = 'en';
    }
    
    localStorage.setItem('locale', newLocale);
    setLocale(newLocale);

    // Dynamically load the new dictionary
    // Note: This simplified version uses the dictionary passed on initial load for the new language.
    // A more robust solution might involve fetching the dictionary dynamically if not already available.
    // For this app, the dictionary is loaded by the [lang]/layout.tsx server component and passed.
    // So, a page reload (which `router.push` causes for a different [lang]) will provide the new dictionary.
    
    const currentPath = pathname;
    const newPath = currentPath.replace(`/${locale}`, `/${newLocale}`);
    
    if (newPath !== currentPath) {
      router.push(newPath);
      // After navigation, the [lang]/layout.tsx will re-render with the new `lang` param,
      // load the correct dictionary, and pass it to this provider.
      // To immediately reflect dictionary changes without waiting for full navigation completion,
      // you might need a more complex state management for dictionaries or ensure `initialDictionary` prop updates.
      // However, Next.js navigation should handle this by re-rendering the layout with new props.
    }
  }, [locale, pathname, router]);


  // Update dictionary when initialDictionary prop changes (due to lang change)
  useEffect(() => {
    setDictionary(initialDictionary);
  }, [initialDictionary]);

  // Update HTML lang attribute
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);


  if (!isMounted) {
    // Render minimal or loading state until mounted to avoid hydration mismatch
    // For this app, children are rendered to allow server rendering pass-through.
    // Initial locale from path is used, localStorage sync happens after mount.
  }
  
  return (
    <LanguageContext.Provider value={{ locale, setLocale: changeLanguage, dictionary, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
