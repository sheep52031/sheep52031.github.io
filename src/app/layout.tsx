
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
// Toaster is now in LangLayout to be within LanguageProvider if needed by any toast content,
// and to avoid potential duplicate Toaster instances if RootLayout and LangLayout both included it.

export const metadata: Metadata = {
  title: 'Bilingual Resume',
  description: 'A modern, responsive, bilingual resume application.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
