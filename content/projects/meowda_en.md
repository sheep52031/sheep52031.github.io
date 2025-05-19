---
# Project Basic Information (Required)
title: "Meowda: AI-Powered Houtong Cat Village Map Navigation and Story Interaction System"
date: "2023"  # Project year (based on TibaMe experience Nov 2022 – Jan 2023)
image: "/project2/mewda01.PNG"  # Main display image
shortDescription: "Led a team to develop a LINE chatbot that uses AI to identify specific cats in Houtong, combining storytelling with gamified mapping to enhance visitor interaction."
technologies: ["Python", "Flask", "FastAPI", "YOLOv7", "Docker", "Google Cloud Run", "MongoDB", "LINE Messaging API", "Pydantic"] # List of technologies used

# Project Links (Optional)
githubLink: "https://github.com/sheep52031/meowda"  # GitHub repository link
projectDocumentUrl: "https://deepwiki.com/sheep52031/meowda"  # Project document link
architectureDiagramUrl: "/project2/mewda_archtisture.svg"  # Architecture diagram link
demoLink: ""  # Online demo link
videoUrl: "https://www.youtube.com/watch?v=Eq3Okb1ZOJg&ab_channel=latte%E6%8B%BF%E9%90%B5%E5%89%B5%E6%84%8F"  # YouTube video link


---

# Meowda: AI-Powered Houtong Cat Village Map Navigation and Story Interaction System

## Project Background & Objectives

This project was born during the TibaMe AI Application Development training course. As the project team leader, my primary task was to lead a team of 6 members, including myself, to conceptualize and implement a project from scratch within just 45 days. The project needed to apply the AI technologies we had learned while being highly demonstrable and having connections to local culture. The ultimate goal was to enhance team members' practical experience and help everyone successfully transition into the software industry.

Among various AI application directions, we chose "image recognition." Considering Taiwan's local characteristics and interactive fun, we turned our attention to "Houtong Cat Village" in New Taipei City. This is not only a famous tourist attraction but also home to many cats cared for by local volunteers, each with their own name and story. However, first-time visitors often struggle to identify these cats and know nothing about their background stories, resulting in weaker connections between visitors and the cats, as well as the local culture.

Our core concept was to develop a LINE chatbot that transforms visitors into "Cat Detectives." Visitors only need to upload photos of cats taken in the village, and the system can identify which registered cat it is (e.g., Flower, Fatty, etc.) through real-time AI recognition, then retrieve and return information about that cat's name, unique story, personality traits, etc. from the database. Furthermore, we designed a gamified "Cat Map Collection" mechanism to enhance the fun and sense of achievement during the visit, indirectly raising awareness about stray animal care issues.

## Core Features & Highlights

* **AI Cat Individual Recognition:** By training the YOLOv7 model, we achieved high-precision individual recognition of specific cats in Houtong (initially selected about 8 cats, expandable to 14) with an accuracy rate exceeding 85%. After users upload photos, the system can quickly identify the cat's registered name.
* **Cat Story and Information Interaction:** After successful identification, the system retrieves and displays the cat's exclusive story, personality traits, gender, and other information from the MongoDB database, deepening the emotional connection between visitors and cats.
* **Gamified Cat-Finding Map:** Designed a "Cat Map Collection" mechanism where visitors can "light up" a cat's icon on their personalized virtual map each time they successfully identify a new cat, adding fun and a sense of purpose to exploring the cat village, which can serve as personal achievements or group competitions.
* **LINE Bot Convenient Interaction:** Developed based on the LINE Messaging API, users don't need to download additional apps and can complete all interactions within the familiar messaging software, lowering the usage threshold.

## Technical Architecture & Implementation

### Frontend Implementation

* **User Interface (LINE):** The main user interaction interface is implemented through a LINE chatbot, using the LINE Messaging API to receive user commands (such as uploading images) and return processing results (such as identified cat information, image annotations).
* **Potential Expansion:** Although this project primarily uses LINE Bot as the frontend, the backend API design considered the possibility of future expansion to other frontend applications.

### Backend Architecture

* **Dual Server Architecture:**
    * **Line Chatbot Server (Flask):** Built using the Python Flask framework, responsible for handling webhook requests from the LINE platform, parsing user messages, coordinating communication with the YOLOv7 model server, and querying detailed cat information from the MongoDB database to organize and return the final response to users.
    * **YOLOv7 Model Server (FastAPI):** Built using the Python FastAPI framework, specifically responsible for receiving image data, performing image preprocessing, invoking the YOLOv7 model for inference, and returning the original recognition results (such as cat ID, confidence, bounding box coordinates) in JSON format to the Chatbot Server. FastAPI was chosen for its high performance and asynchronous processing capabilities.
