
'use client';

import { useCallback } from 'react';
import { initializeDb } from '@/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from 'firebase/storage';
import { useToast } from './use-toast';

type UploadCallbacks = {
  onProgress: (progress: number) => void;
  onUploading: (uploading: boolean) => void;
};

export const useStorage = () => {
  const { toast } = useToast();

  const uploadFile = useCallback((
    file: File, 
    folder: string,
    callbacks: UploadCallbacks
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const db = initializeDb();
      if (!db) {
         const error = 'Firebase is not initialized.';
         console.error(error);
         toast({ variant: "destructive", title: "Upload Failed", description: error });
         callbacks.onUploading(false);
         return reject(new Error(error));
      }
      const storage = getStorage();
      
      if (!file) {
        callbacks.onUploading(false);
        return reject(new Error('No file provided.'));
      }

      callbacks.onUploading(true);
      const storageRef = ref(storage, `${folder}/${Date.now()}-${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const currentProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          callbacks.onProgress(currentProgress);
        },
        (error) => {
          console.error("Upload failed:", error);
           switch (error.code) {
            case 'storage/unauthorized':
              toast({ variant: 'destructive', title: 'Permission Denied', description: 'Check your Firebase Storage security rules.' });
              break;
            case 'storage/canceled':
              // Don't show a toast on cancel, it's usually intentional.
              break;
            default:
              toast({ variant: "destructive", title: "Upload Failed", description: "An unknown error occurred during upload." });
              break;
          }
          callbacks.onUploading(false);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            toast({ title: "Upload Successful", description: "Your file has been uploaded." });
            callbacks.onUploading(false);
            resolve(downloadURL);
          } catch (error) {
            console.error("Failed to get download URL:", error);
             toast({ variant: "destructive", title: "Upload Failed", description: "Could not get the file URL after upload." });
            callbacks.onUploading(false);
            reject(error);
          }
        }
      );
    });
  }, [toast]);

  return { uploadFile };
};
