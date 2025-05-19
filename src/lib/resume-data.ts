import type { Locale } from './i18n-config';
import { getSummary, getWorkExperience, getProjects, getSkills, parseWorkExperienceEntries, parseSummary } from './markdown-content-loader';

export interface ExperienceEntry {
  title?: string;
  role?: string;
  company: string;
  location?: string;
  period: string;
  description?: string[];
  descriptionMarkdown?: string;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
  description?: string[];
  descriptionMarkdown?: string;
}

export interface ResumeData {
  name: string;
  jobTitle: string;
  location?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  contactDetails?: {
    email: string;
    phone: string;
    location: string;
    github: string;
    githubHandle: string;
    portfolio: string;
    linkedin: string;
    linkedinHandle: string;
  };
  summary: {
    title: string;
    markdown: string;
  };
  skills: {
    title: string;
    markdown: string;
  };
  projects: {
    title: string;
    markdown: string;
  };
  experience: {
    title: string;
    markdown?: string;
    entries: ExperienceEntry[];
  };
  education: {
    title: string;
    entries: EducationEntry[];
  };
  autobiography: {
    title: string;
    markdown: string;
  };
}

type ResumeDataMap = {
  [key in Locale]: ResumeData;
};

// 從 Markdown 文件中讀取內容
const workExperience = getWorkExperience();
const projects = getProjects();
const skills = getSkills();

