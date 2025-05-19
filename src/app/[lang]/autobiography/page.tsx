
import { getDictionary } from '@/lib/i18n';
import { isLocale } from '@/lib/i18n-config';
import { getAutobiographyData } from '@/lib/autobiography-data';
import MarkdownDisplay from '@/components/resume/markdown-display';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function AutobiographyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const currentLang = isLocale(lang) ? lang : 'en';
  const dictionary = await getDictionary(currentLang);
  const autobiographyData = getAutobiographyData(currentLang);

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="shadow-lg">
        <CardHeader className="bg-secondary/50 p-6">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">
            {dictionary.autobiographyPage.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {autobiographyData.markdown ? (
            <MarkdownDisplay content={autobiographyData.markdown} />
          ) : (
            <p className="text-lg text-foreground">
              {dictionary.autobiographyPage.comingSoon}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
