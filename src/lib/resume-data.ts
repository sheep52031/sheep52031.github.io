import type { Locale } from './i18n';

export interface ResumeSectionContent {
  title: string;
  markdown: string;
}

export interface ResumeData {
  name: string;
  jobTitle: string;
  summary: ResumeSectionContent;
  experience: ResumeSectionContent;
  education: ResumeSectionContent;
  skills: ResumeSectionContent;
  projects: ResumeSectionContent;
  contact: ResumeSectionContent;
}

const resumeContent: Record<Locale, ResumeData> = {
  en: {
    name: "Jane Doe",
    jobTitle: "Senior Software Engineer | Full-Stack Developer",
    summary: {
      title: "Summary",
      markdown: `
Highly motivated and results-oriented Senior Software Engineer with 8+ years of experience in designing, developing, and deploying scalable web applications. Proficient in JavaScript, TypeScript, React, Node.js, and cloud technologies. Passionate about creating intuitive user experiences and solving complex technical challenges.
      `,
    },
    experience: {
      title: "Experience",
      markdown: `
### Lead Developer | Tech Solutions Inc. | 2020 - Present
- Led a team of 5 engineers in developing a new SaaS platform, resulting in a 30% increase in user engagement.
- Architected and implemented microservices using Node.js, Express, and Docker.
- Mentored junior developers and conducted code reviews to maintain high-quality standards.

### Software Engineer | Web Innovators LLC | 2016 - 2020
- Developed and maintained responsive front-end components using React and Redux.
- Collaborated with UX/UI designers to translate mockups into functional features.
- Optimized application performance, reducing load times by 20%.
      `,
    },
    education: {
      title: "Education",
      markdown: `
### M.S. in Computer Science | Stanford University | 2014 - 2016
- Specialization: Artificial Intelligence
- Thesis: "Machine Learning for Predictive Analytics"

### B.S. in Software Engineering | University of California, Berkeley | 2010 - 2014
- Graduated with Honors
      `,
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
    contact: {
      title: "Contact",
      markdown: `
- **Email:** jane.doe@example.com
- **LinkedIn:** [linkedin.com/in/janedoe](https://linkedin.com/in/janedoe)
- **GitHub:** [github.com/janedoe](https://github.com/janedoe)
- **Portfolio:** [janedoe.dev](https://janedoe.dev)
      `,
    },
  },
  zh: {
    name: "李静",
    jobTitle: "高级软件工程师 | 全栈开发",
    summary: {
      title: "个人总结",
      markdown: `
积极进取、结果导向的高级软件工程师，拥有8年以上设计、开发和部署可扩展Web应用的经验。精通JavaScript、TypeScript、React、Node.js及云技术。热衷于创造直观的用户体验并解决复杂的技术挑战。
      `,
    },
    experience: {
      title: "工作经历",
      markdown: `
### 技术主管 | 科技解决方案公司 | 2020年 -至今
- 领导5名工程师团队开发新的SaaS平台，用户参与度提升30%。
- 使用Node.js、Express和Docker架构并实现微服务。
- 指导初级开发人员并进行代码审查，以保持高质量标准。

### 软件工程师 | 网络创新有限责任公司 | 2016年 - 2020年
- 使用React和Redux开发和维护响应式前端组件。
- 与UX/UI设计师合作，将设计稿转化为功能特性。
- 优化应用性能，加载时间减少20%。
      `,
    },
    education: {
      title: "教育背景",
      markdown: `
### 计算机科学硕士 | 斯坦福大学 | 2014年 - 2016年
- 专业方向：人工智能
- 论文：《用于预测分析的机器学习》

### 软件工程学士 | 加州大学伯克利分校 | 2010年 - 2014年
- 荣誉毕业
      `,
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
    contact: {
      title: "联系方式",
      markdown: `
- **邮箱:** li.jing@example.com
- **领英:** [linkedin.com/in/lijing](https://linkedin.com/in/lijing)
- **GitHub:** [github.com/lijing](https://github.com/lijing)
- **个人网站:** [lijing.dev](https://lijing.dev)
      `,
    },
  },
};

export const getResumeData = (locale: Locale): ResumeData => {
  return resumeContent[locale] || resumeContent.en;
};
