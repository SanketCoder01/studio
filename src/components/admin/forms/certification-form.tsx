
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Certification } from '@/lib/types';
import { useEffect } from 'react';
import { FileUpload } from './file-upload';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  issuer: z.string().min(1, 'Issuer is required.'),
  date: z.string().min(1, 'Date is required.'),
  imageUrl: z.string().min(1, 'Please upload a certificate image.'),
});

type CertificationFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (values: Omit<Certification, 'id'> | Certification) => void;
  initialData?: Certification;
};

const defaultValues = { name: '', issuer: '', date: '', imageUrl: '' };

export function CertificationForm({ isOpen, onOpenChange, onSubmit, initialData }: CertificationFormProps) {
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit' : 'Add'} Certification</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="issuer" render={({ field }) => (
              <FormItem><FormLabel>Issuer</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="date" render={({ field }) => (
              <FormItem><FormLabel>Date</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="imageUrl" render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>Certificate Image</FormLabel>
                  <FormControl>
                    <FileUpload value={value} onChange={onChange} />
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
