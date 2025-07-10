import type { Education } from '@/lib/types';
import { GraduationCap, CalendarDays } from 'lucide-react';

type EducationSectionProps = {
  education: Education[];
};

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="education" className="py-20 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="font-headline text-4xl font-bold text-center mb-12">
          Education
        </h2>
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
          {education.map((edu) => (
            <div key={edu.id} className="p-6 bg-card rounded-lg shadow-sm border flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                    <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-headline text-xl font-semibold">{edu.school}</h3>
              </div>
              <p className="text-muted-foreground">{edu.degree}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-auto pt-2">
                <CalendarDays className="h-4 w-4" />
                <span>{edu.period}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
