'use client';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export function ContactSection() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = () => {
    if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID) {
      console.error('EmailJS Service ID is missing.');
      toast({
        variant: 'destructive',
        title: 'Configuration Error',
        description: 'The email service is not configured correctly.',
      });
      return;
    }
    if (!process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID) {
      console.error('EmailJS Template ID is missing.');
      toast({
        variant: 'destructive',
        title: 'Configuration Error',
        description: 'The email service is not configured correctly.',
      });
      return;
    }
    if (!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      console.error('EmailJS Public Key is missing.');
      toast({
        variant: 'destructive',
        title: 'Configuration Error',
        description: 'The email service is not configured correctly.',
      });
      return;
    }

    if (formRef.current) {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          formRef.current,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        )
        .then(
          (result) => {
            console.log(result.text);
            toast({
              title: 'Message Sent!',
              description: "Thanks for reaching out. I'll get back to you soon.",
            });
            form.reset();
          },
          (error) => {
            console.log(error.text);
            toast({
              variant: 'destructive',
              title: 'Failed to Send Message',
              description: 'Something went wrong. Please try again later.',
            });
          }
        );
    }
  };

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
          <div className="bg-secondary/80 backdrop-blur-sm rounded-lg p-8 md:p-12 border border-border">
            <Form {...form}>
              <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} name="name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} name="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your message..." rows={5} {...field} name="message" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-right">
                  <Button type="submit" size="lg" className="group">
                    Send Message <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
