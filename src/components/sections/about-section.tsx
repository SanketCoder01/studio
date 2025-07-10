import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

type AboutSectionProps = {
  about: string;
  cvUrl: string;
};

export function AboutSection({ about, cvUrl }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
           <div className="text-center mb-12">
             <h2 className="font-headline text-4xl font-bold">
              About Me
            </h2>
            <p className="text-lg text-muted-foreground mt-2">A little bit about my journey and passion.</p>
           </div>
          <Card className="shadow-lg">
            <CardContent className="p-8 md:p-10">
              <p className="text-center text-lg text-foreground/80 leading-relaxed">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
