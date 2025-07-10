import type { Profile } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

type HeroSectionProps = {
  profile: Profile;
};

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10" />
      <div className="absolute inset-0">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Abstract background"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
          data-ai-hint="abstract background"
        />
      </div>
      <div className="relative z-20 container mx-auto px-4 flex flex-col items-center justify-center gap-6">
        <div className="w-48 h-48 md:w-64 md:h-64 relative shrink-0 fade-in">
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={256}
            height={256}
            className="rounded-full object-cover border-4 border-background shadow-2xl"
            priority
            data-ai-hint="profile picture"
          />
        </div>
        <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary">
            {profile.name}
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-foreground/80 font-body">
            {profile.title}
          </p>
        </div>
        <a href="#about" className="absolute bottom-10 z-20 fade-in" style={{ animationDelay: '0.5s' }}>
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full animate-bounce">
            <ArrowDown className="h-6 w-6" />
          </Button>
        </a>
      </div>
    </section>
  );
}
