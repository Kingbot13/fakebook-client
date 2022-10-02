// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKxM3t6InarqvRbw4K44pG086MyEjava8",
  authDomain: "fakebook-6445f.firebaseapp.com",
  projectId: "fakebook-6445f",
  storageBucket: "fakebook-6445f.appspot.com",
  messagingSenderId: "13658216820",
  appId: "1:13658216820:web:2a012e80f930227fb1f421",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// connectFirestoreEmulator(db, "localhost", 8080);

export const auth = getAuth();
// connectAuthEmulator(auth, "http://localhost:9099");
export const provider = new GoogleAuthProvider();
