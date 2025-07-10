import type { Education } from '@/lib/types';
import { GraduationCap, CalendarDays } from 'lucide-react';

type EducationSectionProps = {
  education: Education[];
};

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="education" className="py-20 md:py-32 bg-secondary/50 dark:bg-secondary/30 fade-in-up">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-bold md:text-5xl">
            My <span className="gradient-text bg-gradient-to-r from-primary to-blue-400">Education</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            My academic journey and qualifications.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {education.map((edu) => (
            <div key={edu.id} className="group relative p-6 bg-background rounded-xl border border-border hover:border-primary/50 transition-all duration-300 shadow-md hover:shadow-primary/20 hover:-translate-y-1">
              <div className="absolute top-0 right-0 -mt-2 -mr-2 text-primary opacity-10 group-hover:opacity-30 transition-opacity duration-300">
                <GraduationCap size={80} />
              </div>
              <div className="relative">
                <h3 className="font-headline text-2xl font-semibold mb-2">{edu.school}</h3>
                <p className="text-primary font-medium">{edu.degree}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 pt-4 border-t border-border">
                  <CalendarDays className="h-4 w-4" />
                  <span>{edu.period}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
