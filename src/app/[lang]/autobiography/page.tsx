
import { getDictionary } from '@/lib/i18n';
import { isLocale } from '@/lib/i18n-config';

export default async function AutobiographyPage({ params }: { params: { lang: string } }) {
  const lang = isLocale(params.lang) ? params.lang : 'en';
  const dictionary = await getDictionary(lang);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-primary mb-6">
        {dictionary.autobiographyPage.title}
      </h1>
      <div className="bg-card p-6 rounded-lg shadow-md">
        <p className="text-lg text-foreground">
          {dictionary.autobiographyPage.comingSoon}
        </p>
        <p className="mt-4 text-muted-foreground">
           This page will provide a personal narrative, offering insights into motivations, journey, and aspirations.
        </p>
      </div>
    </div>
  );
}
