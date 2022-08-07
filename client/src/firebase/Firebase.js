import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA03Lm9iEyxPVvxdO3FOFx_9IFFq0YGXWw",
  authDomain: "react-shop-9d51f.firebaseapp.com",
  projectId: "react-shop-9d51f",
  storageBucket: "react-shop-9d51f.appspot.com",
  messagingSenderId: "1013386132073",
  appId: "1:1013386132073:web:320272a70c28289e0700f8",
  measurementId: "G-6T82C96DX2",
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
