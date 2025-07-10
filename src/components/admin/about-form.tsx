'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { portfolioData } from '@/lib/data';
import { suggestContentImprovements, SuggestContentImprovementsOutput } from '@/ai/flows/suggest-content-improvements';
import { Loader2, Sparkles, Copy } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

const formSchema = z.object({
  about: z.string().min(20, 'About section must be at least 20 characters.'),
});

export function AboutForm() {
  const { toast } = useToast();
  const [aiSuggestions, setAiSuggestions] = useState<SuggestContentImprovementsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      about: portfolioData.profile.about,
    },
  });

  const currentContent = form.watch('about');

  async function handleAiSuggestions() {
      setIsLoading(true);
      setAiSuggestions(null);
      setIsDialogOpen(true);
      try {
          const result = await suggestContentImprovements({
              contentType: 'About Me',
              content: currentContent,
          });
          setAiSuggestions(result);
      } catch (error) {
          console.error(error);
          toast({
              variant: 'destructive',
              title: 'Error',
              description: 'Failed to get AI suggestions.',
          });
          setIsDialogOpen(false);
      } finally {
          setIsLoading(false);
      }
  }
  
  function applySuggestion() {
      if (aiSuggestions?.improvedContent) {
          form.setValue('about', aiSuggestions.improvedContent);
          toast({
              title: 'Content Updated',
              description: 'AI suggestion has been applied to the text area.'
          });
          setIsDialogOpen(false);
      }
  }
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
          Edit the "About Me" text. Use the AI assistant for suggestions.
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
            <div className="flex justify-between items-center">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                      <Button type="button" variant="outline" onClick={handleAiSuggestions}>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Get AI Suggestions
                      </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                      <DialogHeader>
                          <DialogTitle>AI Content Suggestions</DialogTitle>
                          <DialogDescription>
                            Here are AI-powered suggestions to improve your 'About Me' section.
                          </DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="h-96">
                        <div className="p-4">
                            {isLoading && <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
                            {aiSuggestions && (
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold mb-2">Improved Content</h4>
                                        <div className="p-3 rounded-md border bg-muted text-sm relative group">
                                            {aiSuggestions.improvedContent}
                                            <Button
                                                variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100"
                                                onClick={() => navigator.clipboard.writeText(aiSuggestions.improvedContent).then(() => toast({title: "Copied!"}))}>
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2 mt-4">Suggestions Made</h4>
                                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                            {aiSuggestions.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                      </ScrollArea>
                      <DialogFooter>
                           <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                           <Button onClick={applySuggestion} disabled={!aiSuggestions || isLoading}>Apply Suggestion</Button>
                      </DialogFooter>
                  </DialogContent>
              </Dialog>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
