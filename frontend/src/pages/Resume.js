function Resume() {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
      {/* Contact Information */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 border-b-2 border-blue-500 pb-2">
          Jason Lin (林家任) - <span className="font-normal text-gray-600">Cloud Solutions Engineer</span>
        </h1>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>📧 sheep52031@gmail.com</div>
          <div>📱 +886-921-096-672</div>
          <div>📍 Taipei, Taiwan</div>
          <div>🌐 <a href="https://github.com/sheep52031" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">github.com/sheep52031</a></div>
        </div>
      </div>

      {/* Professional Summary */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Professional Summary</h2>
        <p className="text-gray-700 mb-4">I am an engineer with a solid background in AI application development, cloud services, and system integration.</p>
        <p className="text-gray-700 mb-4">My work in backend development and AI model deployment has allowed me to see projects through from concept to launch, often in close collaboration with diverse teams.</p>
        <p className="text-gray-700">Over time, I've learned how to bridge technical challenges with real business needs, and I continue to seek opportunities that help me grow both technically and professionally while contributing meaningful solutions.</p>
      </section>

      {/* Technical Skills */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Technical Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Programming & Scripting</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Python - FastAPI</li>
              <li>React - JavaScript</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Machine Learning & AI</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>TensorFlow</li>
              <li>YOLOv7</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Cloud & Deployment</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Google Cloud Platform</li>
              <li>Docker</li>
              <li>Linux</li>
              <li>Git</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Data Analysis</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>SQL</li>
              <li>EXCEL</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Project Experience */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Project Experience</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Delivery Platform (AI Integration Planned) | Independent Developer</h3>
          <div className="text-gray-600 italic mb-2">2024/09 – Present</div>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Designing and developing a delivery platform featuring member management, order processing, and automated dispatch.</li>
            <li>Implementing backend services using FastAPI and building the frontend with React, utilizing Firebase Firestore for data management.</li>
            <li>Project is currently under development; future plans include integrating AI functionalities to optimize operations.</li>
            <li>Developing analytics features to monitor sales trends and customer behavior.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Cat Recognition System | Project Lead</h3>
          <div className="text-gray-600 italic mb-2">2022/11 – 2023/01</div>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Led a 6-member team to develop a LINE-integrated cat recognition service.</li>
            <li>Trained a YOLOv7 model to recognize 14 selected and named cats from Houtong Cat Village, achieving accuracy exceeding 85%.</li>
            <li>Designed and implemented robust model training workflows while optimizing data collection and annotation processes.</li>
            <li>Ensured consistency between development and production environments via containerized deployment using Docker.</li>
            <li>Developed a RESTful API to integrate the AI model with the LINE Messaging API.</li>
          </ul>
        </div>
      </section>

      {/* Work Experience */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Work Experience</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Founder & Strategic Investor</h3>
          <div className="text-gray-600 italic mb-2">LUMACOOL, Cebu, Philippines 2024/01 – 2025/01</div>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Founded and managed a beverage brand, overseeing strategy, product development, and marketing while acquiring cross-cultural and data-driven business insights.</li>
            <li>Designed and implemented an automated delivery platform integrating member management and order processing to address revenue challenges.</li>
            <li>Leveraged data analytics to track sales trends and customer behavior, continuously refining product mix and pricing strategies.</li>
            <li>Transitioned daily operations to local partners, enabling a shift toward strategic investment and market development.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Cloud Engineer</h3>
          <div className="text-gray-600 italic mb-2">Acer Inc. 2023/02 – 2023/08</div>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Provided technical support for GCP cloud services and contributed to system architecture design.</li>
            <li>Assisted enterprise clients with cloud migration assessments and implementations.</li>
            <li>Collaborated with cross-functional teams to deliver robust multi-cloud solutions.</li>
            <li>Maintained cloud reseller billing systems using the .NET Core framework.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">AI Application Development Trainee</h3>
          <div className="text-gray-600 italic mb-2">TibaMe Academy 2022/09 – 2023/01</div>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Completed a 500-hour intensive training program covering data processing (web scraping, Matplotlib), databases (MySQL, MongoDB), and AI application development.</li>
            <li>Developed multiple AI solutions including YOLOv7-based object detection, facial recognition, and license plate recognition, integrating with Raspberry Pi hardware.</li>
            <li>Acquired full-stack development skills with Flask and LineBot, and learned cloud deployment strategies using Docker and GCP (VM/Cloud Run).</li>
            <li>Led a team in designing and developing a cat recognition service, overseeing system architecture and backend development.</li>
            <li>Awarded the Top Learning Excellence recognition for outstanding performance.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Creative Director & Project Manager</h3>
          <div className="text-gray-600 italic mb-2">Latte Creative Studio 2019/06 – 2022/08</div>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Collaborated with AI imaging platform Meero to develop standardized shooting protocols and optimize data collection for AI training.</li>
            <li>Secured a commercial photography project for UberEats Taiwan, driving the digital transformation of over 1,000 merchants into the delivery market.</li>
            <li>Utilized Facebook Business Suite and LINE business tools to boost social media engagement by 300%, resulting in an 80% increase in order conversions for a car rental client.</li>
            <li>Managed an event marketing project for the Taoyuan City Youth Affairs Bureau, overseeing promotional activities and photography documentation.</li>
            <li>Produced a corporate video broadcast on TVBS News that contributed to a 50% increase in monthly service applications, meeting government performance targets.</li>
          </ul>
        </div>
      </section>

      {/* Education */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Education</h2>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Fu Jen Catholic University</h3>
          <div className="text-gray-600 italic">B.S. in Electrical Engineering 2012/09 – 2016/06</div>
        </div>
      </section>

      {/* Languages */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Languages</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Chinese: Native</li>
          <li>English: Fluent in everyday conversation</li>
        </ul>
      </section>

      {/* Continuous Learning */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Continuous Learning</h2>
        <div>
          <div className="font-semibold text-gray-800">Philippine Language School 2023/09 – 2023/12</div>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Completed an intensive English training program with a simulated IELTS score of 5.5.</li>
            <li>Enhanced cross-cultural communication skills through immersive language study.</li>
          </ul>
        </div>
      </section>

      {/* Autobiography */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Autobiography</h2>
        <div className="text-gray-700">
          <p className="mb-4">I hold a Bachelor of Science in Electrical Engineering from Fu Jen Catholic University (2016) and have since dedicated my career to mastering software development, cloud solutions, and project leadership. My journey has been defined by continuous learning and the practical application of cutting-edge technologies to solve real-world business challenges.</p>

          <p className="font-semibold mb-2">Technical Expertise & Project Leadership</p>
          <p className="mb-4">My primary technical proficiency lies in Python, which I have applied to develop robust backend systems using frameworks such as FastAPI. I have built several projects, including a delivery platform that leverages React for its frontend and utilizes Firebase Firestore and Google Cloud Run for scalable, cost-effective deployment. Although this project is still under development—with ongoing work to integrate advanced AI functionalities—it has allowed me to refine my skills in API integration, containerization with Docker, and serverless architecture design.</p>
          <p className="mb-4">I further enhanced my technical toolkit by participating in an intensive AI application development program. During this time, I led a team project to build a cat recognition system using TensorFlow and YOLOv7. This initiative, which integrated our trained model with a LINE messaging bot, not only solidified my understanding of machine learning workflows but also demonstrated my ability to manage cross-functional teams and ensure the seamless integration of complex systems.</p>

          <p className="font-semibold mb-2">Corporate & Entrepreneurial Experience</p>
          <p className="mb-4">In a subsequent role as a Cloud Engineer at Acer Inc., I contributed to designing and implementing cloud solutions on the Google Cloud Platform. I assisted enterprise clients with cloud migration strategies and collaborated with diverse teams to deliver multi-cloud architectures that balanced performance with cost efficiency. This experience deepened my understanding of cloud infrastructure and enhanced my ability to communicate technical solutions across departments.</p>
          <p className="mb-4">My entrepreneurial venture in the Philippines further honed my skills in project management and data-driven decision making. I founded a beverage brand where I not only developed the product and marketing strategy but also initiated the development of an in-house food delivery platform. By leveraging modern development tools and AI agent technologies, I aimed to create a scalable solution that minimizes reliance on costly third-party delivery services. Recognizing the need to focus on my core competencies, I have since transitioned day-to-day operational control of this venture to a trusted local partner, allowing me to fully commit to advancing my technical and management skills in my next professional role.</p>

          <p className="font-semibold mb-2">Looking Ahead</p>
          <p>I am eager to bring my blend of technical expertise, project leadership, and data-driven strategy to an innovative organization—whether within technology, venture capital, or strategic project management. I am confident that my ability to integrate software solutions with business insights will drive growth and foster innovation in any dynamic, forward-thinking environment.</p>
        </div>
      </section>
    </div>
  );
}

export default Resume; 