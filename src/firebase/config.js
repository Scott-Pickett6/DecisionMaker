// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

if (!import.meta.env.VITE_FIREBASE_API_KEY) {
  throw new Error('Firebase API Key is not set in environment variables');
}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "decisionmaker-62de5.firebaseapp.com",
  databaseURL: "https://decisionmaker-62de5-default-rtdb.firebaseio.com",
  projectId: "decisionmaker-62de5",
  storageBucket: "decisionmaker-62de5.firebasestorage.app",
  messagingSenderId: "725855845072",
  appId: "1:725855845072:web:fb828d8cf4fa001d023cd5",
  measurementId: "G-E5RBM2KWVF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };

// Only initialize analytics if we're in a browser environment
if (typeof window !== 'undefined') {
  getAnalytics(app);
}