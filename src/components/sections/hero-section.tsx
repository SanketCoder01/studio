import type { Profile } from '@/lib/types';
import Image from 'next/image';

type HeroSectionProps = {
  profile: Profile;
};

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section id="home" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-12">
        <div className="w-48 h-48 md:w-64 md:h-64 relative shrink-0">
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={256}
            height={256}
            className="rounded-full object-cover border-4 border-primary shadow-lg"
            priority
            data-ai-hint="profile picture"
          />
        </div>
        <div>
          <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary">
            {profile.name}
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-muted-foreground font-body">
            {profile.title}
          </p>
        </div>
      </div>
    </section>
  );
}
