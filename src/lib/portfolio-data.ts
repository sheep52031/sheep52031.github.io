
import type { Locale } from './i18n-config';

export interface ProjectScreenshot {
  url: string;
  caption: string;
  dataAiHint?: string;
}

export interface Project {
  id: number;
  title: string; // Will be translated
  shortDescription: string; // Will be translated
  fullDescription: string; // Markdown, will be translated
  image: string; // Placeholder URL
  dataAiHint: string;
  technologies: string[];
  demoLink?: string;
  githubLink?: string;
  satisfaction?: number; // Optional
  date: string; // Year
  videoUrl?: string;
  screenshots?: ProjectScreenshot[];
}

interface PortfolioData {
  projects: Project[];
}

const commonProjectsBase = [
  {
    id: 1,
    image: "https://picsum.photos/seed/delivery/600/400",
    dataAiHint: "logistics platform",
    technologies: ["React", "FastAPI", "Firebase", "GCP"],
    demoLink: undefined, // "https://demo.example.com", // No demo link provided in original
    githubLink: "https://github.com/sheep52031/delivery-platform",
    satisfaction: 95,
    date: "2024",
    videoUrl: undefined, // "https://www.youtube.com/embed/your-video-id", // No video URL
    screenshots: [
      {
        url: "https://picsum.photos/seed/deliverydash/400/300",
        dataAiHint: "dashboard overview",
        captionEn: "Dashboard Overview",
        captionZh: "仪表板概览"
      },
      {
        url: "https://picsum.photos/seed/deliveryorder/400/300",
        dataAiHint: "order management",
        captionEn: "Order Management",
        captionZh: "订单管理"
      }
    ]
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/meowda/600/400", // Original was a GIF, using placeholder
    dataAiHint: "cat recognition",
    technologies: ["Python", "YOLOv7", "FastAPI", "Flask", "LINE API", "Docker", "GCP", "MongoDB"],
    demoLink: "https://www.youtube.com/embed/Eq3Okb1ZOJg",
    githubLink: "https://github.com/sheep52031/meowda",
    satisfaction: 90,
    date: "2023",
    videoUrl: "https://www.youtube.com/embed/Eq3Okb1ZOJg",
    screenshots: [
      {
        url: "https://picsum.photos/seed/catinfra/400/300",
        dataAiHint: "system infrastructure",
        captionEn: "System Infrastructure",
        captionZh: "系统架构"
      },
      {
        url: "https://picsum.photos/seed/catrec1/400/300",
        dataAiHint: "cat photo",
        captionEn: "Cat Recognition Example 1",
        captionZh: "猫咪识别示例 1"
      },
      {
        url: "https://picsum.photos/seed/catrec2/400/300",
        dataAiHint: "cat identification",
        captionEn: "Cat Recognition Example 2",
        captionZh: "猫咪识别示例 2"
      }
    ]
  }
];

const portfolioContent: Record<Locale, PortfolioData> = {
  en: {
    projects: commonProjectsBase.map(p => ({
      ...p,
      title: p.id === 1 ? "Delivery Platform" : "Meowda - Cat Recognition in Houtong Cat Village",
      shortDescription: p.id === 1 ? "A full-stack delivery platform with AI integration planned." : "A mobile application leveraging YOLOv7 object detection to enhance tourist experience through LINE chatbot for cat recognition.",
      fullDescription: p.id === 1 ? `A comprehensive delivery platform built with React and FastAPI, featuring:
• Member management system
• Order processing
• Automated dispatch
• Analytics dashboard` : `
# Project Overview
I independently designed and developed a mobile application that leverages AI image recognition technology to enhance the tourist experience in Houtong Cat Village. The app allows users to take photos of local cats and instantly receive detailed information—including the cat's identity, personality, and backstory. Additionally, the platform integrates nearby attraction recommendations and a cat collection feature, thereby enriching local tourism and cultural engagement.

# Key Technical Contributions

## Data Collection and Annotation
• Personally captured over 6,000 images of 22 cats
• Developed standardized photo guidelines using 1:1 aspect ratio
• Performed precise bounding box annotations for model training

## AI Model Design and Training
• Selected YOLO V7 for superior detection accuracy
• Optimized model using RTX 3080 GPU, achieving 98.7% accuracy
• Addressed GPU memory limitations through batch size adjustments

## Line Bot Platform Integration
• Developed interactive features:
    - "Who Am I": Instant cat recognition with detailed information
    - "Nearby Attractions": Carousel template with local points of interest
    - "Cat Collection": Gamified experience tracking recognized cats
• Implemented web server using Flask, uWSGI, and Nginx

## System Architecture and Cloud Deployment
• Built backend using MongoDB and Google Cloud Storage
• Employed Docker containerization on GCP VMs and Cloud Run
• Leveraged FastAPI for asynchronous service communication

# Project Outcomes
The project successfully merges AI image recognition with an interactive real-time platform, delivering an innovative and user-friendly tourism service that not only informs but also engages visitors. The system's scalable architecture enables potential future applications in smart pet door systems, interactive gaming experiences, and industrial defect detection.
`,
      screenshots: p.screenshots?.map(s => ({ ...s, caption: s.captionEn }))
    }))
  },
  zh: {
    projects: commonProjectsBase.map(p => ({
      ...p,
      title: p.id === 1 ? "外送平台" : "喵达 - 猴硐猫村猫咪识别系统",
      shortDescription: p.id === 1 ? "计划集成AI功能的全栈外送平台。" : "一款利用YOLOv7物体检测技术，通过LINE聊天机器人增强游客猫咪识别体验的移动应用。",
      fullDescription: p.id === 1 ? `一个使用 React 和 FastAPI 构建的综合外送平台，功能包括：
• 会员管理系统
• 订单处理
• 自动派单
• 数据分析仪表板` : `
# 项目概述
我独立设计并开发了一款移动应用程序，利用人工智能图像识别技术提升猴硐猫村的游客体验。该应用程序允许用户拍摄当地猫咪的照片，并即时接收详细信息——包括猫咪的身份、个性和背景故事。此外，该平台还整合了附近的景点推荐和猫咪收集功能，从而丰富了当地旅游和文化参与度。

# 主要技术贡献

## 数据收集与标注
• 亲自拍摄超过6000张22只猫咪的图像
• 使用1:1宽高比制定标准化照片指南
• 为模型训练执行精确的边界框标注

## AI模型设计与训练
• 选择YOLO V7以获得卓越的检测精度
• 使用RTX 3080 GPU优化模型，准确率达到98.7%
• 通过调整批量大小解决GPU内存限制问题

## Line Bot平台集成
• 开发了互动功能：
    - “我是谁”：即时猫咪识别并提供详细信息
    - “附近景点”：包含当地景点的轮播模板
    - “猫咪收集”：追踪已识别猫咪的游戏化体验
• 使用Flask、uWSGI和Nginx实现Web服务器

## 系统架构与云部署
• 使用MongoDB和Google Cloud Storage构建后端
• 在GCP虚拟机和Cloud Run上采用Docker容器化部署
• 利用FastAPI进行异步服务通信

# 项目成果
该项目成功地将人工智能图像识别与互动实时平台相结合，提供了一种创新且用户友好的旅游服务，不仅提供信息，还能吸引游客参与。该系统可扩展的架构为未来在智能宠物门系统、互动游戏体验和工业缺陷检测等领域的应用提供了可能。
`,
      screenshots: p.screenshots?.map(s => ({ ...s, caption: s.captionZh }))
    }))
  }
};

export const getPortfolioData = (locale: Locale): PortfolioData => {
  return portfolioContent[locale] || portfolioContent.en;
};
