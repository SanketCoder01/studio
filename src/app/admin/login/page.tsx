import { LoginForm } from '@/components/auth/login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-md shadow-lg animate-in fade-in zoom-in-95">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">Admin Access</CardTitle>
          <CardDescription>Please log in to manage the portfolio.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
