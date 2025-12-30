// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuovACOyhAj3tmb8tlDBMlL5lQ6K2IVzM",
  authDomain: "hanja-study-aa307.firebaseapp.com",
  projectId: "hanja-study-aa307",
  storageBucket: "hanja-study-aa307.firebasestorage.app",
  messagingSenderId: "193117440896",
  appId: "1:193117440896:web:f3ab22bb1be74b7c31cf65",
  measurementId: "G-JZPZNE1938"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);