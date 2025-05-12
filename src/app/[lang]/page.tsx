
import { redirect } from 'next/navigation';
import type { Locale } from '@/lib/i18n-config'; // Ensure Locale type is imported

export default async function RootPage({ params }: { params: { lang: string } }) {
  // Validate params.lang or rely on generateStaticParams to ensure it's a valid Locale
  // For direct access, it's good practice to validate or type params.lang as Locale if possible through routing config
  redirect(`/${params.lang}/resume`);
}
