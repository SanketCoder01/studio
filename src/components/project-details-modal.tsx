
'use client';
import type { Project } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, FileDown, CheckCircle } from 'lucide-react';

type ProjectDetailsModalProps = {
  project: Project | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function ProjectDetailsModal({ project, isOpen, onOpenChange }: ProjectDetailsModalProps) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="p-6 pb-2">
              <DialogTitle className="font-headline text-3xl text-primary">{project.title}</DialogTitle>
              <DialogDescription className="text-lg text-muted-foreground mt-1">{project.description}</DialogDescription>
          </div>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 pb-6">
          <div className="md:col-span-2">
            <h3 className="font-semibold text-xl mb-3 border-b pb-2">Introduction</h3>
            <p className="text-muted-foreground leading-relaxed">{project.introduction}</p>
            
            <h3 className="font-semibold text-xl mt-6 mb-3 border-b pb-2">Key Features</h3>
            <ul className="space-y-3">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-xl mb-3 border-b pb-2">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
                 <Button asChild className="w-full">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      View Live Project <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  {project.reportUrl && (
                    <Button variant="outline" asChild className="w-full">
                      <a href={project.reportUrl} download="report.pdf" target="_blank" rel="noopener noreferrer">
                        Download Report <FileDown className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
