'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageColor: string;
  imageUrl?: string;
}

 export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  technologies,
  imageColor = '#456789',
  imageUrl = ""
}) => {
  return (
    <div className="card">
      <div className="h-48 bg-brand-secondary flex items-center justify-center text-light-text-inverse">
        {imageUrl ? (
          <div className="relative w-full h-full">
            <Image 
              src={imageUrl} 
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="text-center text- p-4 relative w-full h-full content-center" style={{ backgroundColor: imageColor }}>Project Screenshot</div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">
          {title}
        </h3>
        
        <p className="text-sm mb-4 text-light-text-secondary dark:text-dark-text-secondary">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map(tech => (
            <span 
              key={tech} 
              className="px-2 py-1 text-xs rounded bg-light-surface-muted dark:bg-dark-surface-muted text-light-text-secondary dark:text-dark-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <Link 
          href={`/projects/${id}`} 
          className="inline-block font-bold text-sm text-accent-secondary hover:underline"
        >
          View Project →
        </Link>
      </div>
    </div>
  );
};
