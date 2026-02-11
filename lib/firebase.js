import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  connectAuthEmulator,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';

// Firebase configuration - Check if env variables are provided
const firebaseConfig = process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
} : null;

let app = null;
let auth = null;

// Initialize Firebase only if config is available
if (firebaseConfig) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);

  // Enable persistence
  setPersistence(auth, browserLocalPersistence)
    .catch((error) => {
      console.error('Error setting persistence:', error);
    });

  // Use emulator in development (optional)
  if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true') {
    try {
      connectAuthEmulator(auth, 'http://localhost:9099');
    } catch (error) {
      // Emulator already connected
    }
  }
} else {
  console.warn('⚠️ Firebase environment variables not configured. App will not have authentication.');
}

export { app, auth };
export default app;
