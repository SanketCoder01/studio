
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

export default function Home() {
  const { data, loading } = usePortfolioData();

  if (loading || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-16 w-16 animate-spin rounded-full border-8 border-primary border-t-transparent" />
      </div>
    );
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
