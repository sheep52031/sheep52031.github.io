
import type { Metadata } from 'next';
import { LanguageProvider } from '@/contexts/language-context';
import Header from '@/components/layout/header';
import { getDictionary } from '@/lib/i18n';
import { isLocale } from '@/lib/i18n-config';
import { Toaster } from '@/components/ui/toaster'; 
import { getResumeData } from '@/lib/resume-data';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'zh' }];
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = isLocale(params.lang) ? params.lang : 'en';
  const dictionary = await getDictionary(lang);
  const resumeData = getResumeData(lang);
  return {
    title: `${resumeData.name} - ${dictionary.nav.resume}`, // More specific title
    description: resumeData.summary.markdown.substring(0, 160), // Use part of summary for description
  };
}

export default async function LangLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string }; 
}) {
  const currentLang = isLocale(lang) ? lang : 'en';
  const dictionary = await getDictionary(currentLang);
  const resumeData = getResumeData(currentLang);

  return (
    <LanguageProvider initialLocale={currentLang} dictionary={dictionary}>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Header appName={resumeData.name} />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="py-6 text-center text-sm text-muted-foreground border-t">
          {dictionary.footer.text.replace("Your Name", resumeData.name)}
        </footer>
      </div>
      <Toaster />
    </LanguageProvider>
  );
}
