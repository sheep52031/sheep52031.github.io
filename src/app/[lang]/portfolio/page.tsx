import React from 'react';
import { getDictionary } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n-config';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardDescription, CardFooter } from '@/components/ui/card';
import { getAllProjects } from '@/lib/markdown-utils';

// 定義 Project 類型
interface ProjectScreenshot {
  url: string;
  caption: string;
  dataAiHint?: string;
}

interface Project {
  id: number;
  title: string;
  shortDescription: string;
  image: string;
  dataAiHint?: string;
  technologies: string[];
  demoLink?: string;
  githubLink?: string;
  projectDocumentUrl?: string;
  architectureDiagramUrl?: string;
  satisfaction?: number;
  date: string;
  videoUrl?: string;
  screenshots?: ProjectScreenshot[];
  markdownFile?: string;
}

// 靜態生成函數
export async function generateStaticParams() {
  return [
    { lang: 'zh' },
    { lang: 'en' }
  ];
}

// 伺服器端元件
export default async function PortfolioPage({ params }: { params: Promise<{ lang: string }> }) {
  // 在構建時取得語言與資料
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  
  // 直接從檔案系統讀取專案資料，傳遞語言參數
  const projects = await getAllProjects('content/projects', lang);


  const pageTitle = lang === 'en' ? 'My Project Portfolio' : '我的專案作品集';
  const pageIntro = lang === 'en'
    ? 'Here are some of my most representative projects. Click any card to view the full story, architecture, and my contribution.'
    : '以下是我最具代表性的專案，點擊卡片可深入了解專案背景、技術架構與我的貢獻。';

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary">{pageTitle}</h1>
        <p className="text-muted-foreground text-lg mb-4">{pageIntro}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map((project: Project) => (
          <Card key={project.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col rounded-2xl border border-border bg-background">
            <Link href={`/${lang}/portfolio/${project.id}`} className="relative w-full h-56 block group" aria-label={lang === 'en' ? `View detail of ${project.title}` : `查看${project.title}詳細介紹`}>
              <Image 
                src={project.image} 
                alt={project.title} 
                layout="fill" 
                objectFit="cover"
                data-ai-hint={project.dataAiHint}
                className="rounded-t-2xl group-hover:brightness-90 transition"
                priority={project.id === 1}
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />
              <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-3 py-1 rounded-full opacity-90 pointer-events-none">
                {lang === 'en' ? 'View Details' : '查看詳情'}
              </div>
            </Link>
            <CardHeader className="p-5 pb-2">
              <Link href={`/${lang}/portfolio/${project.id}`} className="text-xl font-semibold text-primary hover:underline hover:text-primary/80 transition">
                {project.title}
              </Link>
              <CardDescription className="text-xs text-muted-foreground pt-1">{project.date}</CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-2 flex-grow">
              <p className="mb-4 text-foreground/90 line-clamp-3">{project.shortDescription}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.technologies.map(tech => (
                  <span key={tech} className="px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded-full font-medium border border-border/40">
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="px-5 pb-5 pt-0">
              <Link href={`/${lang}/portfolio/${project.id}`} className="w-full">
                <button className="w-full py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition">
                  {lang === 'en' ? 'View Project' : '查看專案'}
                </button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
