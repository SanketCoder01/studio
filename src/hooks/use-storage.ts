
'use client';

import { useState } from 'react';
import { initializeDb } from '@/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from 'firebase/storage';
import { useToast } from './use-toast';

export const useStorage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const uploadFile = (file: File, folder: string = 'uploads'): Promise<string> => {
    return new Promise((resolve, reject) => {
      const db = initializeDb();
      if (!db) {
        const error = 'Firebase is not initialized.';
        console.error(error);
        toast({
          variant: "destructive",
          title: "Upload Failed",
          description: error,
        });
        reject(error);
        return;
      }
      
      const storage = getStorage();

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
          const currentProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(currentProgress);
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
