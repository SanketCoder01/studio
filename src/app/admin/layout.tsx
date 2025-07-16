
'use client';
import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
import { Home, User, BookUser, Briefcase, GraduationCap, Award, Building2, Mail, PanelLeft, LogOut, Construction } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogoutButton } from '@/components/auth/logout-button';
import { useAuth } from '@/hooks/use-auth';
import { usePortfolioData } from '@/hooks/use-portfolio-data';

export const dynamic = 'force-dynamic';

const navItems = [
    { id: 'profile', label: 'Profile', icon: User, href: '/admin?section=profile' },
    { id: 'about', label: 'About', icon: BookUser, href: '/admin?section=about' },
    { id: 'projects', label: 'Projects', icon: Briefcase, href: '/admin?section=projects' },
    { id: 'ongoing-projects', label: 'Ongoing Projects', icon: Construction, href: '/admin?section=ongoing-projects' },
    { id: 'internships', label: 'Internships', icon: Building2, href: '/admin?section=internships' },
    { id: 'education', label: 'Education', icon: GraduationCap, href: '/admin?section=education' },
    { id: 'certifications', label: 'Certifications', icon: Award, href: '/admin?section=certifications' },
    { id: 'contacts', label: 'Contacts', icon: Mail, href: '/admin?section=contacts' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isAuthChecked } = useAuth();
  const { data: portfolioData, loading: portfolioLoading } = usePortfolioData();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSection = searchParams.get('section') || 'profile';

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
              <AvatarImage src={avatarUrl || ''} alt={profileName} data-ai-hint="profile picture" />
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold">{profileName}</span>
              <span className="text-xs text-muted-foreground">Portfolio Manager</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map(item => (
                <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild tooltip={item.label} href={item.href} isActive={currentSection === item.id}>
                        <Link href={item.href}><item.icon /><span>{item.label}</span></Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
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
