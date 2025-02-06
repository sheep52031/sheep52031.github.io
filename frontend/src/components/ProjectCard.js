import { Link } from 'react-router-dom';

function ProjectCard({ project }) {
  // 添加調試日誌
  console.log('Rendering ProjectCard with image:', project.image);
  
  return (
    <Link 
      to={`/project/${project.id}`}
      className="block bg-white shadow rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/2 h-[300px] bg-gray-100"> {/* 添加背景色以便於調試 */}
          <img 
            src={`${process.env.PUBLIC_URL}${project.image}`}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('Image failed to load:', project.image);
              console.error('Error details:', e);
            }}
            onLoad={() => console.log('Image loaded successfully:', project.image)}
          />
        </div>

        {/* Content Section */}
        <div className="p-6 md:w-1/2 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{project.title}</h3>
            <p className="text-gray-600 mb-6 text-lg">{project.shortDescription}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* Date */}
          <div className="mt-4 text-gray-500">
            {project.date}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard; 