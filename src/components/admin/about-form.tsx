'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { usePortfolioData } from '@/hooks/use-portfolio-data';
import { useEffect } from 'react';

const formSchema = z.object({
  about: z.string().min(20, 'About section must be at least 20 characters.'),
});

export function AboutForm() {
  const { toast } = useToast();
  const { data, updateProfile } = usePortfolioData();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      about: data?.profile.about || '',
    },
  });

  useEffect(() => {
    if (data?.profile.about) {
      form.reset({ about: data.profile.about });
    }
  }, [data?.profile.about, form]);
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!data?.profile) return;
    await updateProfile({ ...data.profile, about: values.about });
    toast({
      title: 'About Section Saved!',
      description: 'Your changes have been saved successfully.',
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>About Me Section</CardTitle>
        <CardDescription>
          Edit the "About Me" text for your portfolio.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea rows={8} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
