
'use client';
import type { Certification } from '@/lib/types';
import { Dialog, DialogContent, DialogClose, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Button } from './ui/button';

type CertificateViewerModalProps = {
  certificate: Certification | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function CertificateViewerModal({ certificate, isOpen, onOpenChange }: CertificateViewerModalProps) {
  if (!certificate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 border-0 bg-transparent shadow-none w-full max-w-5xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{certificate.name}</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-video w-full h-full">
          <Image
            src={certificate.imageUrl}
            alt={certificate.name}
            layout="fill"
            objectFit="contain"
            data-ai-hint="certificate document"
            unoptimized
          />
        </div>
        <DialogClose asChild>
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 rounded-full bg-black/50 hover:bg-black/80 text-white hover:text-white">
                <X className="h-6 w-6" />
            </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
