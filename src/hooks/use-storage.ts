
'use client';

import { useState } from 'react';
import { storage } from '@/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useToast } from './use-toast';

export const useStorage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const uploadFile = (file: File, folder: string = 'uploads'): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject('No file provided.');
        return;
      }

      setIsUploading(true);
      setProgress(0);

      const storageRef = ref(storage, `${folder}/${Date.now()}-${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.error("Upload failed:", error);
          setIsUploading(false);
          toast({
            variant: "destructive",
            title: "Upload Failed",
            description: "There was an error uploading your file. Please try again.",
          });
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setIsUploading(false);
            toast({
              title: "Upload Successful",
              description: "Your file has been uploaded.",
            });
            resolve(downloadURL);
          } catch (error) {
            console.error("Failed to get download URL:", error);
            setIsUploading(false);
             toast({
              variant: "destructive",
              title: "Upload Failed",
              description: "Could not get the file URL after upload.",
            });
            reject(error);
          }
        }
      );
    });
  };

  return { uploadFile, isUploading, progress };
};
