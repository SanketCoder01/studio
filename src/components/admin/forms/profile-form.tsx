
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
  name: z.string().optional(),
  title: z.string().optional(),
  cvUrl: z.string().optional(),
  avatar: z.string().optional(),
});

export function ProfileForm() {
  const { toast } = useToast();
  const { data, updateProfile } = usePortfolioData();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data?.profile || { name: '', title: '', cvUrl: '', avatar: '' },
  });

  useEffect(() => {
    if (data?.profile) {
      form.reset(data.profile);
    }
  }, [data?.profile, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const finalValues = {
        name: values.name || '',
        title: values.title || '',
        cvUrl: values.cvUrl || '',
        avatar: values.avatar || '',
        about: data?.profile.about || '',
    }
    await updateProfile(finalValues);
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
                    <FileUpload 
                      value={value || ''} 
                      onChange={onChange}
                      enableCropper={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            <FormField control={form.control} name="cvUrl" render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>Your CV</FormLabel>
                  <FormControl>
                    <FileUpload 
                      value={value || ''} 
                      onChange={onChange}
                    />
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
