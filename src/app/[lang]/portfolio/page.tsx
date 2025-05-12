
import { getDictionary } from '@/lib/i18n';
import { isLocale } from '@/lib/i18n-config';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';


export default async function PortfolioPage({ params }: { params: { lang: string } }) {
  const lang = isLocale(params.lang) ? params.lang : 'en';
  const dictionary = await getDictionary(lang);

  // Placeholder projects - in a real app, this would come from a data source
  const placeholderProjects = [
    { 
      id: 1, 
      title: lang === 'en' ? "Project Alpha" : "项目 Alpha", 
      description: lang === 'en' ? "A revolutionary web application that changes the way users interact with data." : "一个革命性的网络应用程序，改变了用户与数据交互的方式。",
      imageUrl: "https://picsum.photos/seed/alpha/600/400",
      techStack: ["React", "Node.js", "PostgreSQL"],
      dataAiHint: "web application"
    },
    { 
      id: 2, 
      title: lang === 'en' ? "Mobile App Beta" : "移动应用 Beta", 
      description: lang === 'en' ? "Cross-platform mobile app designed for productivity and collaboration." : "专为提高生产力和协作而设计的跨平台移动应用程序。",
      imageUrl: "https://picsum.photos/seed/beta/600/400",
      techStack: ["Flutter", "Firebase", "Dart"],
      dataAiHint: "mobile app"
    },
    { 
      id: 3, 
      title: lang === 'en' ? "AI Tool Gamma" : "人工智能工具 Gamma", 
      description: lang === 'en' ? "An innovative AI-powered tool for automated content generation and analysis." : "一种创新的人工智能工具，用于自动化内容生成和分析。",
      imageUrl: "https://picsum.photos/seed/gamma/600/400",
      techStack: ["Python", "TensorFlow", "Flask"],
      dataAiHint: "ai tool"
    }
  ];


  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-primary mb-6">
        {dictionary.portfolioPage.title}
      </h1>
      
      <p className="text-lg text-muted-foreground mb-8">
        {dictionary.portfolioPage.comingSoon} Explore a selection of key projects below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {placeholderProjects.map(project => (
          <Card key={project.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="relative w-full h-48">
              <Image 
                src={project.imageUrl} 
                alt={project.title} 
                layout="fill" 
                objectFit="cover"
                data-ai-hint={project.dataAiHint}
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl text-primary">{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="mb-3">{project.description}</CardDescription>
              <div className="mt-auto">
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  {lang === 'en' ? 'Technologies Used:' : '使用技术：'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
