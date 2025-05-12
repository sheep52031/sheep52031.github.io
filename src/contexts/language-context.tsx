
"use client";

import type { Dictionary } from '@/lib/i18n';
import { type Locale, isLocale, validLocales } from '@/lib/i18n-config';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { usePathname, useRouter } from 'next/navigation';
import type { Dispatch, ReactNode, SetStateAction} from 'react';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface LanguageContextType {
  locale: Locale;
  setLocale: Dispatch<SetStateAction<Locale>>; // Kept for direct state manipulation if needed, but changeLanguage is preferred
  dictionary: Dictionary;
  changeLanguage: (newLocale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  initialLocale: string; 
  dictionary: Dictionary; 
}

export function LanguageProvider({ children, initialLocale: initialLocaleFromProps, dictionary: initialDictionaryFromProps }: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(isLocale(initialLocaleFromProps) ? initialLocaleFromProps : 'en');
  const [dictionary, setDictionary] = useState<Dictionary>(initialDictionaryFromProps);
  const isMounted = useIsMounted();
  const router = useRouter();
  const pathname = usePathname();

  // Sync locale and dictionary from props (which come from URL/[lang] segment via Layout)
  useEffect(() => {
    if (isLocale(initialLocaleFromProps)) {
      setLocaleState(initialLocaleFromProps);
    }
    setDictionary(initialDictionaryFromProps);
  }, [initialLocaleFromProps, initialDictionaryFromProps]);

  // Sync with localStorage and redirect if necessary on mount
  useEffect(() => {
    if (isMounted) {
      const storedLocale = localStorage.getItem('locale');
      if (storedLocale && isLocale(storedLocale) && storedLocale !== locale) {
        // If localStorage has a different valid locale than current URL derived one, prioritize localStorage and redirect
        changeLanguage(storedLocale);
      } else if (!storedLocale && isLocale(locale)) {
        // If no locale in localStorage, set it from the current valid locale
        localStorage.setItem('locale', locale);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]); // Run once on mount, `locale` and `changeLanguage` will be stable or handled by other effects.

  const changeLanguage = useCallback((newLocale: Locale) => {
    if (!validLocales.includes(newLocale)) {
      console.warn(`Unsupported locale: ${newLocale}. Defaulting to 'en'.`);
      newLocale = 'en';
    }
    
    localStorage.setItem('locale', newLocale);
    // setLocaleState(newLocale); // UI will update once router.push completes and props change

    const currentPath = pathname;
    const pathSegments = currentPath.split('/');
    const currentPathLocale = pathSegments[1];
    let newPath;

    if (isLocale(currentPathLocale)) {
      newPath = currentPath.replace(`/${currentPathLocale}`, `/${newLocale}`);
    } else {
      // Path doesn't have a locale prefix, prepend newLocale
      newPath = `/${newLocale}${currentPath.startsWith('/') ? currentPath : `/${currentPath}`}`;
      if (newPath === `/${newLocale}/`) newPath = `/${newLocale}`; // Avoid double slash for root
    }
    
    if (newPath !== currentPath) {
      router.push(newPath);
    } else if (locale !== newLocale) {
      // If path is the same but locale state needs update (e.g. initial render before effect syncs props)
      // This scenario should be less common if props sync correctly.
      // Forcing a re-render or relying on prop-driven updates is safer.
      // The layout should re-render with new dictionary and initialLocale prop.
      setLocaleState(newLocale); // Manually update if no navigation happens
    }
  }, [pathname, router, locale]);


  // Update HTML lang attribute
  useEffect(() => {
    if(isMounted) { 
      document.documentElement.lang = locale;
    }
  }, [locale, isMounted]);
  
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
