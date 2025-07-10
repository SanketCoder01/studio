import type { Internship } from '@/lib/types';
import { BriefcaseBusiness, CalendarDays } from 'lucide-react';
import { Card } from '@/components/ui/card';

type InternshipsSectionProps = {
  internships: Internship[];
};

export function InternshipsSection({ internships }: InternshipsSectionProps) {
  return (
    <section id="internships" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
            <h2 className="font-headline text-4xl font-bold">
            Internships
            </h2>
            <p className="text-lg text-muted-foreground mt-2">My professional experience and growth.</p>
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2" aria-hidden="true" />
          {internships.map((internship, index) => (
            <div key={internship.id} className={`relative mb-12`}>
              <div className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                 <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <Card className="p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <BriefcaseBusiness className="h-4 w-4" />
                            <span>{internship.company}</span>
                        </div>
                        <h3 className="font-headline text-xl font-semibold mb-2">{internship.role}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                            <CalendarDays className="h-4 w-4" />
                            <span>{internship.period}</span>
                        </div>
                        <p className="text-foreground/80 text-sm">{internship.description}</p>
                    </Card>
                 </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-background border-2 border-primary rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
