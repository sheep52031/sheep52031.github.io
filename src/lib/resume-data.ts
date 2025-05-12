
import type { Locale } from './i18n-config';

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  descriptionMarkdown: string;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  descriptionMarkdown?: string;
}

export interface ContactDetails {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  linkedinHandle: string;
  github: string;
  githubHandle: string;
  portfolio?: string; // Optional portfolio link in contact details
}

export interface ResumeSectionContent {
  title: string;
  markdown: string;
}

export interface ResumeData {
  name: string;
  jobTitle: string;
  summary: ResumeSectionContent; // Used for the intro paragraph under name/title
  experience: {
    title: string;
    entries: ExperienceEntry[];
  };
  education: {
    title: string;
    entries: EducationEntry[];
  };
  skills: ResumeSectionContent;
  projects: ResumeSectionContent;
  contactDetails: ContactDetails;
}

const resumeContent: Record<Locale, ResumeData> = {
  en: {
    name: "John Doe", // Changed from Jane Doe to match image
    jobTitle: "Senior Software Engineer", // Simplified from image
    summary: {
      title: "Summary", // Title not directly displayed but good for context
      markdown: `Experienced software engineer with a strong background in web development and a passion for creating efficient, scalable applications.`, // Short summary matching image
    },
    experience: {
      title: "Work Experience", // This title will be used in the section header
      entries: [
        {
          role: "Senior Software Engineer",
          company: "Tech Solutions Inc.",
          period: "2020 - Present",
          descriptionMarkdown: `
- Lead a team of 5 developers working on a SaaS platform with 100K+ users
- Implemented CI/CD pipeline reducing deployment time by 40%
- Redesigned authentication system improving security and user experience
          `,
        },
        {
          role: "Software Engineer",
          company: "Web Innovations", // Name from image, was Web Innovations LLC
          period: "2017 - 2020",
          descriptionMarkdown: `
- Developed responsive web applications using React and TypeScript
- Created RESTful APIs using Node.js and Express
- Optimized database queries reducing load times by 30%
          `,
        },
        {
          role: "Junior Developer",
          company: "Digital Creations",
          period: "2015 - 2017",
          descriptionMarkdown: `
- Built and maintained company websites for clients
- Assisted in developing e-commerce solutions
- Collaborated with design team on UI/UX improvements
          `,
        },
      ],
    },
    education: {
      title: "Education",
      entries: [
        {
          degree: "Master of Science in Computer Science",
          institution: "Stanford University",
          period: "2014 - 2016",
          descriptionMarkdown: `
- Specialization: Artificial Intelligence
- Thesis: "Machine Learning for Predictive Analytics"
          `,
        },
        {
          degree: "Bachelor of Science in Software Engineering",
          institution: "University of California, Berkeley",
          period: "2010 - 2014",
          descriptionMarkdown: `
- Graduated with Honors
          `,
        },
      ],
    },
    skills: {
      title: "Skills",
      markdown: `
- **Programming Languages:** JavaScript, TypeScript, Python, Java, C#
- **Frameworks/Libraries:** React, Angular, Vue.js, Node.js, Express, Spring Boot, Django
- **Databases:** PostgreSQL, MongoDB, MySQL, Redis
- **Cloud Platforms:** AWS (EC2, S3, Lambda, RDS), Azure, Google Cloud
- **Tools:** Git, Docker, Kubernetes, Jenkins, Jira
- **Methodologies:** Agile, Scrum, DevOps
      `,
    },
    projects: {
      title: "Projects",
      markdown: `
### Project Alpha: E-commerce Platform
- Developed a full-stack e-commerce website with features like product listing, shopping cart, and payment integration.
- Tech Stack: React, Node.js, MongoDB, Stripe API.
- [Link to Project](https://example.com/project-alpha) (if applicable)

### Project Beta: Real-time Chat Application
- Built a real-time chat application using WebSockets and React.
- Implemented features like private messaging and group chats.
- Tech Stack: React, Socket.IO, Express.
      `,
    },
    contactDetails: {
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "https://linkedin.com/in/johndoe",
      linkedinHandle: "johndoe",
      github: "https://github.com/johndoe",
      githubHandle: "johndoe",
      portfolio: "https://johndoe.dev" // Assuming portfolio from old contact is this
    },
  },
  zh: {
    name: "张三", // Changed from 李静
    jobTitle: "高级软件工程师", // Simplified
    summary: {
      title: "个人总结",
      markdown: `经验丰富的软件工程师，在Web开发方面拥有强大背景，热衷于创建高效、可扩展的应用程序。`,
    },
    experience: {
      title: "工作经历",
      entries: [
        {
          role: "高级软件工程师",
          company: "科技解决方案公司",
          period: "2020年 - 至今",
          descriptionMarkdown: `
- 带领5名开发人员的团队开发一个拥有10万以上用户的SaaS平台
- 实施CI/CD流水线，部署时间减少40%
- 重新设计认证系统，提高安全性及用户体验
          `,
        },
        {
          role: "软件工程师",
          company: "网络创新公司",
          period: "2017年 - 2020年",
          descriptionMarkdown: `
- 使用React和TypeScript开发响应式Web应用程序
- 使用Node.js和Express创建RESTful API
- 优化数据库查询，加载时间减少30%
          `,
        },
        {
          role: "初级开发工程师",
          company: "数字创作公司",
          period: "2015年 - 2017年",
          descriptionMarkdown: `
- 为客户构建和维护公司网站
- 协助开发电子商务解决方案
- 与设计团队合作改进UI/UX
          `,
        },
      ],
    },
    education: {
      title: "教育背景",
      entries: [
        {
          degree: "计算机科学硕士",
          institution: "斯坦福大学",
          period: "2014年 - 2016年",
          descriptionMarkdown: `
- 专业方向：人工智能
- 论文：《用于预测分析的机器学习》
          `,
        },
        {
          degree: "软件工程学士",
          institution: "加州大学伯克利分校",
          period: "2010年 - 2014年",
          descriptionMarkdown: `
- 荣誉毕业
          `,
        },
      ],
    },
    skills: {
      title: "技能专长",
      markdown: `
- **编程语言:** JavaScript, TypeScript, Python, Java, C#
- **框架/库:** React, Angular, Vue.js, Node.js, Express, Spring Boot, Django
- **数据库:** PostgreSQL, MongoDB, MySQL, Redis
- **云平台:** AWS (EC2, S3, Lambda, RDS), Azure, Google Cloud
- **工具:** Git, Docker, Kubernetes, Jenkins, Jira
- **方法论:** Agile, Scrum, DevOps
      `,
    },
    projects: {
      title: "项目经验",
      markdown: `
### Alpha项目：电子商务平台
- 开发了一个全栈电子商务网站，功能包括产品列表、购物车和支付集成。
- 技术栈：React, Node.js, MongoDB, Stripe API。
- [项目链接](https://example.com/project-alpha) (如果适用)

### Beta项目：实时聊天应用
- 使用WebSocket和React构建的实时聊天应用。
- 实现功能如私人消息和群聊。
- 技术栈：React, Socket.IO, Express。
      `,
    },
    contactDetails: {
      email: "zhang.san@example.com",
      phone: "+86 138 0013 8000", // Example Chinese phone
      location: "上海, 中国",
      linkedin: "https://linkedin.com/in/zhangsan",
      linkedinHandle: "zhangsan",
      github: "https://github.com/zhangsan",
      githubHandle: "zhangsan",
      portfolio: "https://zhangsan.dev"
    },
  },
};

export const getResumeData = (locale: Locale): ResumeData => {
  return resumeContent[locale] || resumeContent.en;
};
