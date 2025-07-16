
'use client';

import { useState } from 'react';
import type { Internship } from '@/lib/types';
import { BriefcaseBusiness, CalendarDays, MapPin, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { InternshipDetailsModal } from '@/components/internship-details-modal';
import { cn } from '@/lib/utils';

type InternshipsSectionProps = {
  internships: Internship[];
};

export function InternshipsSection({ internships }: InternshipsSectionProps) {
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);

  const formatDateRange = (start: string, end: string) => {
    try {
      const startDate = format(new Date(start), 'MMM yyyy');
      const endDate = format(new Date(end), 'MMM yyyy');
      return `${startDate} - ${endDate}`;
    } catch {
      return `${start} - ${end}`;
    }
  };

  return (
    <>
      <section id="internships" className="py-20 md:py-32 bg-secondary/50 dark:bg-secondary/30 fade-in-up">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl font-bold md:text-5xl">
              Professional <span className="gradient-text bg-gradient-to-r from-primary to-blue-400">Experience</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              My professional experience and growth in the tech industry.
            </p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2" aria-hidden="true" />
            <div className="space-y-12">
              {internships.map((internship, index) => (
                <div key={internship.id} className="relative">
                  <div className="absolute top-5 left-4 md:left-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-background border-2 border-primary rounded-full" />
                  <div
                    className={cn(
                      'md:flex items-start',
                      index % 2 === 0 ? 'md:flex-row-reverse' : ''
                    )}
                  >
                    <div className="md:w-1/2">
                      {/* This empty div creates the space on the opposite side */}
                    </div>
                    <div className="md:w-1/2">
                       <div className={cn("p-6 ml-8 md:ml-0 bg-background rounded-xl border border-border shadow-md hover:shadow-primary/20 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1", index % 2 === 0 ? 'md:mr-8' : 'md:ml-8')}>
                        <InternshipCardContent internship={internship} formatDateRange={formatDateRange} onSelect={() => setSelectedInternship(internship)} rightAligned={index % 2 === 0} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <InternshipDetailsModal
        internship={selectedInternship}
        isOpen={!!selectedInternship}
        onOpenChange={() => setSelectedInternship(null)}
      />
    </>
  );
}

const InternshipCardContent = ({ internship, formatDateRange, onSelect, rightAligned }: { internship: Internship; formatDateRange: (start: string, end: string) => string; onSelect: () => void; rightAligned: boolean; }) => (
  <>
    <div className={cn("flex items-center gap-2 text-sm text-muted-foreground mb-2", rightAligned ? 'md:justify-end' : '')}>
      <BriefcaseBusiness className="h-4 w-4" />
      <span>{internship.company}</span>
    </div>
    <h3 className={cn("font-headline text-xl font-semibold mb-2", rightAligned ? 'md:text-right' : 'text-left')}>{internship.role}</h3>
    <div className={cn("flex items-start gap-4 text-sm text-muted-foreground mb-4 flex-wrap", rightAligned ? 'md:justify-end' : '')}>
      <div className="flex items-center gap-2">
        <CalendarDays className="h-4 w-4" />
        <span>{formatDateRange(internship.startDate, internship.endDate)}</span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4" />
        <span>{internship.location}</span>
      </div>
    </div>
    <p className={cn("text-foreground/80 text-sm line-clamp-3", rightAligned ? 'md:text-right' : 'text-left')}>{internship.description}</p>
    <div className={cn('mt-4', rightAligned ? 'text-right' : 'text-left')}>
      <Button variant="link" onClick={onSelect} className="p-0 h-auto text-sm">
        View Details <Eye className="ml-2 h-4 w-4" />
      </Button>
    </div>
  </>
);
