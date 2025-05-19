
import { redirect } from 'next/navigation';
import type { Locale } from '@/lib/i18n-config'; // Ensure Locale type is imported

export default async function RootPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  redirect(`/${lang}/resume`);
}
