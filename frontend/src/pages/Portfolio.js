import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

function Portfolio() {
  // Sort projects by satisfaction score
  const sortedProjects = [...projects].sort((a, b) => b.satisfaction - a.satisfaction);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Portfolio</h1>
      
      {/* Project Stack */}
      <div className="flex flex-col space-y-8">
        {sortedProjects.map((project) => (
          <ProjectCard 
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </div>
  );
}

export default Portfolio; 