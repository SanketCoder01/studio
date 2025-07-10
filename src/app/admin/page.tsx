
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

export default function AdminPage() {
  return (
    <div className="space-y-6">
       <Card className="fade-in-up">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Welcome, Admin!</CardTitle>
          <CardDescription>
            Use the tabs below to manage the content of your portfolio website.
            Changes will be reflected on the live site after saving.
          </CardDescription>
        </CardHeader>
      </Card>

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
    </div>
  );
}
