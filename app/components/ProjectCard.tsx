const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  technologies,
  imageColor = '#1E4D5A' 
}) => {
  return (
    <div className="w-full max-w-sm rounded-lg overflow-hidden shadow dark:shadow-accent-teal/10">
      {/* Card changes appearance based on theme */}
      <div 
        className="h-40 flex items-center justify-center text-white"
        style={{ backgroundColor: imageColor }}
      >
        Project Screenshot
      </div>
      
      <div className="p-5 bg-white dark:bg-dark-neutral-offWhite transition-colors">
        <h3 className="text-lg font-medium mb-2 text-primary-dark dark:text-accent-teal">
          {title}
        </h3>
        
        <p className="text-sm mb-4 text-light-text-secondary dark:text-dark-text-secondary">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map(tech => (
            <span 
              key={tech} 
              className="px-2 py-1 text-xs rounded bg-light-neutral-warmGray dark:bg-primary-medium dark:text-white transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <a 
          href="#" 
          className="inline-block font-bold text-sm text-accent-teal hover:underline"
        >
          View Project →
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
// define the props for the ProjectCard component
export interface ProjectCardProps {
  title: string, 
  description: string, 
  technologies: string[], // array of technologies used in the project
  imageColor:string // color for the image background
}