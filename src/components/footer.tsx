
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Code } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/50">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row">
        <div className="flex items-center gap-2">
           <Code className="h-6 w-6 text-primary" />
           <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Sanket Gaikwad. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/SanketCoder01/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://www.linkedin.com/in/sanket-gaikwad-50134a314/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login">Admin Login</Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
