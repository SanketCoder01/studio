
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UploadCloud, File as FileIcon, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { ImageCropperModal } from './image-cropper-modal';
import { Progress } from '@/components/ui/progress';

type FileUploadProps = {
  value: string;
  onChange: (url: string) => void;
  uploadKey: string;
};

type UploadStatus = 'idle' | 'uploading' | 'cropping' | 'error';

const IMAGE_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const OTHER_FILE_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // DOCX
];
const ALLOWED_FILE_TYPES = [...IMAGE_FILE_TYPES, ...OTHER_FILE_TYPES];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function FileUpload({ value, onChange }: FileUploadProps) {
  const { toast } = useToast();
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [cropperSrc, setCropperSrc] = useState<string | null>(null);

  const isUploading = status === 'uploading';

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

    const needsCropping = IMAGE_FILE_TYPES.includes(file.type);
    
    setStatus('uploading');
    setProgress(0);

    const reader = new FileReader();

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setProgress(percent);
      }
    };

    reader.onload = () => {
      const dataUri = reader.result as string;
      setProgress(100);
      if (needsCropping) {
        setStatus('cropping');
        setCropperSrc(dataUri);
      } else {
        onChange(dataUri);
        setStatus('idle');
        toast({ title: 'File Ready!', description: 'The file has been prepared for saving.' });
      }
    };

    reader.onerror = (error) => {
      console.error('FileReader error:', error);
      setStatus('error');
      toast({ variant: 'destructive', title: 'Upload Failed', description: 'Failed to read the file.' });
    };
    
    reader.readAsDataURL(file);
    // Reset file input
    event.target.value = '';
  };

  const handleCropComplete = (croppedDataUri: string) => {
    onChange(croppedDataUri);
    setCropperSrc(null);
    setStatus('idle');
    toast({ title: "Image Cropped!", description: "The image has been prepared for saving." });
  };
  
  const handleCropClose = () => {
      setCropperSrc(null);
      setStatus('idle');
  }

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onChange('');
    setStatus('idle');
    setProgress(0);
  };

  if (value) {
    const isImage = value.startsWith('data:image');
    const isPdf = value.startsWith('data:application/pdf');
    const isDoc = value.startsWith('data:application/vnd.openxmlformats-officedocument.wordprocessingml.document');

    return (
      <div className="relative flex items-center p-2 mt-2 border rounded-md bg-muted/50">
        <FileIcon className="w-10 h-10 text-muted-foreground" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-primary hover:underline truncate"
        >
          {isImage ? 'View Image' : isPdf ? 'View PDF' : isDoc ? 'View Document' : 'View File'}
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
      <ImageCropperModal
        src={cropperSrc}
        onClose={handleCropClose}
        onComplete={handleCropComplete}
      />
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
                <span className="font-semibold">Uploading: {progress}%</span>
              </p>
              <Progress value={progress} className="w-3/4 h-2" />
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
          disabled={isUploading}
        />
      </label>
    </div>
  );
}

