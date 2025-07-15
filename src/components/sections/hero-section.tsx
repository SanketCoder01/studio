
import type { Profile } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, Github, Linkedin, Send } from 'lucide-react';
import Link from 'next/link';

type HeroSectionProps = {
  profile: Profile;
};

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section id="home" className="py-20 md:py-32 min-h-[80vh] flex items-center fade-in">
       <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1 text-center md:text-left">
            <p className="mb-2 text-lg font-semibold text-primary">Hello, I'm</p>
            <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-6xl">
              {profile.name}
            </h1>
            <h2 className="mt-4 text-xl text-muted-foreground md:text-2xl gradient-text bg-gradient-to-r from-muted-foreground to-foreground">
              {profile.title}
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
              <Button size="lg" asChild>
                <a href={profile.cvUrl} download="cv.pdf">
                  <Download className="mr-2" />
                  Download CV
                </a>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="#contact">
                  Contact Me <Send className="ml-2" />
                </Link>
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
            <div className="relative h-72 w-72 md:h-96 md:w-96 group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/50 to-blue-500/50 blur-2xl opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                className="relative rounded-full object-cover border-4 border-background/50 shadow-2xl group-hover:scale-105 transition-transform duration-300"
                priority
                data-ai-hint="profile picture"
                unoptimized={profile.avatar.startsWith('data:')}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
