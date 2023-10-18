import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

import React from "react";
import { useContext } from "react";

const FirebaseContext = React.createContext<{db: Firestore} | null>(null);

export const useFirebaseContext = () => {
  const context = useContext(FirebaseContext);

  if (!context) {
    throw new Error(
      "FIREBASE_CONTEXT muse be used within  FIREBASE_CONTEXT Provider"
    );
  }

  return context;
};
type Props = {
  children: JSX.Element;
};

export const FirebaseContextProvider = ({ children }: Props) => {
  const firebaseConfig = {
    apiKey: "AIzaSyDtj6iqztI1iNR5A-e1EZZyo84RUBivxD8",
    authDomain: "crystallize-chat-by-pm.firebaseapp.com",
    projectId: "crystallize-chat-by-pm",
    storageBucket: "crystallize-chat-by-pm.appspot.com",
    messagingSenderId: "975271569866",
    appId: "1:975271569866:web:4f77ea3d2fa1a1c24f8733",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  return (
    // @ts-ignore
    <FirebaseContext.Provider value={{ db }}>
      {children}
    </FirebaseContext.Provider>
  );
};
