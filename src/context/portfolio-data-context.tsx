
'use client';
import { useState, useEffect, useCallback, createContext, ReactNode } from 'react';
import type { PortfolioData, Profile, Education, Internship, Project, Certification, Contact } from '@/lib/types';
import { portfolioData as initialData } from '@/lib/data';

type PortfolioContextType = {
  data: PortfolioData | null;
  loading: boolean;
  seedData: () => Promise<void>;
  updateProfile: (newProfile: Profile) => Promise<void>;
  education: {
    addItem: (item: Omit<Education, 'id'>) => Promise<Education>;
    updateItem: (item: Education) => Promise<void>;
    deleteItem: (id: string) => Promise<void>;
  };
  internships: {
    addItem: (item: Omit<Internship, 'id'>) => Promise<Internship>;
    updateItem: (item: Internship) => Promise<void>;
    deleteItem: (id: string) => Promise<void>;
  };
  projects: {
    addItem: (item: Omit<Project, 'id'>) => Promise<Project>;
    updateItem: (item: Project) => Promise<void>;
    deleteItem: (id: string) => Promise<void>;
  };
  ongoingProjects: {
    addItem: (item: Omit<Project, 'id'>) => Promise<Project>;
    updateItem: (item: Project) => Promise<void>;
    deleteItem: (id: string) => Promise<void>;
  };
  certifications: {
    addItem: (item: Omit<Certification, 'id'>) => Promise<Certification>;
    updateItem: (item: Certification) => Promise<void>;
    deleteItem: (id: string) => Promise<void>;
  };
  contacts: {
    addItem: (item: Omit<Contact, 'id'>) => Promise<Contact>;
    updateItem: (item: Contact) => Promise<void>;
    deleteItem: (id: string) => Promise<void>;
  };
};

export const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// A simple in-memory "store" to hold the data.
// This ensures that the data persists across page navigations within the client session.
let memoryStore: PortfolioData | null = null;

export function PortfolioDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData | null>(memoryStore);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize data only if it's not already in our memory store.
    // This prevents the data from being reset on every navigation.
    if (!memoryStore) {
      memoryStore = initialData;
      setData(initialData);
    }
    setLoading(false);
  }, []);

  const updateMemoryStore = (newData: PortfolioData | null | ((prevData: PortfolioData | null) => PortfolioData | null)) => {
    if (typeof newData === 'function') {
        memoryStore = newData(memoryStore);
    } else {
        memoryStore = newData;
    }
    setData(memoryStore);
  };

  const seedData = useCallback(async () => {
    setLoading(true);
    updateMemoryStore(initialData);
    setLoading(false);
  }, []);

  const updateProfile = useCallback(async (newProfile: Profile) => {
    updateMemoryStore(prevData => prevData ? { ...prevData, profile: newProfile } : null);
  }, []);
  
  const crudFunction = useCallback(<T extends { id?: string }>(collectionName: keyof PortfolioData) => {
    const addItem = async (newItem: Omit<T, 'id'>): Promise<T> => {
      const itemWithId = { ...newItem, id: new Date().toISOString() } as T;
      updateMemoryStore(prevData => {
        if (!prevData) return null;
        const currentItems = (prevData[collectionName] || []) as T[];
        let newItems;
        if (collectionName === 'contacts') {
          newItems = [itemWithId, ...currentItems];
        } else {
          newItems = [...currentItems, itemWithId];
        }
        return { ...prevData, [collectionName]: newItems };
      });
      return itemWithId;
    };

    const updateItem = async (updatedItem: T) => {
      if (!updatedItem.id) return;
      updateMemoryStore(prevData => {
        if (!prevData) return null;
        const newItems = ((prevData[collectionName] || []) as T[]).map(item => item.id === updatedItem.id ? updatedItem : item);
        return { ...prevData, [collectionName]: newItems };
      });
    };

    const deleteItem = async (id: string) => {
      if (!id) return;
      updateMemoryStore(prevData => {
        if (!prevData) return null;
        const newItems = ((prevData[collectionName] || []) as T[]).filter(item => item.id !== id);
        return { ...prevData, [collectionName]: newItems };
      });
    };

    return { addItem, updateItem, deleteItem };
  }, []);

  const value = {
    data,
    loading,
    seedData,
    updateProfile,
    education: crudFunction<Education>('education'),
    internships: crudFunction<Internship>('internships'),
    projects: crudFunction<Project>('projects'),
    ongoingProjects: crudFunction<Project>('ongoingProjects'),
    certifications: crudFunction<Certification>('certifications'),
    contacts: crudFunction<Contact>('contacts'),
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}
