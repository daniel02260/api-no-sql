import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBJPgHZWku_7Tg6tChD4ULXHi7UJKvwKF8",
  authDomain: "busquedas-fbi.firebaseapp.com",
  projectId: "busquedas-fbi",
  storageBucket: "busquedas-fbi.firebasestorage.app",
  messagingSenderId: "865092450522",
  appId: "1:865092450522:web:e07d998c5997d95ad48de3",
  measurementId: "G-G28BZ5XQ7L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ ¡Esto es necesario!

export { auth, db };