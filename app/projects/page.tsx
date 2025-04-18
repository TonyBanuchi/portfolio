'use-client';

import { ProjectCard } from "@/components/ProjectCard";
import { projectsList } from "@/types/constants/projectsList.const";

const projects = projectsList;
export default function Projects(){
  return (
    <>
      <div className="font-bold text-3xl text-center text-accent-primary">Projects</div>
      <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
                {projects.map(project => (
                  <div key={project.id} className="w-full md:w-5/12 lg:w-1/3">
                    <ProjectCard
                      id={project.id}
                      title={project.title}
                      description={project.description}
                      technologies={project.technologies}
                      imageColor={project.imageColor}
                      imageUrl={project.imageUrl}
                  />
                  </div>
                ))}
              </div>
    </>
  );
}