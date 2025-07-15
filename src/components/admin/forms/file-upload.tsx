
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { UploadCloud, File as FileIcon, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type FileUploadProps = {
  value: string;
  onChange: (url: string) => void;
  folder: string; // Kept for keying purposes, but no longer used for upload path
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB - a reasonable limit for Data URIs
const ALLOWED_FILE_TYPES = [
  'image/jpeg', 'image/png', 'image/webp', 'image/gif',
  'application/pdf', 
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // DOCX
];


export function FileUpload({ value, onChange, folder }: FileUploadProps) {
  const [isConverting, setIsConverting] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast({ variant: "destructive", title: "File too large", description: "Please upload a file smaller than 5MB." });
      return;
    }
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast({ variant: "destructive", title: "Invalid file type", description: "Please upload a JPG, PNG, PDF, or DOCX file." });
      return;
    }

    setIsConverting(true);
    const reader = new FileReader();
    reader.onload = () => {
      const dataUri = reader.result as string;
      onChange(dataUri);
      setIsConverting(false);
      toast({ title: "File Ready!", description: "The file has been prepared for saving." });
    };
    reader.onerror = (error) => {
      console.error("Error converting file to Data URI:", error);
      toast({ variant: "destructive", title: "Conversion Failed", description: "Could not process the file." });
      setIsConverting(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onChange('');
  };

  if (value) {
    return (
      <div className="relative flex items-center p-2 mt-2 border rounded-md bg-muted/50">
        <FileIcon className="w-10 h-10 text-muted-foreground" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-primary hover:underline truncate"
        >
         { value.startsWith('data:application/pdf') ? 'View PDF' : 
            value.startsWith('data:application') ? 'View Document' : 'View Image'
          }
        </a>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="ml-auto text-destructive hover:text-destructive"
          onClick={handleRemove}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div>
      <label
        className={cn(
          'relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/80 transition-colors',
          isConverting && 'cursor-wait opacity-70'
        )}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {isConverting ? (
            <>
              <Loader2 className="w-10 h-10 mb-3 text-muted-foreground animate-spin" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Processing...</span>
              </p>
            </>
          ) : (
            <>
              <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">Image, PDF, DOCX (MAX. 5MB)</p>
            </>
          )}
        </div>
        <Input
          type="file"
          accept={ALLOWED_FILE_TYPES.join(',')}
          className="absolute inset-0 w-full h-full opacity-0"
          onChange={handleFileChange}
          disabled={isConverting}
        />
      </label>
    </div>
  );
}
