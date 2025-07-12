'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function LogoutButton() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    try {
      // Clear the session storage to log the user out
      sessionStorage.removeItem('isAuthenticated');
    } catch (error) {
      console.error('Session storage not available.');
    }
    
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
    router.push('/login');
  };

  return (
    <Button variant="ghost" onClick={handleLogout} className="w-full justify-start">
      <LogOut className="mr-2 h-4 w-4" /> Logout
    </Button>
  );
}
