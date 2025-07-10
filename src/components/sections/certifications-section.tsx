import type { Certification } from '@/lib/types';
import { Award, CalendarDays } from 'lucide-react';

type CertificationsSectionProps = {
  certifications: Certification[];
};

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <section id="certifications" className="py-20 md:py-32 fade-in-up">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-bold md:text-5xl">
            Certifications & <span className="gradient-text bg-gradient-to-r from-primary to-blue-400">Awards</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Recognitions of my skills and dedication to continuous learning.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert) => (
            <div key={cert.id} className="group relative p-6 bg-secondary/50 dark:bg-secondary/30 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <div className="relative flex items-start gap-6">
                <div className="bg-primary/10 text-primary p-3 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Award className="h-8 w-8" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-body text-xl font-semibold mb-1">{cert.name}</h3>
                  <p className="text-muted-foreground">{cert.issuer}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                    <CalendarDays className="h-4 w-4" />
                    <span>{cert.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
