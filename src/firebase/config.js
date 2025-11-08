// Import the functions you need from the SDKs you need// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {const firebaseConfig = {

  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

  authDomain: "decisionmaker-62de5.firebaseapp.com",  authDomain: "decisionmaker-62de5.firebaseapp.com",

  databaseURL: "https://decisionmaker-62de5-default-rtdb.firebaseio.com",  databaseURL: "https://decisionmaker-62de5-default-rtdb.firebaseio.com",

  projectId: "decisionmaker-62de5",  projectId: "decisionmaker-62de5",

  storageBucket: "decisionmaker-62de5.firebasestorage.app",  storageBucket: "decisionmaker-62de5.firebasestorage.app",

  messagingSenderId: "725855845072",  messagingSenderId: "725855845072",

  appId: "1:725855845072:web:fb828d8cf4fa001d023cd5",  appId: "1:725855845072:web:fb828d8cf4fa001d023cd5",

  measurementId: "G-E5RBM2KWVF"  measurementId: "G-E5RBM2KWVF"

};};



// Initialize Firebase// Initialize Firebase

const app = initializeApp(firebaseConfig);const app = initializeApp(firebaseConfig);

const db = getFirestore(app);const db = getFirestore(app);

export { db };export { db };

const analytics = getAnalytics(app);const analytics = getAnalytics(app);