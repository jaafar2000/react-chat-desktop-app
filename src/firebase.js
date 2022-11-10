import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage';
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: 'AIzaSyCszUo3EReWaFVOM5gx4_nmsSXbjpu9DZA',
  authDomain: "chatapp-38ec8.firebaseapp.com",
  projectId: "chatapp-38ec8",
  storageBucket: "chatapp-38ec8.appspot.com",
  messagingSenderId: "740108595863",
  appId: "1:740108595863:web:9d1942526e268fa0396fd2"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage  = getStorage();
export const db = getFirestore();