import { User } from "@/types";
import db from "@/utils/firebase";
import { initializeApp } from "firebase/app";
import {
  Firestore,
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useContext } from "react";


type UseContext = {
  currentUser: User;
  contacts: User[];
  
}


type Context = {
  userContext: UseContext;
  setUserContext: Dispatch<SetStateAction<UseContext>>
}

const UserContext = React.createContext<Context
 | null>(null);

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserContext muse be used within  UserContext Provider");
  }

  return context;
};
type Props = {
  children: JSX.Element;
};

export const UserContextProvider = ({ children }: Props) => {
  const [userContext, setUserContext] = useState<UseContext>({} as UseContext);



  return (
    <UserContext.Provider
      value={{
        userContext,
        setUserContext,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
