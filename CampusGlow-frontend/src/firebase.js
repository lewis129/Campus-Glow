import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9sErMpogvy9D9jFKrNi03y3uqHdBGaCQ",
  authDomain: "campusglowproducts.firebaseapp.com",
  projectId: "campusglowproducts",
  storageBucket: "campusglowproducts.firebasestorage.app",
  messagingSenderId: "977606362100",
  appId: "1:977606362100:web:311d2170313830fae9afa1",
  measurementId: "G-EC50BBZ5S3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
