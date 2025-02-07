export const projects = [
  {
    id: 1,
    title: "Delivery Platform",
    shortDescription: "A full-stack delivery platform with AI integration planned.",
    fullDescription: `A comprehensive delivery platform built with React and FastAPI, featuring:
    • Member management system
    • Order processing
    • Automated dispatch
    • Analytics dashboard`,
    image: "/images/projects/delivery-platform/SCR-20250206-mfag.png",
    technologies: ["React", "FastAPI", "Firebase", "GCP"],
    demoLink: "https://demo.example.com",
    githubLink: "https://github.com/sheep52031/delivery-platform",
    satisfaction: 95,
    date: "2024",
    videoUrl: "https://www.youtube.com/embed/your-video-id",
    screenshots: [
      {
        url: "/images/projects/delivery-platform/screenshot1.png",
        caption: "Dashboard Overview"
      },
      {
        url: "/images/projects/delivery-platform/screenshot2.png",
        caption: "Order Management"
      }
    ]
  },
  {
    id: 2,
    title: "Meowda - Cat Recognition in Houtong Cat Village",
    shortDescription: "A mobile application leveraging YOLOv7 object detection to enhance tourist experience through LINE chatbot for cat recognition.",
    fullDescription: `
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
    image: "/images/projects/cat-recognition/cats_test_music.gif",
    technologies: ["Python", "YOLOv7", "FastAPI", "Flask", "LINE API", "Docker", "GCP", "MongoDB"],
    demoLink: "https://www.youtube.com/embed/Eq3Okb1ZOJg",
    githubLink: "https://github.com/sheep52031/meowda",
    satisfaction: 90,
    date: "2023",
    videoUrl: "https://www.youtube.com/embed/Eq3Okb1ZOJg",
    screenshots: [
      {
        url: "/images/projects/cat-recognition/cat-recognition_infra.png",
        caption: "System Infrastructure"
      },
      {
        url: "/images/projects/cat-recognition/cat23_008-.JPG",
        caption: "Cat Recognition Example 1"
      },
      {
        url: "/images/projects/cat-recognition/cat23_054-.JPG",
        caption: "Cat Recognition Example 2"
      }
    ]
  },
  // Add more projects...
]; 