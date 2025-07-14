
'use client';
import { useState, useEffect, useCallback } from 'react';
import { db, storage, initializeDb } from '@/lib/firebase';
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
  orderBy,
  query
} from 'firebase/firestore';
import type { PortfolioData, Profile, Education, Internship, Project, Certification, Contact } from '@/lib/types';
import { portfolioData as initialData } from '@/lib/data';

// This is our in-memory "database"
let memoryState: PortfolioData | null = null;
let hasFetched = false;
let isFetching = false;

// Listeners to notify components of changes
const listeners: Set<() => void> = new Set();

const broadcastChanges = () => {
  listeners.forEach((listener) => listener());
};

const setData = (newData: PortfolioData | null, fromServer = false) => {
  memoryState = newData;
  if (fromServer) {
    hasFetched = true;
    isFetching = false;
  }
  broadcastChanges();
};

async function seedData() {
  const db = initializeDb();
  if (!db) return;
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
  fetchPortfolioData(true);
}

async function fetchPortfolioData(force = false) {
    if (isFetching || (hasFetched && !force)) return;
    isFetching = true;
    broadcastChanges();

    const db = initializeDb();
    if (!db) {
        isFetching = false;
        broadcastChanges();
        return;
    }

    try {
        console.log("Fetching data from Firestore...");
        const profileDoc = await getDoc(doc(db, "portfolio", "profile"));
        
        if (!profileDoc.exists()) {
             console.log("No profile found. Data might need to be seeded.");
             setData(null, true);
             return;
        }

        const collectionsToFetch = ['education', 'internships', 'projects', 'certifications', 'contacts'];
        const collectionPromises = collectionsToFetch.map(c => {
          if (c === 'contacts') {
            return getDocs(query(collection(db, c), orderBy('received', 'desc')));
          }
          return getDocs(collection(db, c));
        });
        
        const [educationSnapshot, internshipsSnapshot, projectsSnapshot, certificationsSnapshot, contactsSnapshot] = await Promise.all(collectionPromises);

        const fetchedData: PortfolioData = {
            profile: profileDoc.data() as Profile,
            education: educationSnapshot.docs.map(d => ({...d.data(), id: d.id } as Education)),
            internships: internshipsSnapshot.docs.map(d => ({...d.data(), id: d.id } as Internship)),
            projects: projectsSnapshot.docs.map(d => ({...d.data(), id: d.id } as Project)),
            certifications: certificationsSnapshot.docs.map(d => ({...d.data(), id: d.id } as Certification)),
            contacts: contactsSnapshot.docs.map(d => ({...d.data(), id: d.id } as Contact)),
        };

        setData(fetchedData, true);
        console.log("Data fetched successfully.");
    } catch (error) {
        console.error("Error fetching portfolio data:", error);
        setData(null, true);
    }
}


export const usePortfolioData = () => {
  const [state, setState] = useState({ data: memoryState, loading: !hasFetched || isFetching });

  useEffect(() => {
    const listener = () => {
      setState({ data: memoryState, loading: !hasFetched || isFetching });
    };
    listeners.add(listener);

    if (!hasFetched && !isFetching) {
        fetchPortfolioData();
    }
    
    listener();

    return () => {
      listeners.delete(listener);
    };
  }, []);

  const crudFunction = <T extends { id?: string }>(collectionName: string) => {
    const db = initializeDb();
    if (!db) {
        const noOp = async () => { console.error("Firebase not initialized"); };
        return { addItem: noOp, updateItem: noOp, deleteItem: noOp };
    }
    
    const addItem = async (newItem: Omit<T, 'id'>) => {
        const docRef = await addDoc(collection(db, collectionName), newItem);
        const itemWithId = { ...newItem, id: docRef.id } as T;
        if (memoryState) {
          const currentItems = (memoryState[collectionName as keyof PortfolioData] || []) as T[];
          const newItems = [itemWithId, ...currentItems]; // Add to the top
          setData({ ...memoryState, [collectionName]: newItems });
        }
        return itemWithId;
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

  const updateProfile = useCallback(async (newProfile: Profile) => {
    const db = initializeDb();
    if (!db || !memoryState) return;
    const oldProfile = memoryState.profile;
    setData({ ...memoryState, profile: newProfile }); // Optimistic update
    try {
      await setDoc(doc(db, "portfolio", "profile"), newProfile);
    } catch (error) {
      console.error("Failed to update profile:", error);
      setData({ ...memoryState, profile: oldProfile }); // Revert
    }
  }, []);

  return {
    ...state,
    seedData,
    updateProfile,
    education: crudFunction<Education>('education'),
    internships: crudFunction<Internship>('internships'),
    projects: crudFunction<Project>('projects'),
    certifications: crudFunction<Certification>('certifications'),
    contacts: crudFunction<Contact>('contacts'),
  };
};
