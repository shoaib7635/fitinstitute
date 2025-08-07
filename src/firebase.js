import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCIy0_6BY7E9k_G_rVPI2sPuNdJCNjmv04",
  authDomain: "react-project-acdbb.firebaseapp.com",
  projectId: "react-project-acdbb",
  storageBucket: "react-project-acdbb.appspot.com",
  messagingSenderId: "160000136072",
  appId: "1:160000136072:web:0346a491c1ceb5cbc9e03d",
  measurementId: "G-9FGWME94J7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Export all required things
export { analytics, db, collection, addDoc, serverTimestamp, storage };
