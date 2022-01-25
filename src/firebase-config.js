import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDOXicoxWNDCiEy5BXeIGBfotlft3sNb7g",
    authDomain: "fir-crud-ada96.firebaseapp.com",
    projectId: "fir-crud-ada96",
    storageBucket: "fir-crud-ada96.appspot.com",
    messagingSenderId: "912245579934",
    appId: "1:912245579934:web:0f384d7df2894634f01b8f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();