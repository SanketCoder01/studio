
'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileForm } from '@/components/admin/profile-form';
import { AboutForm } from '@/components/admin/about-form';
import { ProjectsList } from '@/components/admin/projects-list';
import { EducationList } from '@/components/admin/education-list';
import { InternshipsList } from '@/components/admin/internships-list';
import { CertificationsList } from '@/components/admin/certifications-list';
import { ContactList } from '@/components/admin/contact-list';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePortfolioData } from '@/hooks/use-portfolio-data';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Upload } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export default function AdminPage() {
  const { data, loading, seedData } = usePortfolioData();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
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

  if (loading || isAuthLoading) {
    return (
      <div className="flex h-full min-h-[50vh] w-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }
  
  // This check is redundant due to AdminLayout but provides an extra layer of safety
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="space-y-6">
       <Card className="fade-in-up">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="font-headline text-3xl">Welcome, Admin!</CardTitle>
              <CardDescription>
                Use the tabs below to manage your portfolio content.
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
                No data found in Firestore. Click the "Seed Initial Data" button to populate your database with the default content from `src/lib/data.ts`.
            </p>
           </CardContent>
        )}
      </Card>

      {data && (
        <Tabs defaultValue="profile" className="w-full fade-in-up" style={{ animationDelay: '0.2s' }}>
          <TabsList className="grid w-full grid-cols-3 h-auto md:grid-cols-4 lg:grid-cols-7">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="internships">Internships</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
          </TabsList>
          
          <div id="profile" className="pt-6"><TabsContent value="profile"><ProfileForm /></TabsContent></div>
          <div id="about" className="pt-6"><TabsContent value="about"><AboutForm /></TabsContent></div>
          <div id="projects" className="pt-6"><TabsContent value="projects"><ProjectsList /></TabsContent></div>
          <div id="internships" className="pt-6"><TabsContent value="internships"><InternshipsList /></TabsContent></div>
          <div id="education" className="pt-6"><TabsContent value="education"><EducationList /></TabsContent></div>
          <div id="certifications" className="pt-6"><TabsContent value="certifications"><CertificationsList /></TabsContent></div>
          <div id="contacts" className="pt-6"><TabsContent value="contacts"><ContactList /></TabsContent></div>
        </Tabs>
      )}
    </div>
  );
}
