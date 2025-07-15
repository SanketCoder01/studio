
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Home, User, BookUser, Briefcase, GraduationCap, Award, Building2, Mail, PanelLeft, LogOut } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogoutButton } from '@/components/auth/logout-button';
import { useAuth } from '@/hooks/use-auth';
import { usePortfolioData } from '@/hooks/use-portfolio-data';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isAuthChecked } = useAuth();
  const { data: portfolioData, loading: portfolioLoading } = usePortfolioData();
  const router = useRouter();

  useEffect(() => {
    // Wait until the auth check is complete
    if (isAuthChecked && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthChecked, isAuthenticated, router]);
  
  const isLoading = !isAuthChecked || portfolioLoading;

  if (isLoading) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <div className="h-16 w-16 animate-spin rounded-full border-8 border-primary border-t-transparent" />
        </div>
    );
  }

  // If not authenticated, the useEffect above will redirect, so we can return null or a loader.
  // Returning null prevents a brief flash of the layout before redirection.
  if (!isAuthenticated) {
    return null;
  }

  const profileName = portfolioData?.profile?.name || 'Admin';
  const avatarUrl = portfolioData?.profile?.avatar;
  const fallback = profileName.split(' ').map(n => n[0]).join('').substring(0, 2);

  // If authenticated, render the layout and children
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-3">
             <Avatar>
              <AvatarImage src={avatarUrl || ''} alt={profileName} data-ai-hint="profile picture" unoptimized={true}/>
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold">{profileName}</span>
              <span className="text-xs text-muted-foreground">Admin</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Profile" href="/admin#profile">
                    <Link href="/admin#profile"><User /><span>Profile</span></Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="About" href="/admin#about">
                    <Link href="/admin#about"><BookUser /><span>About</span></Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Projects" href="/admin#projects">
                    <Link href="/admin#projects"><Briefcase /><span>Projects</span></Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Internships" href="/admin#internships">
                    <Link href="/admin#internships"><Building2 /><span>Internships</span></Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Education" href="/admin#education">
                    <Link href="/admin#education"><GraduationCap /><span>Education</span></Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Certifications" href="/admin#certifications">
                    <Link href="/admin#certifications"><Award /><span>Certifications</span></Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Contacts" href="/admin#contacts">
                    <Link href="/admin#contacts"><Mail /><span>Contacts</span></Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="flex flex-col gap-2">
             <Button variant="outline" asChild className="w-full justify-start">
                <Link href="/"><Home className="mr-2 h-4 w-4" /> View Site</Link>
            </Button>
            <LogoutButton />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between border-b p-2 sticky top-0 bg-background/80 backdrop-blur-sm z-10 h-14">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="md:hidden"/>
                <h1 className="font-headline text-2xl">Admin Dashboard</h1>
            </div>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
