
'use client';

import { useState } from 'react';
import type { Project } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { ProjectDetailsModal } from '@/components/project-details-modal';

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
              <Card key={project.id} className="flex flex-col overflow-hidden group transition-all duration-300 bg-secondary/50 dark:bg-secondary/30 border-border hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    data-ai-hint="abstract technology"
                    unoptimized={project.imageUrl.startsWith('data:')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="flex flex-col flex-grow p-6">
                  <CardTitle className="font-headline text-2xl mb-2">{project.title}</CardTitle>
                  <CardDescription className="flex-grow mb-6 text-foreground/70">{project.description}</CardDescription>
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
