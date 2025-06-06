---
# Project Basic Information (Required)
title: "Lumacool Delivery: Self-Managed Food Delivery Ecosystem"
date: "2024" # Project year (based on LUMACOOL experience Jan 2024 - Jan 2025)
image: "/project1/cover_photo.PNG" # Main display image
shortDescription: "Independently developed food delivery platform to solve high commission fees and data opacity issues from mainstream platforms, empowering merchants with cost reduction and marketing autonomy."
technologies: ["Python", "FastAPI", "React", "Next.js", "TypeScript", "Pydantic", "Firebase Firestore", "Google Cloud Platform (GCP)", "Google Cloud Run", "Docker", "Strategy Pattern"] # List of technologies used

# Project Links (Optional)
githubLink: "" # GitHub repository link (Your repo is private, can be left empty or include other public relevant links)
projectDocumentUrl: "https://deepwiki.com/sheep52031/Delivery-platform-system" # Project document link (Your DeepWiki)
architectureDiagramUrl: "/project1/lumacool_archtisture02.svg" # Architecture diagram link
demoLink: "https://www.lumacool.com/" # Online demo link
videoUrl: "" # Video link (if available)

# Screenshots Section (Optional)
screenshots:
  - url: "/project1/menu_page.png"
    caption: "Menu Page"
    dataAiHint: "menu page"
  - url: "/project1/customized_products.png"
    caption: "Product Customization Options"
    dataAiHint: "customized products"
  - url: "/project1/shopping_cart_list.png"
    caption: "Shopping Cart List"
    dataAiHint: "shopping cart list"
  - url: "/project1/referral_code_url.png"
    caption: "Referral Code Link"
    dataAiHint: "referral code url"
  - url: "/project1/new_user_registration_via_referral_code_url.png"
    caption: "New User Registration via Referral Code"
    dataAiHint: "new user registration via referral code"
  - url: "/project1/set_delivery_address.png"
    caption: "Set Delivery Address"
    dataAiHint: "set delivery address"
  - url: "/project1/check_out_page.png"
    caption: "Checkout Page"
    dataAiHint: "check out page"
  - url: "/project1/generate_order.png"
    caption: "Order Generation"
    dataAiHint: "generate order"
---

# Lumacool Delivery: Self-Managed Food Delivery System

## Project Background & Objectives

After successfully establishing the LUMACOOL beverage brand in Cebu, Philippines and engaging in physical store operations, I conducted in-depth analysis of daily revenue data and local market observations to identify key bottlenecks and potential opportunities for continued business growth. On one hand, mainstream delivery platforms (such as Grab, Uber Eats) provided excellent user experience, efficient delivery, and strong order conversion capabilities, bringing considerable customer flow to merchants. However, they also charged up to 50% in comprehensive fees (including platform commissions and necessary advertising), significantly eroding profit margins. Additionally, merchants struggled to access core customer data and faced limited marketing options. On the other hand, Cebu had relatively abundant third-party delivery human resources, and the logistics costs for delivery services were within a manageable range.

Based on these insights, combined with the increasing maturity of AI Agent technology and improvements in personal development tools, I determined that creating a self-managed digital delivery platform for LUMACOOL was not only a viable solution to current challenges but also a strategic extension of the brand. Therefore, while maintaining daily beverage store operations, I utilized my spare time and AI Agent development assistance to build the Lumacool Delivery platform from scratch. The core objective of this project evolved from initially improving efficiency and reducing costs for our own store to gradually becoming an independent digital ecosystem aimed at empowering a broader range of merchants, building private domain traffic, and optimizing business decisions through data insights.

## Core Features & Highlights

Lumacool Delivery, as LUMACOOL beverage store's exclusive delivery solution, features core functional modules designed to optimize store operations and customer experience, while exploring marketing flexibility that traditional large platforms cannot offer due to their operational costs and business model limitations:

* **Basic Operation Module:** Includes a customized membership system for the LUMACOOL brand, dynamic menu management, smooth order processing, and automated order dispatch functionality, ensuring seamless delivery service operation.
* **Exploration and Implementation of Independent Marketing:**
    * **Design Intent:** Targeting the single LUMACOOL brand, converting savings from high platform commissions and advertising fees into more flexible and attractive customer incentives to deepen the connection between the brand and customers.
    * **Special Mechanisms:** Implemented a more flexible coupon system and referral reward mechanism. The backend was built using the "Strategy Pattern" for various promotional scenarios (such as full reduction, discounts, specific product offers), ensuring clear logic and future scalability. This laid the foundation for the planned "Affiliate Marketing System," allowing loyal customers to participate in brand promotion and benefit from it—a deep cooperation model difficult for large platforms to provide.
* **Data Insight Starting Point (Planned):** Planning to develop a data analysis dashboard to monitor LUMACOOL brand sales trends, analyze user consumption behavior, and provide preliminary data support for product adjustments and marketing strategies.

## Technical Architecture & Implementation

In technology selection and architecture design, I consistently prioritized system stability, scalability, and cost-effectiveness:

### Frontend Implementation

* Adopted **React** framework with **TypeScript** to build responsive, user-friendly frontend interfaces, ensuring code type safety and maintainability.
* Selected the **Next.js** framework to establish foundations for potential future SEO needs and an enhanced development experience.
* Emphasized consistency in frontend-backend data models, exploring best practices for automatically converting backend Pydantic models to frontend TypeScript definitions to reduce communication costs and potential errors.

