
'use client';

import { useState } from 'react';
import type { Project } from '@/lib/types';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { ProjectDetailsModal } from '@/components/project-details-modal';
import { Badge } from '../ui/badge';

type ProjectsSectionProps = {
  projects: Project[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="projects" className="py-20 md:py-32 fade-in-up">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl font-bold md:text-5xl">
              My <span className="gradient-text bg-gradient-to-r from-primary to-blue-400">Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              A selection of my work, showcasing my skills in design and development.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="flex flex-col group transition-all duration-300 bg-secondary/50 dark:bg-secondary/30 border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 p-6">
                 <div className="flex flex-col flex-grow">
                  <CardTitle className="font-headline text-2xl mb-2">{project.title}</CardTitle>
                  <CardDescription className="flex-grow mb-6 text-foreground/70">{project.description}</CardDescription>
                   <div className="mb-4">
                     <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Tech Stack:</h4>
                     <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
                        {project.technologies.length > 4 && <Badge variant="outline">+{project.technologies.length - 4} more</Badge>}
                    </div>
                  </div>
                  <div className='mt-auto'>
                    <Button onClick={() => handleViewProject(project)} className="w-full">
                      View Details <Eye className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
