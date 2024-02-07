// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-9d6d5.firebaseapp.com",
  projectId: "mern-estate-9d6d5",
  storageBucket: "mern-estate-9d6d5.appspot.com",
  messagingSenderId: "655763421720",
  appId: "1:655763421720:web:4e6cf26ffa88277be5a16d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);