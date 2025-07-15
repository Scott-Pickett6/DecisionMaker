// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbrm2M5uyxNoZsZXRliLfPaseueMhZbT8",
  authDomain: "decisionmaker-62de5.firebaseapp.com",
  projectId: "decisionmaker-62de5",
  storageBucket: "decisionmaker-62de5.firebasestorage.app",
  messagingSenderId: "725855845072",
  appId: "1:725855845072:web:fb828d8cf4fa001d023cd5",
  measurementId: "G-E5RBM2KWVF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);