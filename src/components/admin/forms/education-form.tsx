
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Education } from '@/lib/types';
import { useEffect } from 'react';

const formSchema = z.object({
  school: z.string().optional(),
  degree: z.string().optional(),
  period: z.string().optional(),
});

type EducationFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (values: Omit<Education, 'id'> | Education) => void;
  initialData?: Education;
};

export function EducationForm({ isOpen, onOpenChange, onSubmit, initialData }: EducationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { school: '', degree: '', period: '' },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(initialData || { school: '', degree: '', period: '' });
    }
  }, [initialData, form, isOpen]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const finalValues = {
        school: values.school || '',
        degree: values.degree || '',
        period: values.period || '',
    };
    if (initialData) {
      onSubmit({ ...initialData, ...finalValues });
    } else {
      onSubmit(finalValues);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit' : 'Add'} Education Entry</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField control={form.control} name="school" render={({ field }) => (
              <FormItem><FormLabel>School</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="degree" render={({ field }) => (
              <FormItem><FormLabel>Degree</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="period" render={({ field }) => (
              <FormItem><FormLabel>Period</FormLabel><FormControl><Input placeholder="e.g., 2019 - 2023" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
