
'use client';

import { useState, useCallback } from 'react';
import { useStorage } from '@/hooks/use-storage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { UploadCloud, File as FileIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type FileUploadProps = {
  value: string;
  onChange: (url: string) => void;
  folder: string;
};

export function FileUpload({ value, onChange, folder }: FileUploadProps) {
  const { uploadFile, isUploading, progress } = useStorage();
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = event.target.files?.[0];
    if (file) {
      try {
        const downloadURL = await uploadFile(file, folder);
        onChange(downloadURL); 
      } catch (err) {
        setError('File upload failed. Please try again.');
        toast({
          variant: "destructive",
          title: "Upload Failed",
          description: "There was an error during the upload process.",
        });
        console.error(err);
      }
    }
  }, [folder, onChange, toast, uploadFile]);

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
          isUploading && 'cursor-wait'
        )}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
          <p className="mb-2 text-sm text-muted-foreground">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">JPG, PNG, PDF (MAX. 10MB)</p>
        </div>
        <Input
          type="file"
          accept="image/jpeg,image/png,application/pdf"
          className="absolute inset-0 w-full h-full opacity-0"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </label>
      {isUploading && (
        <div className="w-full mt-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-center text-muted-foreground">{Math.round(progress)}%</p>
        </div>
      )}
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
}