* **Database (MongoDB):** Used to store detailed data for each registered cat, including name, story, personality, gender, photos, etc., for the Chatbot Server to query after successful identification.
* **AI Model (YOLOv7):** Adopted a transfer learning approach, based on the pre-trained YOLOv7 model, using cat image data collected on-site in Houtong and carefully annotated for customized training to adapt to the specific task of identifying individual cats.

### Deployment & Operations

* **Containerization (Docker):** Dockerized both the Flask application and FastAPI application separately, ensuring consistency across development, testing, and production environments, simplifying the deployment process.
* **Cloud Platform (Google Cloud Run):** Both backend services are deployed on the Google Cloud Run serverless platform, achieving on-demand automatic scaling to effectively handle potential instantaneous high-concurrency requests from visitors, while saving operational costs during off-peak hours.

## Challenges & Solutions During Development

### Challenge 1: Acquisition and Optimization of High-Quality AI Training Data

* **Problem:** In the early stages of the project, the team lacked experience in collecting animal image data in wild environments. Although many cat photos were taken during the first visit to Houtong, they had issues such as single angles, repeated backgrounds, and limited cat posture variations, resulting in the initial model's recognition accuracy falling below expectations.
* **Solution:** After analysis and discussion, we realized that the diversity of training data was far more important than mere quantity. During the second on-site data collection, we developed a more detailed shooting strategy: actively guiding cats to produce more diverse postures and actions (e.g., using cat toys), taking photos from different angles (overhead, level, looking up), and ensuring background diversity (cement, grass, wooden boards, sky, etc.). At the same time, we deliberately collected images with multiple cats in the frame to enhance the model's robustness in complex scenarios. This strategic adjustment significantly improved the quality of training data, thereby increasing model accuracy to exceed the 85% target.

### Challenge 2: Technology Selection and Rapid Prototype Development within Limited Time

* **Problem:** The project cycle was only 45 days, requiring completion of the entire process from concept design, technology selection, data collection, model training to application development and deployment in a short time.
* **Solution:**
    * **Rapid Iteration:** Adopted an agile development approach, first focusing on implementing core functionalities (AI identification of specific cats and returning basic information), then gradually improving gamification mechanisms and user experience details.
    * **Mature Technology Selection:** Chose frameworks with active communities and relatively complete documentation such as YOLOv7, Flask, and FastAPI, reducing the learning curve and risk of encountering problems.
    * **Team Division:** As the team leader, I assigned reasonable tasks based on team members' interests and abilities. For example, some members focused on data collection and annotation, some on model training optimization, and others on backend API development, ensuring parallel progress across various stages.

## Results & Achievements

* **Successful Launch and High Acclaim:** "Meowda Houtong Cat Individual Recognition and Story Interaction LINE Bot Service" was successfully developed and deployed, achieving the expected functionality and providing visitors with a novel and interesting "cat-finding stamp collection" interactive experience.
* **Award Recognition:** The project stood out among numerous projects assigned by enterprises at the TibaMe Academy's achievement presentation and won the "Learning Achievement Presentation Top 1 Best Potential Award."
* **Helped Team Members Successfully Change Careers:** What I find most gratifying is that based on the practical capabilities demonstrated through this project, all team members (including myself) successfully found ideal software engineering or AI-related jobs after the training, successfully opening new chapters in their careers.
* **Personal Growth:** This project marked an important leap in my AI technology application and project management capabilities. It not only allowed me to fully experience the entire process from concept ideation to product implementation but also taught me how to lead a team to overcome challenges and achieve goals when both resources and time are limited.

## Future Outlook

Although Meowda was a training project, its core concept and technical architecture still have potential for further development:

* **Expand Cat Database and Geographic Coverage:** Could collaborate with cat lovers or animal protection organizations in more areas to include special cats from other locations in the recognition system, creating a more extensive "Cat Map."
* **Enhance Community Interaction Features:** For example, allowing users to supplement new stories, photos, or status updates for already identified cats, forming an interactive community of cat lovers.
* **Combine AR Technology:** Future exploration could integrate AR technology so that when visitors point their phone cameras at cats, they can display AR avatars and related information in real-time, enhancing the immersive feeling of interaction.
* **Charity Integration:** Could collaborate with animal protection organizations to appropriately guide users to learn about adoption information or make small donations during their interactions with cats, giving the project deeper social value.

**DeepWiki:** <https://deepwiki.com/sheep52031/meowda>
