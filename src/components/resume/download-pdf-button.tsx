
"use client";

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import type { Locale } from '@/lib/i18n-config';
import type { Dictionary } from '@/lib/i18n';

interface DownloadPdfButtonProps {
  dictionary: Dictionary;
  lang: Locale;
}

export default function DownloadPdfButton({ dictionary, lang }: DownloadPdfButtonProps) {
  const handleDownloadClick = () => {
    alert(dictionary.header.downloadPdf + ' functionality is a placeholder. Resume content would be captured and converted to PDF for locale: ' + lang);
    console.log("Attempting to download PDF for locale:", lang);
  };

  return (
    <Button
      onClick={handleDownloadClick} 
      variant="outline"
      size="sm"
      className="w-full sm:w-auto text-xs px-3 py-1.5 border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground"
    >
      <Download className="h-3.5 w-3.5 mr-1.5" />
      {dictionary.header.downloadPdf}
    </Button>
  );
}
