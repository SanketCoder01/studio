
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { usePortfolioData } from '@/hooks/use-portfolio-data';
import { useEffect } from 'react';
import { FileUpload } from '@/components/admin/forms/file-upload';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  cvUrl: z.string().min(1, 'Please upload your CV.'),
  avatar: z.string().min(1, 'Please upload an avatar image.'),
});

export function ProfileForm() {
  const { toast } = useToast();
  const { data, updateProfile } = usePortfolioData();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data?.profile,
  });

  useEffect(() => {
    if (data?.profile) {
      form.reset(data.profile);
    }
  }, [data?.profile, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!data?.profile) return;
    await updateProfile({ ...data.profile, ...values });
    toast({
      title: 'Profile Saved!',
      description: 'Your changes have been saved successfully.',
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Manage your personal information and CV link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>Title / Headline</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
             <FormField control={form.control} name="avatar" render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>Avatar Image</FormLabel>
                  <FormControl>
                    <FileUpload uploadKey="profile-avatar" value={value} onChange={onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            <FormField control={form.control} name="cvUrl" render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>Your CV</FormLabel>
                  <FormControl>
                    <FileUpload uploadKey="profile-cv" value={value} onChange={onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
