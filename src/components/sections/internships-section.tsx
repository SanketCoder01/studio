import type { Internship } from '@/lib/types';
import { BriefcaseBusiness, CalendarDays } from 'lucide-react';

type InternshipsSectionProps = {
  internships: Internship[];
};

export function InternshipsSection({ internships }: InternshipsSectionProps) {
  return (
    <section id="internships" className="py-20 md:py-32 bg-secondary/30 fade-in-up">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-bold md:text-5xl">
            Professional <span className="gradient-text bg-gradient-to-r from-primary to-blue-400">Experience</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            My professional experience and growth in the tech industry.
          </p>
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2" aria-hidden="true" />
          {internships.map((internship, index) => (
            <div key={internship.id} className="relative mb-12 pl-12 md:pl-0">
              <div className="md:flex md:items-center" style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}>
                <div className="md:w-1/2 md:pr-8">
                  {index % 2 === 0 ? (
                    <div className="p-6 bg-background rounded-xl border border-border shadow-md hover:shadow-primary/20 hover:border-primary/50 transition-all duration-300">
                      <InternshipCardContent internship={internship} />
                    </div>
                  ) : <div></div>}
                </div>
                <div className="md:w-1/2 md:pl-8">
                  {index % 2 !== 0 ? (
                     <div className="p-6 bg-background rounded-xl border border-border shadow-md hover:shadow-primary/20 hover:border-primary/50 transition-all duration-300">
                      <InternshipCardContent internship={internship} />
                    </div>
                  ) : <div></div>}
                </div>
              </div>
              <div className="absolute top-1/2 left-4 md:left-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-background border-2 border-primary rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const InternshipCardContent = ({ internship }: { internship: Internship }) => (
  <>
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
  </>
);
