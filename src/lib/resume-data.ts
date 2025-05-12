
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
  github: string;
  githubHandle: string;
  portfolio?: string;
  linkedin?: string; // Optional, will be empty based on current HTML
  linkedinHandle?: string; // Optional
}

export interface ResumeSectionContent {
  title: string;
  markdown: string;
}

export interface ResumeData {
  name: string;
  jobTitle: string;
  summary: ResumeSectionContent;
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
  autobiography: ResumeSectionContent;
}

const resumeContent: Record<Locale, ResumeData> = {
  en: {
    name: "Jason Lin (林家任)",
    jobTitle: "Cloud Solutions Engineer",
    contactDetails: {
      email: "sheep52031@gmail.com",
      phone: "+886-921-096-672",
      location: "Taipei, Taiwan",
      github: "https://github.com/sheep52031",
      githubHandle: "sheep52031",
      portfolio: "https://sheep52031.github.io/#/",
      linkedin: "", // Not in provided HTML contact details
      linkedinHandle: "", // Not in provided HTML contact details
    },
    summary: {
      title: "Professional Summary",
      markdown: `I am an engineer with a solid background in AI application development, cloud services, and system integration.

My work in backend development and AI model deployment has allowed me to see projects through from concept to launch, often in close collaboration with diverse teams.

Over time, I've learned how to bridge technical challenges with real business needs, and I continue to seek opportunities that help me grow both technically and professionally while contributing meaningful solutions.`,
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
      entries: [
        {
          role: "Founder & Strategic Investor",
          company: "LUMACOOL, Cebu, Philippines",
          period: "2024/01 – 2025/01",
          descriptionMarkdown: `
- Founded and managed a beverage brand, overseeing strategy, product development, and marketing while acquiring cross-cultural and data-driven business insights.
- Designed and implemented an automated delivery platform integrating member management and order processing to address revenue challenges.
- Leveraged data analytics to track sales trends and customer behavior, continuously refining product mix and pricing strategies.
- Transitioned daily operations to local partners, enabling a shift toward strategic investment and market development.
          `,
        },
        {
          role: "Cloud Engineer",
          company: "Acer Inc.",
          period: "2023/02 – 2023/08",
          descriptionMarkdown: `
- Provided technical support for GCP cloud services and contributed to system architecture design.
- Assisted enterprise clients with cloud migration assessments and implementations.
- Collaborated with cross-functional teams to deliver robust multi-cloud solutions.
- Maintained cloud reseller billing systems using the .NET Core framework.
          `,
        },
        {
          role: "AI Application Development Trainee",
          company: "TibaMe Academy",
          period: "2022/09 – 2023/01",
          descriptionMarkdown: `
- Completed a 500-hour intensive training program covering data processing (web scraping, Matplotlib), databases (MySQL, MongoDB), and AI application development.
- Developed multiple AI solutions including YOLOv7-based object detection, facial recognition, and license plate recognition, integrating with Raspberry Pi hardware.
- Acquired full-stack development skills with Flask and LineBot, and learned cloud deployment strategies using Docker and GCP (VM/Cloud Run).
- Led a team in designing and developing a cat recognition service, overseeing system architecture and backend development.
- Awarded the Top Learning Excellence recognition for outstanding performance.
          `,
        },
        {
          role: "Creative Director & Project Manager",
          company: "Latte Creative Studio",
          period: "2019/06 – 2022/08",
          descriptionMarkdown: `
- Collaborated with AI imaging platform Meero to develop standardized shooting protocols and optimize data collection for AI training.
- Secured a commercial photography project for UberEats Taiwan, driving the digital transformation of over 1,000 merchants into the delivery market.
- Utilized Facebook Business Suite and LINE business tools to boost social media engagement by 300%, resulting in an 80% increase in order conversions for a car rental client.
- Managed an event marketing project for the Taoyuan City Youth Affairs Bureau, overseeing promotional activities and photography documentation.
- Produced a corporate video broadcast on TVBS News that contributed to a 50% increase in monthly service applications, meeting government performance targets.
          `,
        },
      ],
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
    jobTitle: "云解决方案工程师",
    contactDetails: {
      email: "sheep52031@gmail.com",
      phone: "+886-921-096-672",
      location: "台北, 台湾",
      github: "https://github.com/sheep52031",
      githubHandle: "sheep52031",
      portfolio: "https://sheep52031.github.io/#/",
      linkedin: "", 
      linkedinHandle: "",
    },
    summary: {
      title: "专业总结",
      markdown: `我是一名在人工智能应用开发、云服务和系统集成方面拥有坚实背景的工程师。

我在后端开发和人工智能模型部署方面的工作，使我能够与不同团队密切合作，将项目从概念阶段推进到成功上线。

在此过程中，我学会了如何将技术挑战与实际业务需求相结合，并持续寻找机会提升自己的技术和专业能力，以贡献有意义的解决方案。`,
    },
    skills: {
      title: "技术技能",
      markdown: `
### 编程与脚本
- Python - FastAPI
- React - JavaScript

### 机器学习与人工智能
- TensorFlow
- YOLOv7

### 云与部署
- Google Cloud Platform (GCP)
- Docker
- Linux
- Git

### 数据分析
- SQL
- EXCEL

### 语言能力
- 中文：母语
- 英文：日常会话流利
      `,
    },
    projects: {
      title: "项目经验",
      markdown: `
### 外送平台 | 独立开发者
*2024年09月 – 至今*
- 设计并开发一个外送平台，集成会员管理、订单处理和自动派单功能。
- 使用 FastAPI 构建后端服务，React 构建前端界面，并利用 Firebase Firestore进行数据管理。
- 项目目前正在开发中；未来计划集成 AI 功能以优化运营。
- 开发数据分析功能，用于监控销售趋势和客户行为。

### 猫咪识别系统 | 项目负责人
*2022年11月 – 2023年01月*
- 带领6人团队开发与 LINE 集成的猫咪识别服务。
- 训练 YOLOv7 模型识别猴硐猫村的14只特定猫咪，准确率超过85%。
- 设计并实施稳健的模型训练流程，同时优化数据收集和标注过程。
- 通过 Docker 容器化部署，确保开发与生产环境的一致性。
- 开发 RESTful API 将 AI 模型与 LINE Messaging API 集成。
      `,
    },
    experience: {
      title: "工作经历",
      entries: [
        {
          role: "创始人兼战略投资者",
          company: "LUMACOOL, 宿雾, 菲律宾",
          period: "2024年01月 – 2025年01月",
          descriptionMarkdown: `
- 创建并管理一个饮料品牌，负责战略、产品开发和市场营销，同时获得跨文化和数据驱动的商业洞察。
- 设计并实施自动化外送平台，集成会员管理和订单处理，以解决收入挑战。
- 利用数据分析追踪销售趋势和客户行为，持续优化产品组合和定价策略。
- 将日常运营移交给本地合作伙伴，实现向战略投资和市场开发的转型。
          `,
        },
        {
          role: "云端工程师",
          company: "宏碁股份有限公司 (Acer Inc.)",
          period: "2023年02月 – 2023年08月",
          descriptionMarkdown: `
- 为 GCP 云服务提供技术支持，并参与系统架构设计。
- 协助企业客户进行云迁移评估和实施。
- 与跨职能团队合作，提供稳健的多云解决方案。
- 使用 .NET Core 框架维护云经销商计费系统。
          `,
        },
        {
          role: "AI 应用开发养成班学员",
          company: "资展国际 (TibaMe Academy)",
          period: "2022年09月 – 2023年01月",
          descriptionMarkdown: `
- 完成500小时密集培训课程，涵盖数据处理（网络爬虫、Matplotlib）、数据库（MySQL、MongoDB）及 AI 应用开发。
- 开发多个 AI 解决方案，包括基于 YOLOv7 的物体检测、人脸识别和车牌识别，并与树莓派硬件集成。
- 掌握 Flask 和 LineBot 的全栈开发技能，并学习使用 Docker 和 GCP (VM/Cloud Run)进行云部署策略。
- 带领团队设计并开发猫咪识别服务，负责系统架构和后端开发。
- 因表现优异荣获学习优异奖。
          `,
        },
        {
          role: "创意总监兼项目经理",
          company: "拿铁影像工作室 (Latte Creative Studio)",
          period: "2019年06月 – 2022年08月",
          descriptionMarkdown: `
- 与 AI 影像平台 Meero 合作，制定标准化拍摄流程并优化 AI 训练数据收集。
- 获得 UberEats 台湾商业摄影项目，推动超过1000家商户数字化转型进入外送市场。
- 利用 Facebook Business Suite 和 LINE 企业工具，使社交媒体参与度提升300%，为某汽车租赁客户带来80%的订单转化率增长。
- 管理桃园市政府青年事务局的活动营销项目，负责宣传活动和摄影记录。
- 制作在 TVBS 新闻台播出的企业宣传影片，使月服务申请量增加50%，达成政府绩效目标。
          `,
        },
      ],
    },
    education: {
      title: "教育背景与持续学习",
      entries: [
        {
          degree: "辅仁大学电机工程学系学士",
          institution: "辅仁大学 (Fu Jen Catholic University)",
          period: "2012年09月 – 2016年06月",
          descriptionMarkdown: "",
        },
        {
          degree: "密集英语培训课程",
          institution: "菲律宾语言学校",
          period: "2023年09月 – 2023年12月",
          descriptionMarkdown: `
- 完成密集英语培训课程，模拟雅思成绩达到5.5分。
- 通过沉浸式语言学习提升跨文化沟通能力。
          `,
        },
      ],
    },
    autobiography: {
      title: "自传",
      markdown: `我拥有辅仁大学电机工程学士学位（2016年），此后致力于掌握软件开发、云解决方案和项目领导。我的职业生涯以持续学习和将尖端技术实际应用于解决现实商业挑战为特点。

**技术专长与项目领导**

我的主要技术能力在于 Python，我已将其应用于使用 FastAPI 等框架开发稳健的后端系统。我构建了多个项目，包括一个利用 React 作为前端并使用 Firebase Firestore 和 Google Cloud Run 进行可扩展、经济高效部署的交付平台。尽管此项目仍在开发中——正在进行集成先进 AI 功能的工作——但它使我能够提升在 API 集成、使用 Docker 进行容器化以及无服务器架构设计方面的技能。

通过参加一个密集的 AI 应用开发项目，我进一步增强了我的技术工具包。在此期间，我领导一个团队项目，使用 TensorFlow 和 YOLOv7 构建了一个猫识别系统。这一举措将我们训练的模型与 LINE 消息机器人集成，不仅巩固了我对机器学习工作流程的理解，还展示了我管理跨职能团队和确保复杂系统无缝集成的能力。

**企业与创业经验**

随后在宏碁公司担任云工程师期间，我为 Google Cloud Platform 上的云解决方案的设计和实施做出了贡献。我协助企业客户进行云迁移策略，并与不同团队合作，提供平衡性能与成本效益的多云架构。这段经历加深了我对云基础设施的理解，并增强了我跨部门沟通技术解决方案的能力。

我在菲律宾的创业经历进一步磨练了我在项目管理和数据驱动决策方面的技能。我创办了一个饮料品牌，不仅制定了产品和营销策略，还启动了内部食品交付平台的开发。通过利用现代开发工具和 AI 代理技术，我旨在创建一个可扩展的解决方案，以最大限度地减少对昂贵的第三方交付服务的依赖。认识到需要专注于我的核心竞争力，此后我已将该企业的日常运营控制权移交给一位值得信赖的本地合作伙伴，使我能够全身心投入到在下一个职业角色中提升我的技术和管理技能。

**展望未来**

我渴望将我的技术专长、项目领导能力和数据驱动策略带到一个创新型组织——无论是在技术、风险投资还是战略项目管理领域。我相信我将软件解决方案与商业洞察相结合的能力，将在任何充满活力、具有前瞻性思维的环境中推动增长并促进创新。
      `,
    },
  },
};

export const getResumeData = (locale: Locale): ResumeData => {
  return resumeContent[locale] || resumeContent.en;
};

    