### Backend Architecture

* Adopted the classic **three-tier architecture**:
    * **API Layer (FastAPI):** Responsible for handling HTTP requests, route distribution, and basic request validation. FastAPI was chosen for its high performance based on Python type hints, asynchronous support, and seamless integration with Pydantic.
    * **Service Layer:** Encapsulates core business logic, handling complex business rules and processes. Through "Dependency Injection," dependency relationships between services are managed, effectively reducing coupling between modules and improving code testability and maintainability.
    * **Repository/Model Layer:** Responsible for interaction operations with the database (Firebase Firestore), and strict data model definition and validation using **Pydantic**.
* Database selection: **Firebase Firestore** (NoSQL), chosen for its flexible data structure, real-time synchronization capabilities, and good integration with the GCP ecosystem.

### Deployment & Operations

* Application services are containerized using **Docker**, ensuring consistency across development, testing, and production environments.
* Deployed on **Google Cloud Run** (GCP), fully utilizing its serverless features to achieve on-demand automatic scaling and cost optimization without managing underlying infrastructure.

## Challenges & Solutions During Development

During the implementation of Lumacool Delivery from concept to MVP, I overcame multiple technical and process challenges. These experiences not only honed my problem-solving abilities but also deepened my understanding of software engineering best practices. Key learnings and growth included:

### Challenge 1: The Evolution of Data Validation—From Chaos to Order

* **Problem:** In the early stages of the project, I lacked a deep understanding of backend data model design (especially in using inheritance and composition with Pydantic), leading to insufficiently rigorous request and response data validation for some APIs. Frontend data formats also lacked unified standards, planting hidden dangers for subsequent joint debugging and refactoring.
* **Solution:** As development progressed, I realized that strict data validation is the cornerstone of system stability. I invested time in refactoring core data models, mandating Pydantic validation for all API interface inputs and outputs, and establishing an automated synchronization mechanism from Pydantic models to frontend TypeScript Interfaces. I deeply understood that clear, consistent data contracts are prerequisites for efficient team collaboration and important guarantees of system robustness.

### Challenge 2: Lessons in Module Development Sequence—The Love-Hate Relationship Between Menu and Coupons

* **Problem:** Due to insufficient initial grasp of the overall business process, I began developing the coupon module before the detailed design of the menu system. When coupons needed to form complex associations with specific products or categories, I found that the existing menu data model could not well support these requirements, leading to rework.
* **Solution:** This made me realize that in complex systems, the stability of core domain models (such as menus and products) is crucial. Subsequently, I adjusted my development strategy to prioritize stabilizing core data structures before developing upper-layer business functions that depend on these structures, thereby improving development efficiency and system cohesion.

### Challenge 3: Frontend Build and Type Checking Discipline

* **Problem:** Initially, I was accustomed to debugging only in the development environment (`npm run dev`), neglecting the importance of frequently executing production environment builds (`npm run build`) during the development process. This led to some potential TypeScript type errors or build issues not being exposed early.
* **Solution:** Later, I incorporated regular execution of `npm run build` into the development process and more strictly followed TypeScript type specifications, effectively reducing unexpected issues during later integration.

## Results & Gains

As an internal project aimed at optimizing our own brand operations, the core digital platform of Lumacool Delivery has completed MVP version development and deployment. This process not only allowed me to fully practice full-stack development, cloud deployment, and product design skills, but more importantly, it honed my ability to solve actual operational pain points from a business perspective using technology, and I deeply experienced the importance of agile development and iteration under limited resources.

Facing the rapid development of AI technology, I profoundly recognize that the core value of software engineers is evolving: from simple code executors to strategic roles with deep understanding of system architecture, clever use of design patterns, efficient decomposition and abstraction of complex problems, and insight into business requirements. During the development of Lumacool Delivery, I actively embraced and practiced collaboration with AI programming assistants (such as Cursor, AI Agents in Windsurf IDE), serving as a precise definer of requirements, an architect of the system, a guide for AI Agents, and a reviewer of code.

## Future Outlook

Although the LUMACOOL physical store has adjusted due to external factors, the exploration of Lumacool Delivery has not stopped. Looking forward, I believe that building on the existing MVP foundation and combining the potential of AI Agents can bring more innovative breakthroughs to this type of delivery service:

* **AI-Driven Personalized Ordering Experience:** Explore integration of voice or natural language processing technology to allow users to quickly complete orders through conversations with AI Agents. AI Agents can proactively recommend based on user preferences and context, optimizing traditional UI interactions and improving user satisfaction.
* **Intelligent Third-Party Delivery Service Integration:** For cases where third-party delivery services do not provide standard APIs, research using AI Agents (such as BrowserUse-like technology) to achieve automated connection, bridging the "last mile."
* **Building User Data Flywheel & Intelligent Recommendations:** As user data accumulates, leverage machine learning to analyze user preferences, form precise user profiles, and enable AI Agents to provide more intelligent product recommendations and promotions, improving conversion rates and user stickiness.

These AI Agent-based innovation concepts not only enhance the functional depth of the existing MVP but also have the potential to create a new type of delivery service experience with significant market differentiation in the future. This also represents my attention to technology development trends and passion for applying new technologies to solve practical problems and create business value.

---
**DeepWiki:** <https://deepwiki.com/sheep52031/Delivery-platform-system>
