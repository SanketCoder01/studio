
'use client';
import { ProfileForm } from '@/components/admin/profile-form';
import { AboutForm } from '@/components/admin/about-form';
import { ProjectsList } from '@/components/admin/projects-list';
import { OngoingProjectsList } from '@/components/admin/ongoing-projects-list';
import { EducationList } from '@/components/admin/education-list';
import { InternshipsList } from '@/components/admin/internships-list';
import { CertificationsList } from '@/components/admin/certifications-list';
import { ContactList } from '@/components/admin/contact-list';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePortfolioData } from '@/hooks/use-portfolio-data';
import { useToast } from '@/hooks/use-toast';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Upload } from 'lucide-react';

function AdminContent() {
  const searchParams = useSearchParams();
  const section = searchParams.get('section') || 'profile';

  const renderSection = () => {
    switch (section) {
      case 'profile':
        return <ProfileForm />;
      case 'about':
        return <AboutForm />;
      case 'projects':
        return <ProjectsList />;
      case 'ongoing-projects':
        return <OngoingProjectsList />;
      case 'internships':
        return <InternshipsList />;
      case 'education':
        return <EducationList />;
      case 'certifications':
        return <CertificationsList />;
      case 'contacts':
        return <ContactList />;
      default:
        return <ProfileForm />;
    }
  };

  return <div className="mt-6">{renderSection()}</div>;
}

export default function AdminPage() {
  const { data, loading, seedData } = usePortfolioData();
  const { toast } = useToast();
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeedData = async () => {
    setIsSeeding(true);
    try {
      await seedData();
      toast({
        title: "Database Seeded!",
        description: "Your Firestore database has been populated with the initial data.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Seeding Failed",
        description: "Could not seed the database. Check console for errors.",
      });
      console.error(error);
    } finally {
      setIsSeeding(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full min-h-[50vh] w-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
     <div className="space-y-6">
       <Card className="fade-in-up">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="font-headline text-3xl">Welcome, Sanket!</CardTitle>
              <CardDescription>
                Select a section from the sidebar to manage your portfolio content.
              </CardDescription>
            </div>
            {!data && (
               <Button onClick={handleSeedData} disabled={isSeeding}>
                <Upload className="mr-2 h-4 w-4" />
                {isSeeding ? 'Seeding...' : 'Seed Initial Data'}
              </Button>
            )}
          </div>
        </CardHeader>
        {!data && (
           <CardContent>
            <p className="text-destructive">
                No data found. Click the "Seed Initial Data" button to populate with default content.
            </p>
           </CardContent>
        )}
      </Card>

      {data && (
        <Suspense fallback={<div className="mt-6 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />}>
            <AdminContent />
        </Suspense>
      )}
    </div>
  );
}
