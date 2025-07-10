import type { Profile } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, Github, Linkedin, Send } from 'lucide-react';

type HeroSectionProps = {
  profile: Profile;
};

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section id="home" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="order-2 text-center md:order-1 md:text-left">
            <p className="mb-2 text-lg font-semibold text-primary">Hello, I'm</p>
            <h1 className="font-headline text-4xl font-bold md:text-6xl">
              {profile.name}
            </h1>
            <h2 className="mt-4 text-xl text-muted-foreground md:text-2xl">
              {profile.title}
            </h2>
            <div className="mt-8 flex justify-center gap-4 md:justify-start">
              <Button size="lg" asChild>
                <a href={profile.cvUrl} download>
                  <Download className="mr-2" />
                  Download CV
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#contact">
                  Contact Me <Send className="ml-2" />
                </a>
              </Button>
            </div>
             <div className="mt-8 flex justify-center gap-2 md:justify-start">
                <Button variant="ghost" size="icon" asChild>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="h-6 w-6" />
                    </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-6 w-6" />
                    </a>
                </Button>
            </div>
          </div>
          <div className="order-1 flex justify-center md:order-2">
            <div className="relative h-72 w-72 md:h-96 md:w-96">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                className="rounded-full object-cover shadow-2xl"
                priority
                data-ai-hint="profile picture"
              />
              <div className="absolute inset-0 rounded-full border-4 border-primary/10 transition-transform duration-500 hover:scale-105" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
