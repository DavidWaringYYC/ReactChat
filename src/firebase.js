import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyASrnPzs9ZpSEx4ptmEBgyE8zMrspJdloE",
  authDomain: "chat-20f76.firebaseapp.com",
  projectId: "chat-20f76",
  storageBucket: "chat-20f76.appspot.com",
  messagingSenderId: "1089046117548",
  appId: "1:1089046117548:web:3ca26a6efb5b581cde3309"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();