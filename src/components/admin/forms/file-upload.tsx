
'use client';

import { useState } from 'react';
import { useStorage } from '@/hooks/use-storage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { UploadCloud, File as FileIcon, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type FileUploadProps = {
  value: string;
  onChange: (url: string) => void;
  folder: string;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
  'image/jpeg', 'image/png', 'image/webp',
  'application/pdf', 
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // DOCX
];

export function FileUpload({ value, onChange, folder }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const { uploadFile } = useStorage();
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // File validation
      if (file.size > MAX_FILE_SIZE) {
        toast({ variant: "destructive", title: "File too large", description: "Please upload a file smaller than 10MB." });
        return;
      }
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        toast({ variant: "destructive", title: "Invalid file type", description: "Please upload a JPG, PNG, PDF, or DOCX file." });
        return;
      }

      try {
        const downloadURL = await uploadFile(file, folder, {
          onProgress: setProgress,
          onUploading: setIsUploading
        });
        onChange(downloadURL);
      } catch (err) {
        // Error toast is handled inside useStorage hook
        console.error("Upload process failed", err);
      } finally {
        setProgress(0); // Reset progress after success or failure
      }
    }
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
          {decodeURIComponent(value.split('%2F').pop()?.split('?')[0] || 'View File')}
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
          isUploading && 'cursor-wait opacity-70'
        )}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {isUploading ? (
            <>
              <Loader2 className="w-10 h-10 mb-3 text-muted-foreground animate-spin" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Uploading: {Math.round(progress)}%</span>
              </p>
            </>
          ) : (
            <>
              <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">Image, PDF, DOCX (MAX. 10MB)</p>
            </>
          )}
        </div>
        <Input
          type="file"
          accept={ALLOWED_FILE_TYPES.join(',')}
          className="absolute inset-0 w-full h-full opacity-0"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </label>
      {isUploading && (
        <div className="w-full mt-2">
          <Progress value={progress} className="h-2" />
        </div>
      )}
    </div>
  );
}
