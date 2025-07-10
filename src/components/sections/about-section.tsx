import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

type AboutSectionProps = {
  about: string;
  cvUrl: string;
};

export function AboutSection({ about, cvUrl }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 md:py-32 fade-in-up">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-headline text-4xl font-bold md:text-5xl">
            About <span className="gradient-text bg-gradient-to-r from-primary to-blue-400">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            A little bit about my journey and passion.
          </p>
          <div className="mt-12 bg-secondary/50 border border-border rounded-xl p-8 md:p-12 shadow-lg relative overflow-hidden">
            <div className="absolute -top-16 -left-16 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
            <p className="relative text-lg md:text-xl text-foreground/80 leading-relaxed">
              {about}
            </p>
            <div className="text-center mt-8">
              <Button asChild size="lg">
                <a href={cvUrl} download>
                  <FileText className="mr-2 h-5 w-5" />
                  Download CV
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
