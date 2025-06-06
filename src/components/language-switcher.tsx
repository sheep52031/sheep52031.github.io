
"use client";

import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import type { Locale } from '@/lib/i18n-config';

export default function LanguageSwitcher() {
  const { locale, changeLanguage, dictionary } = useLanguage();

  const languages: { code: Locale; name: string }[] = [
    { code: 'en', name: dictionary.languageSwitcher.english },
    { code: 'zh', name: dictionary.languageSwitcher.chinese },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" // Adjusted size to accommodate text
          className="px-2" // Added padding for text
          aria-label={dictionary.header.language}
        >
          <Globe className="h-5 w-5 mr-1.5" /> {/* Added margin for spacing */}
          <span className="text-sm font-medium">{dictionary.languageSwitcher.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background shadow-lg rounded-md border">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`cursor-pointer hover:bg-accent focus:bg-accent transition-colors ${
              locale === lang.code ? 'bg-accent font-semibold' : ''
            }`}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
