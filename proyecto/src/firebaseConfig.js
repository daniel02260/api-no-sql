import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBWvj7D2Y66_GCi6TnigCz55YUMYci7tPc",
  authDomain: "pokemon-16f40.firebaseapp.com",
  projectId: "pokemon-16f40",
  storageBucket: "pokemon-16f40.firebasestorage.app",
  messagingSenderId: "3811096403",
  appId: "1:3811096403:web:4ec303fb9528257659d3a6",
  measurementId: "G-KLWYGZXG0W"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ ¡Esto es necesario!

export { auth, db };