
'use client';

import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { EducationSection } from '@/components/sections/education-section';
import { InternshipsSection } from '@/components/sections/internships-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { CertificationsSection } from '@/components/sections/certifications-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { usePortfolioData } from '@/hooks/use-portfolio-data';
import { Skeleton } from '@/components/ui/skeleton';

function PageSkeleton() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-20 md:py-32 space-y-24">
        {/* Hero Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-8 w-3/4" />
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-12 w-36" />
              <Skeleton className="h-12 w-36" />
            </div>
          </div>
          <div className="flex justify-center">
            <Skeleton className="h-72 w-72 rounded-full" />
          </div>
        </div>
        {/* Section Skeleton */}
        <div className="space-y-4 text-center">
           <Skeleton className="h-12 w-1/2 mx-auto" />
           <Skeleton className="h-6 w-3/4 mx-auto" />
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
           </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


export default function Home() {
  const { data, loading } = usePortfolioData();

  if (loading || !data) {
    return <PageSkeleton />;
  }

  const { profile, education, internships, projects, certifications } = data;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection profile={profile} />
        <AboutSection about={profile.about} cvUrl={profile.cvUrl} />
        <ProjectsSection projects={projects} />
        <InternshipsSection internships={internships} />
        <EducationSection education={education} />
        <CertificationsSection certifications={certifications} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
