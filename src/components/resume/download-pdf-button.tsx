
"use client";

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import type { Locale } from '@/lib/i18n-config';
import type { Dictionary } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface DownloadPdfButtonProps {
  dictionary: Dictionary;
  lang: Locale;
  buttonClassName?: string; // To allow custom width/layout classes
}

export default function DownloadPdfButton({ dictionary, lang, buttonClassName }: DownloadPdfButtonProps) {
  const handleDownloadClick = () => {
    // In a real app, this would trigger PDF generation logic.
    // For now, it shows an alert.
    alert(dictionary.header.downloadPdf + ' functionality is a placeholder. Resume content for locale "' + lang + '" would be captured and converted to PDF.');
    console.log("Attempting to download PDF for locale:", lang);
  };

  return (
    <Button
      onClick={handleDownloadClick} 
      variant="outline"
      size="sm" // Keeping size consistent, can be overridden by buttonClassName if needed
      className={cn(
        // Base styles for the button
        "text-xs px-3 py-1.5 border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground",
        // Apply custom classes, e.g., for width
        buttonClassName 
      )}
    >
      <Download className="h-3.5 w-3.5 mr-1.5" /> {/* Icon size as per previous design */}
      {dictionary.header.downloadPdf}
    </Button>
  );
}
