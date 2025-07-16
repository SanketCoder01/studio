
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Project } from '@/lib/types';
import { useEffect } from 'react';
import { FileUpload } from './file-upload';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
  imageUrl: z.string().min(1, 'Please upload a project image.'),
  link: z.string().url('Must be a valid URL.'),
  introduction: z.string().min(1, 'Introduction is required.'),
  technologies: z.string().min(1, 'Please list at least one technology.'),
  features: z.string().min(1, 'Please list at least one feature.'),
  reportUrl: z.string().optional(),
});

type ProjectFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (values: Omit<Project, 'id'> | Project) => void;
  initialData?: Project;
};

const defaultValues = {
    title: '',
    description: '',
    imageUrl: '',
    link: '',
    introduction: '',
    technologies: '',
    features: '',
    reportUrl: '',
};

export function ProjectForm({ isOpen, onOpenChange, onSubmit, initialData }: ProjectFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
        ...initialData,
        technologies: initialData.technologies.join(', '),
        features: initialData.features.join(', '),
    } : defaultValues,
  });

  useEffect(() => {
    if (isOpen) {
        form.reset(initialData ? {
            ...initialData,
            technologies: initialData.technologies.join(', '),
            features: initialData.features.join(', '),
        } : defaultValues);
    }
  }, [initialData, form, isOpen]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const processedValues = {
        ...values,
        technologies: values.technologies.split(',').map(item => item.trim()),
        features: values.features.split(',').map(item => item.trim()),
    };
    if (initialData) {
      onSubmit({ ...initialData, ...processedValues });
    } else {
      onSubmit(processedValues);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit' : 'Add'} Project</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
             <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem><FormLabel>Short Description (for card)</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
            )} />
             <FormField control={form.control} name="imageUrl" render={({ field: { onChange, value } }) => (
                <FormItem>
                    <FormLabel>Project Image</FormLabel>
                    <FormControl><FileUpload value={value} onChange={onChange} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="link" render={({ field }) => (
                <FormItem><FormLabel>Live Project Link</FormLabel><FormControl><Input placeholder="https://example.com" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="introduction" render={({ field }) => (
                <FormItem><FormLabel>Introduction (for modal)</FormLabel><FormControl><Textarea rows={4} {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="technologies" render={({ field }) => (
                <FormItem>
                    <FormLabel>Technologies Used</FormLabel>
                    <FormControl><Input placeholder="Next.js, TypeScript, Tailwind CSS" {...field} /></FormControl>
                    <p className="text-xs text-muted-foreground">Separate with commas.</p>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="features" render={({ field }) => (
                <FormItem>
                    <FormLabel>Key Features</FormLabel>
                    <FormControl><Input placeholder="User Auth, Shopping Cart, Checkout" {...field} /></FormControl>
                     <p className="text-xs text-muted-foreground">Separate with commas.</p>
                    <FormMessage />
                </FormItem>
            )} />
             <FormField control={form.control} name="reportUrl" render={({ field: { onChange, value } }) => (
                <FormItem>
                    <FormLabel>Project Report (Optional)</FormLabel>
                    <FormControl><FileUpload value={value || ''} onChange={onChange} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
