"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/hooks/use-language';
import LanguageSwitcher from '@/components/language-switcher';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Download, Briefcase, Home, GraduationCap, Code, MessageSquare, UserCircle } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { dictionary, locale } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#summary', label: dictionary.resume.summaryTitle, icon: <UserCircle className="h-5 w-5" /> },
    { href: '#experience', label: dictionary.nav.experience, icon: <Briefcase className="h-5 w-5" /> },
    { href: '#education', label: dictionary.nav.education, icon: <GraduationCap className="h-5 w-5" /> },
    { href: '#skills', label: dictionary.nav.skills, icon: <Code className="h-5 w-5" /> },
    { href: '#projects', label: dictionary.nav.projects, icon: <Briefcase className="h-5 w-5" /> },
    { href: '#contact', label: dictionary.nav.contact, icon: <MessageSquare className="h-5 w-5" /> },
  ];

  const handleDownloadPdf = () => {
    // Placeholder for PDF download functionality
    // In a real app, you'd use a library like html2canvas and jspdf
    // to capture the page content and generate a PDF.
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
          className={`justify-start transition-colors hover:text-accent-foreground hover:bg-accent/80 ${isMobile ? 'w-full text-lg py-3' : 'text-sm'}`}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        >
          <Link href={`/${locale}${link.href}`}>
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
        <Link href={`/${locale}`} className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity" aria-label={dictionary.appName}>
          {dictionary.appName}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLinkItems />
        </nav>

        <div className="flex items-center space-x-2 md:space-x-4">
          <LanguageSwitcher />
          <Button
            onClick={handleDownloadPdf}
            variant="outline"
            size="icon"
            aria-label={dictionary.header.downloadPdf}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Download className="h-5 w-5" />
          </Button>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs p-6 bg-background">
                <div className="flex flex-col space-y-4">
                  <Link 
                    href={`/${locale}`} 
                    className="text-xl font-bold text-primary mb-4 self-start"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {dictionary.appName}
                  </Link>
                  <NavLinkItems isMobile={true} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
