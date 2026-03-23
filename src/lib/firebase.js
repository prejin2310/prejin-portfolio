import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbh8vn7jR4pT1aNp_fTCGGiRRuaxVhxdA",
  authDomain: "pr-prejin.firebaseapp.com",
  projectId: "pr-prejin",
  storageBucket: "pr-prejin.firebasestorage.app",
  messagingSenderId: "790229455226",
  appId: "1:790229455226:web:d41debb2ec3ea6cbb946c3",
  measurementId: "G-YTXR167EFQ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
