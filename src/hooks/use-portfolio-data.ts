import { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  documentId,
  query,
  where
} from 'firebase/firestore';
import type { PortfolioData, Profile, Education, Internship, Project, Certification } from '@/lib/types';
import { portfolioData as initialData } from '@/lib/data';

// This is our in-memory "database"
let memoryState: PortfolioData | null = null;
let hasFetched = false;

// Listeners to notify components of changes
const listeners: Set<() => void> = new Set();

const broadcastChanges = () => {
  listeners.forEach((listener) => listener());
};

const setData = (newData: PortfolioData | null, fromServer = false) => {
  memoryState = newData;
  if (fromServer) hasFetched = true;
  broadcastChanges();
};

async function seedData() {
  console.log("Seeding data to Firestore...");
  const batch = writeBatch(db);

  // Seed profile
  const profileRef = doc(db, "portfolio", "profile");
  batch.set(profileRef, initialData.profile);

  // Seed other collections
  for (const key in initialData) {
    if (key !== 'profile' && Array.isArray(initialData[key as keyof PortfolioData])) {
      const collectionName = key;
      const items = initialData[key as keyof PortfolioData] as any[];
      items.forEach((item) => {
        const docRef = doc(collection(db, collectionName), item.id);
        batch.set(docRef, item);
      });
    }
  }

  await batch.commit();
  console.log("Data seeded successfully!");
  // Refetch data after seeding
  fetchPortfolioData();
}

async function fetchPortfolioData() {
    try {
        console.log("Fetching data from Firestore...");
        const profileDoc = await getDoc(doc(db, "portfolio", "profile"));
        
        if (!profileDoc.exists()) {
             console.log("No profile found. Data might need to be seeded.");
             setData(null, true);
             return;
        }

        const collectionsToFetch = ['education', 'internships', 'projects', 'certifications'];
        const collectionPromises = collectionsToFetch.map(c => getDocs(collection(db, c)));
        
        const [educationSnapshot, internshipsSnapshot, projectsSnapshot, certificationsSnapshot] = await Promise.all(collectionPromises);

        const fetchedData: PortfolioData = {
            profile: profileDoc.data() as Profile,
            education: educationSnapshot.docs.map(d => ({...d.data(), id: d.id } as Education)),
            internships: internshipsSnapshot.docs.map(d => ({...d.data(), id: d.id } as Internship)),
            projects: projectsSnapshot.docs.map(d => ({...d.data(), id: d.id } as Project)),
            certifications: certificationsSnapshot.docs.map(d => ({...d.data(), id: d.id } as Certification)),
        };

        setData(fetchedData, true);
        console.log("Data fetched successfully.");
    } catch (error) {
        console.error("Error fetching portfolio data:", error);
        setData(null, true);
    }
}


export const usePortfolioData = () => {
  const [data, setDataState] = useState<{data: PortfolioData | null; loading: boolean}>({ data: memoryState, loading: !hasFetched });

  useEffect(() => {
    const listener = () => {
      setDataState({ data: memoryState, loading: !hasFetched });
    };
    listeners.add(listener);

    if (!hasFetched) {
        fetchPortfolioData();
    }
    
    // Initial sync
    listener();

    return () => {
      listeners.delete(listener);
    };
  }, []);

  const updateProfile = useCallback(async (newProfile: Profile) => {
    if (!memoryState) return;
    const oldProfile = memoryState.profile;
    setData({ ...memoryState, profile: newProfile }); // Optimistic update
    try {
      await setDoc(doc(db, "portfolio", "profile"), newProfile);
    } catch (error) {
      console.error("Failed to update profile:", error);
      setData({ ...memoryState, profile: oldProfile }); // Revert
    }
  }, []);

  const crudFunction = <T extends { id?: string }>(collectionName: string) => {
    
    const addItem = async (newItem: Omit<T, 'id'>) => {
      try {
        const docRef = await addDoc(collection(db, collectionName), newItem);
        const itemWithId = { ...newItem, id: docRef.id } as T;
        if (memoryState) {
          const currentItems = (memoryState[collectionName as keyof PortfolioData] || []) as T[];
          setData({ ...memoryState, [collectionName]: [...currentItems, itemWithId] });
        }
      } catch (error) {
        console.error(`Failed to add item to ${collectionName}:`, error);
        // Optionally revert UI changes or show an error
      }
    };

    const updateItem = async (updatedItem: T) => {
      if (!updatedItem.id) return;
      const { id, ...itemData } = updatedItem;
      const docRef = doc(db, collectionName, id);
      
      let oldItems: T[] = [];
      if(memoryState) {
        oldItems = [...(memoryState[collectionName as keyof PortfolioData] || [])] as T[];
        const newItems = oldItems.map(item => item.id === id ? updatedItem : item);
        setData({ ...memoryState, [collectionName]: newItems }); // Optimistic update
      }

      try {
        await updateDoc(docRef, itemData);
      } catch (error) {
         console.error(`Failed to update item in ${collectionName}:`, error);
         if(memoryState) setData({ ...memoryState, [collectionName]: oldItems }); // Revert
      }
    };

    const deleteItem = async (id: string) => {
       if (!id) return;
       let oldItems: T[] = [];
       if(memoryState) {
         oldItems = [...(memoryState[collectionName as keyof PortfolioData] || [])] as T[];
         const newItems = oldItems.filter(item => item.id !== id);
         setData({ ...memoryState, [collectionName]: newItems }); // Optimistic update
       }

       try {
         await deleteDoc(doc(db, collectionName, id));
       } catch (error) {
          console.error(`Failed to delete item from ${collectionName}:`, error);
          if(memoryState) setData({ ...memoryState, [collectionName]: oldItems }); // Revert
       }
    };

    return { addItem, updateItem, deleteItem };
  };

  return {
    ...data,
    updateProfile,
    seedData,
    education: crudFunction<Education>('education'),
    internships: crudFunction<Internship>('internships'),
    projects: crudFunction<Project>('projects'),
    certifications: crudFunction<Certification>('certifications'),
  };
};