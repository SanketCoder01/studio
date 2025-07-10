import type { Education } from '@/lib/types';
import { GraduationCap, CalendarDays, School } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

type EducationSectionProps = {
  education: Education[];
};

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="education" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="font-headline text-4xl font-bold">
            Education
            </h2>
            <p className="text-lg text-muted-foreground mt-2">My academic background.</p>
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {education.map((edu) => (
            <Card key={edu.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary transition-colors duration-300">
                    <GraduationCap className="h-8 w-8 text-primary group-hover:text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-headline text-2xl font-semibold">{edu.school}</h3>
                  <p className="text-muted-foreground">{edu.degree}</p>
                </div>
              </CardHeader>
              <CardContent>
                 <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2 pt-2 border-t">
                    <CalendarDays className="h-4 w-4" />
                    <span>{edu.period}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
