"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import MarkdownDisplay from '@/components/resume/markdown-display';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
// 定義 Project 和 ProjectScreenshot 類型，之前是從 portfolio-data.ts 導入的
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
  markdownContent?: string;
}
import { readMarkdownFile } from '@/lib/markdown-utils';

// MarkdownContent 元件用於顯示專案的 Markdown 內容
function MarkdownContent({ project }: { project: Project & { markdownContent?: string } }) {
  // 使用從伺服器端傳遞運來的 markdownContent
  const content = project.markdownContent || '# Content not available';
  
  return <MarkdownDisplay content={content} />;
}

// 圖片輪播元件
function ImageCarousel({ screenshots }: { screenshots: ProjectScreenshot[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 上一張圖片
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };
  
  // 下一張圖片
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };
  
  // 直接選擇圖片
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  
  return (
    <div className="relative w-full">
      {/* 輪播圖片容器 */}
      <div className="relative h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden border border-border">
        {/* 當前顯示的圖片 */}
        <div className="h-full w-full relative">
          <img 
            src={screenshots[currentIndex].url} 
            alt={screenshots[currentIndex].caption || ''} 
            className="w-full h-full object-contain bg-background/90"
          />
        </div>
        
        {/* 圖片說明 */}
        {screenshots[currentIndex].caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-3 text-foreground border-t border-border">
            <p className="text-sm md:text-base">{screenshots[currentIndex].caption}</p>
          </div>
        )}
        
        {/* 左右切換按鈕 */}
        <button 
          onClick={prevSlide} 
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-background/70 hover:bg-background/90 text-foreground p-2 rounded-full backdrop-blur-sm border border-border/50 transition-all"
          aria-label="上一張"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button 
          onClick={nextSlide} 
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-background/70 hover:bg-background/90 text-foreground p-2 rounded-full backdrop-blur-sm border border-border/50 transition-all"
          aria-label="下一張"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      
      {/* 圖片小預覽列表 */}
      <div className="flex justify-center mt-4 gap-2 overflow-x-auto py-2 px-4">
        {screenshots.map((screenshot, idx) => (
          <button 
            key={idx} 
            onClick={() => goToSlide(idx)}
            className={`relative h-16 w-24 rounded-md overflow-hidden border-2 transition-all ${currentIndex === idx ? 'border-primary' : 'border-border/50 opacity-70 hover:opacity-100'}`}
          >
            <img 
              src={screenshot.url} 
              alt={screenshot.caption || `Screenshot ${idx + 1}`} 
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ProjectDetailClient({ lang, dictionary, project }: { lang: string; dictionary: any; project: Project }) {
  const router = useRouter();
  const params = useParams();
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      {/* 返回按鈕 */}
      <Button variant="ghost" size="sm" className="mb-8 flex items-center hover:bg-secondary/20" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-1.5" />
        {lang === 'en' ? 'Back to Portfolio' : '返回作品集'}
      </Button>

      {/* 專案標題區塊 */}
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">{project.title}</h1>
        <div className="text-muted-foreground">{project.date}</div>
      </div>

      {/* 主圖 */}
      <div className="w-full h-64 sm:h-80 md:h-96 relative mb-10 rounded-xl overflow-hidden shadow-lg">
        <Image src={project.image} alt={project.title} fill sizes="100vw" style={{ objectFit: 'cover' }} className="rounded-xl" priority />
      </div>

      {/* 專案簡介與技術標籤 */}
      <div className="mb-10 bg-secondary/10 p-6 rounded-xl border border-border/30">
        <h2 className="text-xl font-semibold mb-3 text-primary">{lang === 'en' ? 'Project Overview' : '專案簡介'}</h2>
        <p className="text-foreground/90 mb-4 text-base sm:text-lg">{project.shortDescription}</p>
        
        <div className="flex flex-col space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">{lang === 'en' ? 'Technologies' : '使用技術'}</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <span key={tech} className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full font-medium border border-border/40">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 pt-4 border-t border-border/30">
            {project.demoLink && (
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition">
                <ExternalLink className="h-4 w-4 mr-2" />{lang === 'en' ? 'Live Demo' : '查看演示'}
              </a>
            )}
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition border border-border">
                <Github className="h-4 w-4 mr-2" />{lang === 'en' ? 'Source Code' : '原始碼'}
              </a>
            )}
            {project.projectDocumentUrl && (
              <a href={project.projectDocumentUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/80 transition border border-border">
                <ExternalLink className="h-4 w-4 mr-2" />{lang === 'en' ? 'Documentation' : '專案文件'}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 架構圖區塊 */}
      {project.architectureDiagramUrl && (
        <div className="mb-12 p-6 bg-background rounded-xl border border-border shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-primary">{lang === 'en' ? 'System Architecture' : '系統架構'}</h2>
          <div className="flex justify-center">
            <img 
              src={project.architectureDiagramUrl} 
              alt="Architecture Diagram" 
              className="max-w-full rounded-lg border border-border/50 shadow-sm" 
            />
          </div>
        </div>
      )}

      {/* 專案詳細內容（Markdown） */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-primary">{lang === 'en' ? 'Project Details' : '專案詳情'}</h2>
        <div className="prose prose-neutral dark:prose-invert max-w-none text-base sm:text-lg leading-relaxed bg-background p-6 rounded-xl border border-border/30 shadow-sm">
          <MarkdownContent project={project} />
        </div>
      </div>

      {/* YouTube 影片嵌入（如有） */}
      {project.videoUrl && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-primary">{lang === 'en' ? 'Project Video' : '專案影片'}</h2>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe 
              src={project.videoUrl.includes('youtube.com/watch?v=') 
                ? project.videoUrl.replace('youtube.com/watch?v=', 'youtube.com/embed/').split('&')[0] 
                : project.videoUrl}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full border-0 rounded-xl"
            />
          </div>
        </div>
      )}
      
      {/* 圖片/截圖輪播（如有） */}
      {project.screenshots && project.screenshots.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-primary">{lang === 'en' ? 'Screenshots' : '畫面截圖'}</h2>
          <ImageCarousel screenshots={project.screenshots} />
        </div>
      )}
    </div>
  );
}