export const resumeData: ResumeDataMap = {
  en: {
    name: "Jason Lin",
    jobTitle: "Cloud Solutions Engineer",
    location: "Taipei, Taiwan",
    email: "sheep52031@gmail.com",
    phone: "+886 932 380 839",
    linkedin: "https://www.linkedin.com/in/jason-lin-a7b01a1a0/",
    github: "https://github.com/sheep52031",
    summary: {
      title: "Professional Summary",
      markdown: parseSummary('en').markdown,
    },
    skills: {
      title: "Technical Skills",
      markdown: `
### Programming & Scripting
- Python - FastAPI
- React - JavaScript

### Machine Learning & AI
- TensorFlow
- YOLOv7

### Cloud & Deployment
- Google Cloud Platform
- Docker
- Linux
- Git

### Data Analysis
- SQL
- EXCEL

### Languages
- Chinese: Native
- English: Fluent in everyday conversation
      `,
    },
    projects: {
      title: "Project Experience",
      markdown: `
### Delivery Platform | Independent Developer
*2024/09 – Present*
- Designing and developing a delivery platform featuring member management, order processing, and automated dispatch.
- Implementing backend services using FastAPI and building the frontend with React, utilizing Firebase Firestore for data management.
- Project is currently under development; future plans include integrating AI functionalities to optimize operations.
- Developing analytics features to monitor sales trends and customer behavior.

### Cat Recognition System | Project Lead
*2022/11 – 2023/01*
- Led a 6-member team to develop a LINE-integrated cat recognition service.
- Trained a YOLOv7 model to recognize 14 selected and named cats from Houtong Cat Village, achieving accuracy exceeding 85%.
- Designed and implemented robust model training workflows while optimizing data collection and annotation processes.
- Ensured consistency between development and production environments via containerized deployment using Docker.
- Developed a RESTful API to integrate the AI model with the LINE Messaging API.
      `,
    },
    experience: {
      title: "Work Experience",
      markdown: getWorkExperience('en'),
      entries: parseWorkExperienceEntries('en'),
    },
    education: {
      title: "Education & Continuous Learning",
      entries: [
        {
          degree: "B.S. in Electrical Engineering",
          institution: "Fu Jen Catholic University",
          period: "2012/09 – 2016/06",
          descriptionMarkdown: "", 
        },
        {
          degree: "Intensive English Training Program", 
          institution: "Philippine Language School",
          period: "2023/09 – 2023/12",
          descriptionMarkdown: `
- Completed an intensive English training program with a simulated IELTS score of 5.5.
- Enhanced cross-cultural communication skills through immersive language study.
          `,
        },
      ],
    },
    autobiography: {
      title: "Autobiography",
      markdown: `I hold a Bachelor of Science in Electrical Engineering from Fu Jen Catholic University (2016) and have since dedicated my career to mastering software development, cloud solutions, and project leadership. My journey has been defined by continuous learning and the practical application of cutting-edge technologies to solve real-world business challenges.

**Technical Expertise & Project Leadership**

My primary technical proficiency lies in Python, which I have applied to develop robust backend systems using frameworks such as FastAPI. I have built several projects, including a delivery platform that leverages React for its frontend and utilizes Firebase Firestore and Google Cloud Run for scalable, cost-effective deployment. Although this project is still under development—with ongoing work to integrate advanced AI functionalities—it has allowed me to refine my skills in API integration, containerization with Docker, and serverless architecture design.

I further enhanced my technical toolkit by participating in an intensive AI application development program. During this time, I led a team project to build a cat recognition system using TensorFlow and YOLOv7. This initiative, which integrated our trained model with a LINE messaging bot, not only solidified my understanding of machine learning workflows but also demonstrated my ability to manage cross-functional teams and ensure the seamless integration of complex systems.

**Corporate & Entrepreneurial Experience**

In a subsequent role as a Cloud Engineer at Acer Inc., I contributed to designing and implementing cloud solutions on the Google Cloud Platform. I assisted enterprise clients with cloud migration strategies and collaborated with diverse teams to deliver multi-cloud architectures that balanced performance with cost efficiency. This experience deepened my understanding of cloud infrastructure and enhanced my ability to communicate technical solutions across departments.

My entrepreneurial venture in the Philippines further honed my skills in project management and data-driven decision making. I founded a beverage brand where I not only developed the product and marketing strategy but also initiated the development of an in-house food delivery platform. By leveraging modern development tools and AI agent technologies, I aimed to create a scalable solution that minimizes reliance on costly third-party delivery services. Recognizing the need to focus on my core competencies, I have since transitioned day-to-day operational control of this venture to a trusted local partner, allowing me to fully commit to advancing my technical and management skills in my next professional role.

**Looking Ahead**

I am eager to bring my blend of technical expertise, project leadership, and data-driven strategy to an innovative organization—whether within technology, venture capital, or strategic project management. I am confident that my ability to integrate software solutions with business insights will drive growth and foster innovation in any dynamic, forward-thinking environment.
      `,
    },
  },
  zh: {
    name: "林家任 (Jason Lin)",
    jobTitle: "",
    location: "台北，台灣",
    email: "sheep52031@gmail.com",
    phone: "+886 921-096-672",
    linkedin: "https://www.linkedin.com/in/jason-lin-a7b01a1a0/",
    github: "https://github.com/sheep52031",
    contactDetails: {
      email: "sheep52031@gmail.com",
      phone: "+886 921-096-672",
      location: "台北，台灣",
      github: "https://github.com/sheep52031",
      githubHandle: "sheep52031",
      portfolio: "https://sheep52031.github.io/#/",
      linkedin: "https://www.linkedin.com/in/jason-lin-a7b01a1a0/", 
      linkedinHandle: "jason-lin-a7b01a1a0",
    },
    summary: {
      title: "專業總結",
      markdown: parseSummary('zh').markdown,
    },
    skills: {
      title: "技術技能",
      markdown: `
### 程式設計與腳本
- Python - FastAPI
- React - JavaScript

### 機器學習與人工智慧
- TensorFlow
- YOLOv7

### 雲端與部署
- Google Cloud Platform (GCP)
- Docker
- Linux
- Git

### 資料分析
- SQL
- EXCEL

### 語言能力
- 中文：母語
- 英文：日常會話流利
      `,
    },
    projects: {
      title: "Projects",
      markdown: getProjects('zh'),
    },
    experience: {
      title: "工作經歷",
      markdown: getWorkExperience('zh'),
      entries: parseWorkExperienceEntries('zh'),
    },
    education: {
      title: "教育背景与持续学习",
      entries: [
        {
          degree: "輔仁大學電機工程學系",
          institution: "輔仁大學 (Fu Jen Catholic University)",
          period: "2012年09月 – 2016年06月",
          descriptionMarkdown: "",
        },
        {
          degree: "英文訓練營",
          institution: "菲律賓語言學校",
          period: "2023年09月 – 2023年12月",
          descriptionMarkdown: `
- 完成密集英语訓練課程，模擬雅思成績達到5.5分。
- 通過沉浸式語言學習提升跨文化溝通能力。
          `,
        },
      ],
    },
    autobiography: {
      title: "自傳",
      markdown: `我擁有輔仁大學電機工程學系學士学位（2016年），此后致力于掌握软件开发、云解决方案和项目领导。我的职业生涯以持续学习和将尖端技术实际应用于解决现实商业挑战为特点。

**企業與創業經驗**

隨後在宏碁公司擔任雲端工程師期間，我為 Google Cloud Platform 上的雲端解決方案設計與實施做出貢獻。我協助企業客戶制定雲端遷移策略，並與不同團隊合作，提供兼顧效能與成本效益的多雲架構。這段經歷加深了我對雲端基礎設施的理解，也提升了我跨部門溝通技術解決方案的能力。

我在菲律賓的創業經驗進一步磨練了我在專案管理與數據驅動決策方面的技能。我創辦了一個飲料品牌，不僅擬定產品與行銷策略，也啟動了內部食品外送平台的開發。透過運用現代開發工具與 AI 智能代理技術，我致力於打造一套可擴展的解決方案，最大程度減少對昂貴第三方外送服務的依賴。意識到需要專注於我的核心競爭力後，現已將該企業的日常營運權交給一位值得信賴的在地合作夥伴，使我能全心投入於下個職涯階段，提升我的技術與管理能力。

**展望未來**

我渴望將我的技術專長、專案領導力與數據驅動策略帶到一個創新型組織——無論是在科技、創投還是策略專案管理領域。我相信，自己結合軟體解決方案與商業洞察的能力，將能在任何充滿活力且具前瞻思維的環境中推動成長並促進創新。
      `,
    },
  },
};

export const getResumeData = (locale: Locale): ResumeData => {
  return resumeData[locale] || resumeData.en;
};

    