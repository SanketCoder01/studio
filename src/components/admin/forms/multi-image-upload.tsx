
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UploadCloud, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

type MultiImageUploadProps = {
  value: string[];
  onChange: (urls: string[]) => void;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const IMAGE_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export function MultiImageUpload({ value, onChange }: MultiImageUploadProps) {
  const [isConverting, setIsConverting] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast({ variant: "destructive", title: "File too large", description: "Please upload files smaller than 5MB." });
      return;
    }
    if (!IMAGE_FILE_TYPES.includes(file.type)) {
      toast({ variant: "destructive", title: "Invalid file type", description: "Please upload an image file." });
      return;
    }

    const reader = new FileReader();
    reader.onloadstart = () => setIsConverting(true);
    reader.onload = () => {
      const dataUri = reader.result as string;
       onChange([...value, dataUri]);
       toast({ title: "Image Added!", description: "The image has been added to the gallery." });
       setIsConverting(false);
    };
    reader.onerror = (error) => {
      console.error("Error converting file to Data URI:", error);
      toast({ variant: "destructive", title: "Conversion Failed", description: "Could not process the file." });
      setIsConverting(false);
    };
    reader.readAsDataURL(file);
    // Reset the input so the same file can be re-uploaded
    event.target.value = '';
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="mb-2 grid grid-cols-3 gap-2">
        {value.map((url, index) => (
          <div key={index} className="relative group">
            <Image src={url} alt={`Uploaded image ${index + 1}`} width={100} height={100} className="rounded-md object-cover w-full aspect-square" unoptimized />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemove(index)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
      <label
        className={cn(
          'relative flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/80 transition-colors',
          isConverting && 'cursor-wait opacity-70'
        )}
      >
        <div className="flex flex-col items-center justify-center">
          {isConverting ? (
            <>
              <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
              <p className="text-sm text-muted-foreground">Processing...</p>
            </>
          ) : (
            <>
              <UploadCloud className="w-8 h-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Add Image</p>
            </>
          )}
        </div>
        <Input
          type="file"
          accept={IMAGE_FILE_TYPES.join(',')}
          className="absolute inset-0 w-full h-full opacity-0"
          onChange={handleFileChange}
          disabled={isConverting}
        />
      </label>
    </div>
  );
}
