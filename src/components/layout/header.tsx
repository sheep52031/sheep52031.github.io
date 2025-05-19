
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/hooks/use-language';
import LanguageSwitcher from '@/components/language-switcher';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Download, User, BookUser, Briefcase } from 'lucide-react'; // User for Resume, BookUser for Autobiography
import { useState, useEffect } from 'react';

interface HeaderProps {
  appName: string;
}

export default function Header({ appName }: HeaderProps) {
  const { dictionary, locale } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: `/${locale}/resume`, label: dictionary.nav.resume, icon: <User className="h-5 w-5" /> },
    { href: `/${locale}/autobiography`, label: dictionary.nav.autobiography, icon: <BookUser className="h-5 w-5" /> },
    { href: `/${locale}/portfolio`, label: dictionary.nav.portfolio, icon: <Briefcase className="h-5 w-5" /> },
  ];

  // Function to determine if a link is active
  // Considers if the current pathname starts with the link's href
  const isActive = (href: string) => {
    // For exact matches or if pathname starts with the href (e.g. /en/resume matches /en/resume/details)
    return pathname === href || pathname.startsWith(href + (href.endsWith('/') ? '' : '/'));
  };
  
  const handleDownloadPdf = () => {
    alert(dictionary.header.downloadPdf + ' functionality is a placeholder. Resume content would be captured and converted to PDF.');
    console.log("Attempting to download PDF for locale:", locale);
  };

  const NavLinkItems = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {navLinks.map((link) => (
        <Button
          key={link.href}
          variant="ghost"
          asChild
          className={`
            justify-start transition-colors 
            ${isMobile ? 'w-full text-lg py-3' : 'text-sm px-3 py-2'}
            ${isActive(link.href) ? 'text-primary font-semibold bg-accent/10 hover:bg-accent/20' : 'hover:text-primary hover:bg-accent/10'}
          `}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        >
          <Link href={link.href}>
            {isMobile && link.icon && <span className="mr-2">{link.icon}</span>}
            {link.label}
          </Link>
        </Button>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}/resume`} className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity" aria-label={appName}>
          {appName}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLinkItems />
        </nav>

        <div className="flex items-center space-x-2">
          <LanguageSwitcher />
          {/* Download PDF button is removed from header as per new design (moved to contact card) */}
          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label={dictionary.header.openMenu}>
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs p-6 bg-background">
  {/* 無障礙 Sheet 標題，僅供螢幕閱讀器朗讀，不顯示於畫面 */}
  <span className="sr-only" role="heading" aria-level={1}>
    {dictionary.header.openMenu}
  </span>
                <div className="flex flex-col space-y-4">
                  <Link 
                    href={`/${locale}/resume`} 
                    className="text-xl font-bold text-primary mb-4 self-start"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {appName}
                  </Link>
                  <NavLinkItems isMobile={true} />
                   <Button
                      onClick={handleDownloadPdf}
                      variant="outline"
                      className="w-full mt-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      {dictionary.header.downloadPdf}
                    </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
