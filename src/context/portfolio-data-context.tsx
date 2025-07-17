
'use client';
import { useState, useEffect, useCallback, createContext, ReactNode } from 'react';
import {
  collection,
  doc,
  getDocs,
  writeBatch,
  setDoc,
  deleteDoc,
  getDoc,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db, initializeDb } from '@/lib/firebase';
import type { PortfolioData, Profile, Education, Internship, Project, Certification, Contact } from '@/lib/types';
import { portfolioData as initialSeedData } from '@/lib/data';

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

const COLLECTION_NAMES = {
    profile: 'profile',
    education: 'education',
    internships: 'internships',
    projects: 'projects',
    ongoingProjects: 'ongoingProjects',
    certifications: 'certifications',
    contacts: 'contacts',
};

export function PortfolioDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    initializeDb();
    if (!db) {
      console.error("Firestore is not initialized.");
      setLoading(false);
      return;
    }

    try {
      const profileDoc = await getDoc(doc(db, COLLECTION_NAMES.profile, 'main'));
      if (!profileDoc.exists()) {
        setData(null);
        setLoading(false);
        return;
      }

      const collections = {
        education: getDocs(query(collection(db, COLLECTION_NAMES.education), orderBy('period', 'desc'))),
        internships: getDocs(query(collection(db, COLLECTION_NAMES.internships), orderBy('startDate', 'desc'))),
        projects: getDocs(query(collection(db, COLLECTION_NAMES.projects))),
        ongoingProjects: getDocs(query(collection(db, COLLECTION_NAMES.ongoingProjects))),
        certifications: getDocs(query(collection(db, COLLECTION_NAMES.certifications), orderBy('date', 'desc'))),
        contacts: getDocs(query(collection(db, COLLECTION_NAMES.contacts), orderBy('received', 'desc'))),
      };

      const [education, internships, projects, ongoingProjects, certifications, contacts] = await Promise.all(Object.values(collections));

      const loadedData: PortfolioData = {
        profile: profileDoc.data() as Profile,
        education: education.docs.map(d => ({ id: d.id, ...d.data() })) as Education[],
        internships: internships.docs.map(d => ({ id: d.id, ...d.data() })) as Internship[],
        projects: projects.docs.map(d => ({ id: d.id, ...d.data() })) as Project[],
        ongoingProjects: ongoingProjects.docs.map(d => ({ id: d.id, ...d.data() })) as Project[],
        certifications: certifications.docs.map(d => ({ id: d.id, ...d.data() })) as Certification[],
        contacts: contacts.docs.map(d => ({ id: d.id, ...d.data() })) as Contact[],
      };
      
      setData(loadedData);
    } catch (error) {
      console.error("Error loading portfolio data:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const seedData = useCallback(async () => {
    initializeDb();
    if (!db) return;
    setLoading(true);
    const batch = writeBatch(db);

    // Profile
    batch.set(doc(db, COLLECTION_NAMES.profile, 'main'), initialSeedData.profile);
    // Other collections
    Object.entries(initialSeedData).forEach(([key, value]) => {
        if (key !== 'profile' && Array.isArray(value)) {
            value.forEach(item => {
                const { id, ...data } = item;
                const docRef = doc(collection(db, key as keyof typeof COLLECTION_NAMES));
                batch.set(docRef, data);
            });
        }
    });

    await batch.commit();
    await loadData();
  }, [loadData]);

  const updateProfile = useCallback(async (newProfile: Profile) => {
    if (!db) return;
    await setDoc(doc(db, COLLECTION_NAMES.profile, 'main'), newProfile, { merge: true });
    await loadData();
  }, [loadData]);
  
  const crudFunction = useCallback(<T extends { id?: string }>(collectionName: keyof typeof COLLECTION_NAMES) => {
    const addItem = async (newItem: Omit<T, 'id'>): Promise<T> => {
      if (!db) throw new Error("DB not initialized");
      const docRef = doc(collection(db, collectionName));
      await setDoc(docRef, newItem);
      await loadData();
      return { id: docRef.id, ...newItem } as T;
    };

    const updateItem = async (updatedItem: T) => {
      if (!db || !updatedItem.id) return;
      const { id, ...itemData } = updatedItem;
      await setDoc(doc(db, collectionName, id), itemData, { merge: true });
      await loadData();
    };

    const deleteItem = async (id: string) => {
      if (!db || !id) return;
      await deleteDoc(doc(db, collectionName, id));
      await loadData();
    };

    return { addItem, updateItem, deleteItem };
  }, [loadData]);

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
