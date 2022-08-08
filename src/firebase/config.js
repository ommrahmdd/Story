import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDSoE6ItzddbIjoAf-X4HzQvDHuQQnM6BI",
  authDomain: "podcast-6c9f1.firebaseapp.com",
  projectId: "podcast-6c9f1",
  storageBucket: "podcast-6c9f1.appspot.com",
  messagingSenderId: "573262900562",
  appId: "1:573262900562:web:b6cb0942d86dfb03b91e8b",
};

//Initialize firebase
export let app = initializeApp(firebaseConfig);
//db ref
export let db = getFirestore();

//auth ref
export let auth = getAuth();

export let storage = getStorage(app);
