import type { Project } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

type ProjectsSectionProps = {
  projects: Project[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="font-headline text-4xl font-bold">
            My Projects
            </h2>
            <p className="text-lg text-muted-foreground mt-2">A selection of my work.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint="abstract technology"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <CardDescription className="flex-grow mb-6">{project.description}</CardDescription>
                <div className='mt-auto'>
                    <Button asChild variant="outline" className="w-full">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                        View Project <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                    </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
