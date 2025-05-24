import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBPK5YAIDycWKtvMkPzcqsBX5DNeruM94",
  authDomain: "easyshopper-ec880.firebaseapp.com",
  projectId: "easyshopper-ec880",
  storageBucket: "easyshopper-ec880.firebasestorage.app",
  messagingSenderId: "591991998649",
  appId: "1:591991998649:web:3dd243d4f950db6e93f368",
  measurementId: "G-MXWYZ5N81N",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

