
import { getDictionary } from '@/lib/i18n';
import { isLocale } from '@/lib/i18n-config';
import { getResumeData } from '@/lib/resume-data';
import MarkdownDisplay from '@/components/resume/markdown-display';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function AutobiographyPage({ params }: { params: { lang: string } }) {
  const lang = isLocale(params.lang) ? params.lang : 'en';
  const dictionary = await getDictionary(lang);
  const resumeData = getResumeData(lang);

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="shadow-lg">
        <CardHeader className="bg-secondary/50 p-6">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">
            {dictionary.autobiographyPage.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {resumeData.autobiography && resumeData.autobiography.markdown ? (
            <MarkdownDisplay content={resumeData.autobiography.markdown} />
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
