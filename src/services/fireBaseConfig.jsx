import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDcR3O-uRv2TVG4J6AGxi5pRM9qvc79lG8",
  authDomain: "wonder-wise-6ed9a.firebaseapp.com",
  projectId: "wonder-wise-6ed9a",
  storageBucket: "wonder-wise-6ed9a.appspot.com",
  messagingSenderId: "859354826913",
  appId: "1:859354826913:web:7c0c0c0c0c0c0c0c0c0c0c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);