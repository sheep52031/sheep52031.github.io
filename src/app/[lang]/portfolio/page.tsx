
import { getDictionary } from '@/lib/i18n';
import { isLocale } from '@/lib/i18n-config';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getPortfolioData, type Project } from '@/lib/portfolio-data';
import MarkdownDisplay from '@/components/resume/markdown-display';
import { ExternalLink, Github, PlayCircle, Percent } from 'lucide-react';

export default async function PortfolioPage({ params }: { params: { lang: string } }) {
  const lang = isLocale(params.lang) ? params.lang : 'en';
  const dictionary = await getDictionary(lang);
  const portfolioData = getPortfolioData(lang);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-primary mb-2">
        {dictionary.portfolioPage.title}
      </h1>
      
      <p className="text-lg text-muted-foreground mb-8">
        {dictionary.portfolioPage.comingSoon}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {portfolioData.projects.map((project: Project) => (
          <Card key={project.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col rounded-lg">
            <div className="relative w-full h-64 sm:h-72">
              <Image 
                src={project.image} 
                alt={project.title} 
                layout="fill" 
                objectFit="cover"
                data-ai-hint={project.dataAiHint}
                className="rounded-t-lg"
              />
              {project.videoUrl && (
                 <Link href={project.videoUrl} target="_blank" rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-60 transition-opacity duration-300">
                    <PlayCircle className="h-16 w-16 text-white opacity-80 hover:opacity-100" />
                 </Link>
              )}
            </div>
            <CardHeader className="p-6">
              <CardTitle className="text-2xl text-primary">{project.title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground pt-1">{project.date}</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 flex-grow">
              <p className="mb-3 text-foreground/90">{project.shortDescription}</p>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  {lang === 'en' ? 'Technologies Used:' : '使用技术：'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span key={tech} className="px-2.5 py-1 text-xs bg-secondary text-secondary-foreground rounded-full font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {project.satisfaction && (
                <div className="flex items-center text-sm text-foreground/80 mb-4">
                  <Percent className="h-4 w-4 mr-1.5 text-primary/80" />
                  <span>{lang === 'en' ? 'Client Satisfaction:' : '客户满意度：'} {project.satisfaction}%</span>
                </div>
              )}
              
              {/* Collapsible Full Description - Consider a modal or accordion for longer descriptions */}
              <details className="prose prose-sm max-w-none dark:prose-invert text-foreground/80">
                <summary className="cursor-pointer text-primary hover:underline">
                  {lang === 'en' ? 'Read More' : '阅读更多'}
                </summary>
                <div className="mt-2">
                 <MarkdownDisplay content={project.fullDescription} />
                </div>
              </details>

              {project.screenshots && project.screenshots.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    {lang === 'en' ? 'Screenshots:' : '截图：'}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {project.screenshots.map((ss, index) => (
                      <div key={index} className="relative aspect-video rounded overflow-hidden group">
                        <Image src={ss.url} alt={ss.caption} layout="fill" objectFit="cover" data-ai-hint={ss.dataAiHint || 'project screenshot'} />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-end justify-center p-1">
                          <p className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">{ss.caption}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </CardContent>
            <CardFooter className="p-6 pt-0 border-t mt-auto bg-secondary/30">
              <div className="flex items-center space-x-3">
                {project.demoLink && (
                  <Button variant="outline" size="sm" asChild className="hover:bg-primary/10 hover:border-primary">
                    <Link href={project.demoLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1.5" />
                      {lang === 'en' ? 'Live Demo' : '查看演示'}
                    </Link>
                  </Button>
                )}
                {project.githubLink && (
                  <Button variant="outline" size="sm" asChild className="hover:bg-primary/10 hover:border-primary">
                    <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-1.5" />
                      {lang === 'en' ? 'Source Code' : '源代码'}
                    </Link>
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
