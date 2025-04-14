//React Imports
import Link from 'next/link';

// component imports 
import { ProjectCard, ProjectCardProps } from '@/components/ProjectCard';

// Project Data
  const projects: ProjectCardProps[]  = [
    {
      id: 1,
      title: "Cash Register",
      description:
        "A front-end single session application for managing cash transactions.",
      technologies: ["React", "TypeScript", "TailwindCSS"],
      imageColor: "#1E4D5A",
      //imageUrl: '/images/project-1.jpg', // Replace with your actual image path
    },
    {
      id: 2,
      title: "Glass Floor Drop",
      description:
        "A game where you have to cross a floor of glass panels without falling.",
      technologies: ["React", "TypeScript", "TailwindCSS"],
      imageColor: "#2A9D8F",
      // imageUrl: '/images/project-2.jpg', // Replace with your actual image path
    },
  ];

// This can remain a server component since theme toggling happens in client components
export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="py-16 px-5 text-center bg-brand-secondary dark:bg-brand-dark text-light-text-inverse dark:text-dark-text-primary border-b border-light-state-border dark:border-dark-state-border">
        <h1 className="text-4xl font-bold mb-4">Hello, I&apos;m Tony Banuchi</h1>
        <h2 className="text-2xl font-normal mb-8 text-light-text-inverse dark:text-dark-text-secondary">
          Software Engineer & Problem Solver
        </h2>
        <p className="max-w-xl mx-auto mb-8 leading-relaxed text-light-text-inverse dark:text-dark-text-secondary">
          I build elegant solutions to complex problems using modern technologies. 
          My passion is creating efficient, accessible, and maintainable code.
        </p>
        <p className="max-w-xl mx-auto mb-8 leading-relaxed text-light-text-inverse dark:text-dark-text-secondary">
          Highly adaptable Full-Stack Software Engineer with expertise in
          designing and deploying scalable, high-performance web applications.
          Proven ability to rapidly learn and apply new technologies while
          delivering high-impact solutions using Angular, Node.js, and Express.
          Demonstrated success in remote work environments, leading technical
          initiatives, and securing enterprise applications. Passionate about
          writing clean, maintainable code, optimizing application performance,
          and driving technical excellence while delivering measurable
          improvements.
        </p>
        <Link href="/projects" className="btn btn-primary">
          View My Work
        </Link>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-5 bg-light-surface-main dark:bg-brand-primary">
        <h2 className="text-2xl text-center mb-10 text-light-text-primary dark:text-dark-text-primary">
          Featured Projects
        </h2>
        
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
        <div className="text-center mt-10">
          <Link href="/projects" className="btn btn-outline">
            See All Projects
          </Link>
        </div>
      </section>
    </main>
  );
};