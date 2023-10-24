import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: move env vars
const firebaseConfig = {
  apiKey: "AIzaSyDtj6iqztI1iNR5A-e1EZZyo84RUBivxD8",
  authDomain: "crystallize-chat-by-pm.firebaseapp.com",
  projectId: "crystallize-chat-by-pm",
  storageBucket: "crystallize-chat-by-pm.appspot.com",
  messagingSenderId: "975271569866",
  appId: "1:975271569866:web:4f77ea3d2fa1a1c24f8733",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
