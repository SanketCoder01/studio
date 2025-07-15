
'use client';

import type { Certification } from '@/lib/types';
import Image from 'next/image';
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <div key={cert.id} className="group relative flex flex-col p-6 bg-secondary/50 dark:bg-secondary/30 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
              <div className="relative w-full h-40 rounded-md overflow-hidden mb-4">
                 <Image
                  src={cert.imageUrl}
                  alt={cert.name}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint="certificate document"
                  unoptimized={cert.imageUrl.startsWith('data:')}
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-body text-xl font-semibold mb-1">{cert.name}</h3>
                <p className="text-muted-foreground">{cert.issuer}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3 pt-3 border-t">
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
