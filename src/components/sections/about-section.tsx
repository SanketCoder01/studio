import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

type AboutSectionProps = {
  about: string;
  cvUrl: string;
};

export function AboutSection({ about, cvUrl }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="font-headline text-4xl font-bold text-center mb-12">
          About Me
        </h2>
        <div className="max-w-3xl mx-auto text-center text-lg text-foreground/80 leading-relaxed">
          <p>{about}</p>
          <Button asChild size="lg" className="mt-8">
            <a href={cvUrl} download>
              <FileText className="mr-2 h-5 w-5" />
              Download CV
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
