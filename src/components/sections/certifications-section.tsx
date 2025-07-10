import type { Certification } from '@/lib/types';
import { Award, CalendarDays } from 'lucide-react';

type CertificationsSectionProps = {
  certifications: Certification[];
};

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <section id="certifications" className="py-20 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="font-headline text-4xl font-bold text-center mb-12">
          Certifications
        </h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {certifications.map((cert) => (
            <div key={cert.id} className="p-4 bg-card rounded-lg shadow-sm border flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Award className="h-8 w-8 text-accent" />
                <div>
                  <h3 className="font-body text-lg font-semibold">{cert.name}</h3>
                  <p className="text-muted-foreground text-sm">{cert.issuer}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                <span>{cert.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
