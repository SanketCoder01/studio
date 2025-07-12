
'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { usePortfolioData } from '@/hooks/use-portfolio-data';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export function ContactSection() {
  const { contacts: { addItem } } = usePortfolioData();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<{name: string, email: string, message: string}>();
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: { name: string; email: string; message: string }) => {
    try {
      // Also send to formspree (or any other service if you want)
      const formSpreeResponse = await fetch("https://formspree.io/f/xblynoey", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Accept': 'application/json' }
      });

      if (!formSpreeResponse.ok) {
        throw new Error('Formspree submission failed');
      }

      // Save to our database
      await addItem({ ...data, read: false, received: new Date().toISOString() });
      
      setIsSuccess(true);
      reset();
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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input id="name" type="text" placeholder="Your Name" {...register('name', { required: 'Name is required.'})} />
                    {errors.name && <p className="text-sm font-medium text-destructive">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="your.email@example.com" {...register('email', { required: 'Email is required.'})} />
                     {errors.email && <p className="text-sm font-medium text-destructive">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea id="message" placeholder="Your message..." rows={5} {...register('message', { required: 'Message is required.'})} />
                   {errors.message && <p className="text-sm font-medium text-destructive">{errors.message.message}</p>}
                </div>
                <div className="text-right">
                  <Button type="submit" size="lg" className="group" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'} <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
