import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDL4V3p8d6mdX1MibHuRpmMUgM-rs4FhZw",
  authDomain: "ecommerce-41df9.firebaseapp.com",
  projectId: "ecommerce-41df9",
  storageBucket: "ecommerce-41df9.firebasestorage.app",
  messagingSenderId: "734381899161",
  appId: "1:734381899161:web:37638d7edbe1f8f4816708",
  measurementId: "G-WBFRW43SYL"
};

// Initialize Firebase (prevent multiple initializations)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Auth
export const auth = getAuth(app);

// 🔥 Google Sign-In Function
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};

export default app;
