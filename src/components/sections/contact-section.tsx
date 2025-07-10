
'use client';

import { useForm, ValidationError } from '@formspree/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function ContactSection() {
  const [state, handleSubmit] = useForm("xblynoey");

  if (state.succeeded) {
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input id="name" type="text" name="name" placeholder="Your Name" required />
                    <ValidationError prefix="Name" field="name" errors={state.errors} className="text-sm font-medium text-destructive" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" name="email" placeholder="your.email@example.com" required />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-sm font-medium text-destructive" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea id="message" name="message" placeholder="Your message..." rows={5} required />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-sm font-medium text-destructive" />
                </div>
                <div className="text-right">
                  <Button type="submit" size="lg" className="group" disabled={state.submitting}>
                    {state.submitting ? 'Sending...' : 'Send Message'} <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
