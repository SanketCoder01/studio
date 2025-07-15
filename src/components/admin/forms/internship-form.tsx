
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Internship } from '@/lib/types';
import { useEffect } from 'react';
import { FileUpload } from './file-upload';
import { MultiImageUpload } from './multi-image-upload';

const formSchema = z.object({
  company: z.string().min(1, 'Company name is required.'),
  role: z.string().min(1, 'Role is required.'),
  startDate: z.string().min(1, 'Start date is required.'),
  endDate: z.string().min(1, 'End date is required.'),
  location: z.string().min(1, 'Location is required.'),
  description: z.string().min(1, 'Description is required.'),
  memories: z.string().min(1, 'Memories are required.'),
  images: z.array(z.string()).min(1, 'Please upload at least one image.'),
  certificateUrl: z.string().optional(),
  reportUrl: z.string().optional(),
});

type InternshipFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (values: Omit<Internship, 'id'> | Internship) => void;
  initialData?: Internship;
};

const defaultValues = { 
    company: '', 
    role: '', 
    startDate: '',
    endDate: '',
    location: '',
    description: '',
    memories: '',
    images: [],
    certificateUrl: '',
    reportUrl: ''
};

export function InternshipForm({ isOpen, onOpenChange, onSubmit, initialData }: InternshipFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || defaultValues,
  });

   useEffect(() => {
     if (isOpen) {
        form.reset(initialData || defaultValues);
     }
  }, [initialData, form, isOpen]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (initialData) {
      onSubmit({ ...initialData, ...values });
    } else {
      onSubmit(values);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit' : 'Add'} Internship</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField control={form.control} name="company" render={({ field }) => (
                <FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="role" render={({ field }) => (
                <FormItem><FormLabel>Role</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="startDate" render={({ field }) => (
                  <FormItem><FormLabel>Start Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="endDate" render={({ field }) => (
                  <FormItem><FormLabel>End Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
             <FormField control={form.control} name="location" render={({ field }) => (
                <FormItem><FormLabel>Location</FormLabel><FormControl><Input placeholder="e.g., Remote or City, Country" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem><FormLabel>Work Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
            )} />
             <FormField control={form.control} name="memories" render={({ field }) => (
                <FormItem><FormLabel>Memories & Learnings</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
            )} />
             <FormField control={form.control} name="images" render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>Image Gallery</FormLabel>
                  <FormControl>
                    <MultiImageUpload key={(initialData?.id || 'new') + '-gallery'} value={value} onChange={onChange} folder="internships/gallery" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
             <FormField control={form.control} name="reportUrl" render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>Internship Report (Optional, PDF/DOCX)</FormLabel>
                  <FormControl>
                    <FileUpload key={(initialData?.id || 'new') + '-report'} value={value || ''} onChange={onChange} folder="internships/reports" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
             <FormField control={form.control} name="certificateUrl" render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>Internship Certificate (Optional)</FormLabel>
                  <FormControl>
                    <FileUpload key={(initialData?.id || 'new') + '-cert'} value={value || ''} onChange={onChange} folder="internships/certs" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
