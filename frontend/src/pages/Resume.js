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

        {/* Continue with other work experiences... */}
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
    </div>
  );
}

export default Resume; 