
'use client';
import { useState, useEffect, useCallback } from 'react';
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
  console.log("Seeding data to in-memory state...");
  setData(initialData, true);
  console.log("Data seeded successfully!");
}

async function fetchPortfolioData(force = false) {
    if (isFetching || (hasFetched && !force)) return;
    isFetching = true;
    broadcastChanges();
    
    // Simulate fetching, or use initial data if nothing is in memory yet
    setTimeout(() => {
        if (!memoryState) {
            console.log("Using initial data for portfolio.");
            setData(initialData, true);
        } else {
             console.log("Using existing in-memory data.");
             setData(memoryState, true);
        }
        console.log("Data loaded successfully.");
    }, 500);
}


export const usePortfolioData = () => {
  const [state, setState] = useState({ data: memoryState, loading: !hasFetched || isFetching });

  useEffect(() => {
    const listener = () => {
      setState({ data: memoryState, loading: !hasFetched || isFetching });
    };

    listeners.add(listener);
    
    if (!hasFetched) {
      fetchPortfolioData();
    } else {
      listener(); // Immediately update state on mount if data is already fetched
    }

    return () => {
      listeners.delete(listener);
    };
  }, []);

  const crudFunction = useCallback(<T extends { id?: string }>(collectionName: keyof PortfolioData) => {
    
    const addItem = async (newItem: Omit<T, 'id'>) => {
        const itemWithId = { ...newItem, id: new Date().toISOString() } as T; // Use timestamp for unique ID
        if (memoryState) {
          const currentItems = (memoryState[collectionName] || []) as T[];
          let newItems;
           if (collectionName === 'contacts') {
             newItems = [itemWithId, ...currentItems]; // Add new contacts to the top
           } else {
             newItems = [...currentItems, itemWithId]; // Add other items to the bottom
           }
          setData({ ...memoryState, [collectionName]: newItems });
        }
        return itemWithId;
    };

    const updateItem = async (updatedItem: T) => {
      if (!updatedItem.id) return;
      if(memoryState) {
        const newItems = ((memoryState[collectionName] || []) as T[]).map(item => item.id === updatedItem.id ? updatedItem : item);
        setData({ ...memoryState, [collectionName]: newItems });
      }
    };

    const deleteItem = async (id: string) => {
       if (!id) return;
       if(memoryState) {
         const newItems = ((memoryState[collectionName] || []) as T[]).filter(item => item.id !== id);
         setData({ ...memoryState, [collectionName]: newItems });
       }
    };

    return { addItem, updateItem, deleteItem };
  }, []);

  const updateProfile = useCallback(async (newProfile: Profile) => {
    if (!memoryState) {
        // Handle case where memoryState is null, perhaps initialize it
        const initialState = { ...initialData, profile: newProfile };
        setData(initialState);
        return;
    }
    setData({ ...memoryState, profile: newProfile });
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
