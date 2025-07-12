
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { usePortfolioData } from '@/hooks/use-portfolio-data';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('A valid email is required.'),
  message: z.string().min(1, 'Message is required.'),
});

export function ContactSection() {
  const { contacts: { addItem } } = usePortfolioData();
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const formSpreeResponse = await fetch("https://formspree.io/f/xblynoey", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Accept': 'application/json' }
      });

      if (!formSpreeResponse.ok) {
        throw new Error('Formspree submission failed');
      }

      await addItem({ ...data, read: false, received: new Date().toISOString() });
      
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Could not send your message. Please try again later.",
      });
    }
  };

  if (isSuccess) {
    return (
      <section id="contact" className="py-20 md:py-32 fade-in-up">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-headline text-4xl font-bold md:text-5xl">
              Thank You!
            </h2>
            <p className="text-lg text-muted-foreground mt-4">
              Your message has been sent successfully. I'll get back to you soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 md:py-32 fade-in-up">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-bold md:text-5xl">
            Get In <span className="gradient-text bg-gradient-to-r from-primary to-blue-400">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team.
          </p>
        </div>
        <div className="max-w-2xl mx-auto p-2 rounded-xl bg-gradient-to-br from-primary/20 via-transparent to-blue-500/20">
          <Card className="bg-secondary/80 backdrop-blur-sm rounded-lg p-8 md:p-12 border-0">
            <CardContent className="p-0">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl><Textarea rows={5} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="text-right">
                    <Button type="submit" size="lg" className="group" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? 'Sending...' : 'Send Message'} <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
