import type { Certification } from '@/lib/types';
import { Award, CalendarDays } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type CertificationsSectionProps = {
  certifications: Certification[];
};

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <section id="certifications" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="font-headline text-4xl font-bold">
            Certifications & Awards
            </h2>
            <p className="text-lg text-muted-foreground mt-2">Recognitions of my skills and achievements.</p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert) => (
            <Card key={cert.id} className="p-6 shadow-sm border flex items-start gap-4 hover:shadow-md transition-shadow duration-300">
              <div className="bg-primary/10 p-3 rounded-full">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-grow">
                  <h3 className="font-body text-lg font-semibold">{cert.name}</h3>
                  <p className="text-muted-foreground text-sm">{cert.issuer}</p>
                   <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <CalendarDays className="h-4 w-4" />
                    <span>{cert.date}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
