
// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// These are placeholders for the initialized services
let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;

/**
 * Initializes the Firebase app and services.
 * This function is designed to be called on the client-side
 * to prevent server-side execution issues.
 */
export function initializeDb() {
  if (db) return db;

  // This check ensures we're on the client
  if (typeof window === "undefined") {
    return undefined;
  }
  
  // This check is crucial for deployment.
  if (!firebaseConfig.projectId) {
    throw new Error("Firebase project ID is not configured. Please set NEXT_PUBLIC_FIREBASE_PROJECT_ID in your environment variables. If deploying, add this to your hosting provider's settings.");
  }
  
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }

  db = getFirestore(app);
  storage = getStorage(app);
  return db;
}

// We export the uninitialized placeholders and the initializer function.
// The hooks will call initializeDb() to get the db/storage instances.
export { db, storage };
