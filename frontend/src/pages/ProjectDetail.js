import { useParams } from 'react-router-dom';
import { projects } from '../data/projects';

function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id));

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{project.title}</h1>
      
      {/* Main Image */}
      <div className="mb-8">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full rounded-lg shadow-lg"
        />
      </div>

      {/* Technologies */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Technologies Used</h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Project Overview</h2>
        <div className="prose max-w-none">
          <p className="whitespace-pre-line text-gray-700">{project.fullDescription}</p>
        </div>
      </div>

      {/* Demo Video */}
      {project.videoUrl && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Demo</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={project.videoUrl}
              title={`${project.title} demo`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Project Screenshots */}
      {project.screenshots && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Screenshots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.screenshots.map((screenshot, index) => (
              <img
                key={index}
                src={screenshot.url}
                alt={screenshot.caption}
                className="rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>
      )}

      {/* Links */}
      <div className="flex gap-4">
        {project.demoLink && (
          <a 
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Live Demo
          </a>
        )}
        {project.githubLink && (
          <a 
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            View Source
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectDetail; 