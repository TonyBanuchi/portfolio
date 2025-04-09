// pages/index.tsx
import React from "react";
import ProjectCard from "../components/ProjectCard";
// Icon Imports
import { FaAt } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

const HomePage: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: "Cash Register",
      description:
        "A front-end single session application for managing cash transactions.",
      technologies: ["React", "TypeScript", "TailwindCSS"],
      imageColor: "#1E4D5A",
    },
    {
      id: 2,
      title: "Glass Floor Drop",
      description:
        "A game where you have to cross a floor of glass panels without falling.",
      technologies: ["React", "TypeScript", "TailwindCSS"],
      imageColor: "#2A9D8F",
    },
  ];

  return (
    <>
      {/* Hero section */}
      <section className="py-16 px-5 text-center bg-primary-medium dark:bg-primary-deepest text-white border-b border-light-border dark:border-dark-border">
        <h1 className="text-4xl mb-4">Hello, I&apos;m Tony Banuchi</h1>
        <h2 className="text-2xl font-normal mb-8 text-light-text-primary dark:text-dark-text-secondary">
          Software Engineer & Problem Solver
        </h2>
        <p className="max-w-xl mx-auto mb-8 leading-relaxed text-light-text-primary dark:text-dark-text-secondary">
          I build elegant solutions to complex problems using modern
          technologies. My passion is creating efficient, accessible, and
          maintainable code.
        </p>
        <p className="max-w-xl mx-auto mb-8 leading-relaxed text-light-text-primary dark:text-dark-text-secondary">
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
        <button className="py-3 px-6 rounded font-bold bg-accent-gold text-primary-deepest hover:bg-opacity-90 transition">
          View My Work
        </button>
      </section>

      {/* Projects section */}
      <section className="py-16 px-5 bg-light-neutral-offWhite dark:bg-primary-dark transition-colors">
        <h2 className="text-2xl text-center mb-10 text-primary-dark dark:text-white">
          Featured Projects
        </h2>

        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              imageColor={project.imageColor}
            />
          ))}
        </div>
      </section>
      {/* Contact Section */}
      <section className="py-10 px-5 text-center bg-primary-medium text-light-text-primary dark:text-dark-text-primary transition-colors">
        <h2 className="text-2xl mt-0 mb-4">Let&apos;s Work Together</h2>
        <p className="max-w-xl mx-auto mb-5 text-light-text-secondary dark:text-dark-text-secondary transition-colors">
          Do you need an experienced Software Engineer, capable of adapting to
          solving the most complex problems? I&apos;m currently open to new
          opportunities and collaborations. I can help your organization
          succeed! Contact me to find out how.
        </p>
        <div className="flex justify-center gap-5">
          <a
            href="mailto:tony.banuchi@gmail.com"
            target="_blank"
            className="flex items-center gap-1 hover:opacity-80 text-accent-gold"
          >
            <FaAt size={16} />
            <span>Email Me</span>
          </a>
          <a
            href="https://www.linkedin.com/in/tony-banuchi-developer/"
            className="flex items-center gap-1 hover:opacity-80 text-accent-gold"
            target="_blank"
          >
            <FaLinkedin size={16} />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/TonyBanuchi"
            target="_blank"
            className="flex items-center gap-1 hover:opacity-80 text-accent-gold"
          >
            <FaGithub size={16} />
            <span>GitHub</span>
          </a>
        </div>
      </section>
    </>
  );
};

export default HomePage;
