import type { Internship } from '@/lib/types';
import { BriefcaseBusiness, CalendarDays } from 'lucide-react';

type InternshipsSectionProps = {
  internships: Internship[];
};

export function InternshipsSection({ internships }: InternshipsSectionProps) {
  return (
    <section id="internships" className="py-20 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="font-headline text-4xl font-bold text-center mb-12">
          Internships
        </h2>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-border" aria-hidden="true" />
          <div className="space-y-12">
            {internships.map((internship) => (
              <div key={internship.id} className="relative pl-12">
                <div className="absolute left-4 top-1 -translate-x-1/2 w-4 h-4 bg-primary rounded-full" />
                <div className="p-6 bg-card rounded-lg shadow-sm border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <BriefcaseBusiness className="h-4 w-4" />
                        <span>{internship.company}</span>
                        <span className="mx-1">|</span>
                        <CalendarDays className="h-4 w-4" />
                        <span>{internship.period}</span>
                    </div>
                    <h3 className="font-headline text-xl font-semibold mb-2">{internship.role}</h3>
                    <p className="text-foreground/80">{internship.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
