import { useState, useEffect, useCallback } from 'react';
import { portfolioData as initialData } from '@/lib/data';
import type { PortfolioData, Profile, Education, Internship, Project, Certification } from '@/lib/types';

// This is our in-memory "database"
let memoryState: PortfolioData = initialData;

// Listeners to notify components of changes
const listeners: Set<() => void> = new Set();

const broadcastChanges = () => {
  listeners.forEach((listener) => listener());
};

const setData = (newData: PortfolioData) => {
  memoryState = newData;
  broadcastChanges();
};

export const usePortfolioData = () => {
  const [data, setDataState] = useState(memoryState);

  useEffect(() => {
    const listener = () => {
      setDataState(memoryState);
    };
    listeners.add(listener);
    // Initial sync
    listener();
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const updateProfile = useCallback((newProfile: Profile) => {
    setData({ ...memoryState, profile: newProfile });
  }, []);

  const crudFunction = <T extends { id: string }>(key: keyof PortfolioData) => {
    
    const addItem = (newItem: Omit<T, 'id'>) => {
        const itemWithId = { ...newItem, id: `id-${Date.now()}` } as T;
        const currentItems = memoryState[key] as T[];
        setData({ ...memoryState, [key]: [...currentItems, itemWithId] });
    };

    const updateItem = (updatedItem: T) => {
        const currentItems = memoryState[key] as T[];
        const newItems = currentItems.map(item => item.id === updatedItem.id ? updatedItem : item);
        setData({ ...memoryState, [key]: newItems });
    };

    const deleteItem = (id: string) => {
        const currentItems = memoryState[key] as T[];
        const newItems = currentItems.filter(item => item.id !== id);
        setData({ ...memoryState, [key]: newItems });
    };

    return { addItem, updateItem, deleteItem };
  };

  return {
    data,
    updateProfile,
    education: crudFunction<Education>('education'),
    internships: crudFunction<Internship>('internships'),
    projects: crudFunction<Project>('projects'),
    certifications: crudFunction<Certification>('certifications'),
  };
};
