
'use client';
import type { Internship } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, FileDown, Briefcase, Calendar, MapPin, Sparkles, BookOpen } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { format } from 'date-fns';

type InternshipDetailsModalProps = {
  internship: Internship | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function InternshipDetailsModal({ internship, isOpen, onOpenChange }: InternshipDetailsModalProps) {
  if (!internship) return null;

   const formatDateRange = (start: string, end: string) => {
    try {
      const startDate = format(new Date(start), 'd MMMM yyyy');
      const endDate = format(new Date(end), 'd MMMM yyyy');
      return `${startDate} - ${endDate}`;
    } catch {
      return `${start} - ${end}`
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
           <div className="p-6 pt-0">
             <DialogTitle className="font-headline text-3xl text-primary">{internship.role}</DialogTitle>
             <DialogDescription className="text-lg text-muted-foreground flex items-center gap-2 mt-1">
                <Briefcase className="h-5 w-5"/> {internship.company}
            </DialogDescription>
           </div>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 pb-6">
          <div className="md:col-span-2 space-y-6">
             <div>
                <h3 className="font-semibold text-xl mb-3 border-b pb-2 flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary"/> Work Description</h3>
                <p className="text-muted-foreground leading-relaxed">{internship.description}</p>
             </div>
             <div>
                <h3 className="font-semibold text-xl mb-3 border-b pb-2 flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary"/> Memories & Learnings</h3>
                <p className="text-muted-foreground leading-relaxed">{internship.memories}</p>
             </div>
              {internship.images && internship.images.length > 0 && (
                <div>
                    <h3 className="font-semibold text-xl mb-3 border-b pb-2">Image Gallery</h3>
                    <Carousel className="w-full">
                        <CarouselContent>
                            {internship.images.map((image, index) => (
                                <CarouselItem key={index}>
                                    <div className="relative h-64 w-full rounded-lg overflow-hidden">
                                    <Image src={image} alt={`Internship memory ${index + 1}`} layout="fill" objectFit="cover" data-ai-hint="teamwork office" unoptimized />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                         <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
                        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
                    </Carousel>
                </div>
            )}
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-muted-foreground"><Calendar className="h-4 w-4 text-primary"/> <span>{formatDateRange(internship.startDate, internship.endDate)}</span></div>
                <div className="flex items-center gap-3 text-muted-foreground"><MapPin className="h-4 w-4 text-primary"/> <span>{internship.location}</span></div>
              </div>
            </div>
            <div className="space-y-2">
                 {internship.certificateUrl && (
                    <Button variant="outline" asChild className="w-full">
                      <a href={internship.certificateUrl} download target="_blank" rel="noopener noreferrer">
                        View Certificate <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {internship.reportUrl && (
                    <Button variant="outline" asChild className="w-full">
                      <a href={internship.reportUrl} download target="_blank" rel="noopener noreferrer">
                        Download Report <FileDown className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
