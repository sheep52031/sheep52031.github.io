import { getDictionary } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n-config';
import ProjectDetailClient from './ProjectDetailClient';
import { getAllProjects, parseMarkdownProject } from '@/lib/markdown-utils';
import { notFound } from 'next/navigation';

// 定義專案類型
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

// 靜態生成函數
export async function generateStaticParams() {
  // 支援所有語言與所有專案 id
  const langs = ['zh', 'en'];
  const projects = await getAllProjects(); // 從檔案系統讀取所有專案
  
  const params = langs.flatMap(lang => {
    return projects.map(p => ({ lang, id: String(p.id) }));
  });
  return params;
}

// 為靜態生成頁面提供元數據
export async function generateMetadata({ params }: { params: Promise<{ lang: string, id: string }> }) {
  const { lang, id } = await params;
  const dictionary = await getDictionary(lang as Locale);
  
  // 從檔案系統讀取所有專案
  const projects = await getAllProjects();
  const project = projects.find(p => String(p.id) === id);
  
  if (!project) {
    return {
      title: `${dictionary.portfolioPage?.notFound || '找不到專案'} | Jason's Portfolio`,
    };
  }
  
  return {
    title: `${project.title} | Jason's Portfolio`,
    description: project.shortDescription,
  };
}

// 伺服器端元件
export default async function ProjectDetailPage({ params }: { params: Promise<{ lang: string, id: string }> }) {
  const { lang, id } = await params;
  const dictionary = await getDictionary(lang as Locale);
  
  // 從檔案系統讀取所有專案
  const projects = await getAllProjects();
  const baseProject = projects.find(p => String(p.id) === id);
  
  if (!baseProject) {
    notFound();
  }
  
  // 在伺服器端讀取和解析 Markdown 內容
  let markdownContent = '';
  let projectData = { ...baseProject };
  
  if (baseProject.markdownFile) {
    try {
      // 根據語言決定檔案名稱後綴
      const fileName = lang === 'en' ? `${baseProject.markdownFile}_en` : baseProject.markdownFile;
      
      // 從 Markdown 檔案中提取 frontmatter 和內容
      const { frontmatter, content } = await parseMarkdownProject(fileName, 'content/projects');
      
      // 將 Markdown 檔案中的資訊合併到專案資料中
      projectData = {
        ...baseProject,
        ...frontmatter,
        id: baseProject.id, // 確保 ID 不被覆蓋
        markdownContent: content
      };
      
      markdownContent = content;
    } catch (error) {
      console.error(`Error processing markdown file for ${baseProject.markdownFile}:`, error);
      markdownContent = '# Content not available';
      projectData.markdownContent = markdownContent;
    }
  } else {
    markdownContent = '';
    projectData.markdownContent = markdownContent;
  }
  
  return <ProjectDetailClient lang={lang} dictionary={dictionary} project={projectData} />;
}
