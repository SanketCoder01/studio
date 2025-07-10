import { portfolioData } from '@/lib/data';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { EducationSection } from '@/components/sections/education-section';
import { InternshipsSection } from '@/components/sections/internships-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { CertificationsSection } from '@/components/sections/certifications-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/footer';

export default function Home() {
  const { profile, education, internships, projects, certifications } = portfolioData;

  return (
    <div className="flex flex-col min-h-screen bg-background">
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
