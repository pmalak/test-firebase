import { User } from "@/types";
import db from "@/utils/firebase";

import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useContext } from "react";

type Context = {
  currentUser: User | undefined;
  allUsers: User[] | undefined;
  setCurrenttUser: Dispatch<SetStateAction<User | undefined>>;
};

const UserContext = React.createContext<Context | null>(null);

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
  const { pathname, push } = useRouter();
  const [currentUser, setCurrenttUser] = useState<User | undefined>(undefined);
  const [allUsers, setAllUsers] = useState<User[]>();

  useEffect(() => {
    const getUsers = async () => {
      const q = collection(db, "users");

      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs;
      const data = docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      if (data) {
        setAllUsers(data as User[]);
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    if (currentUser?.id) {
      const queryUser = doc(db, "users", currentUser?.id);
      const unsubscribe = onSnapshot(queryUser, (querySnapshot) => {
        if (querySnapshot) {
          setCurrenttUser({
            id: currentUser?.id,
            ...querySnapshot.data(),
          } as User);
        }
      });

      return unsubscribe;
    }
  }, [currentUser?.id]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("currentUserID");

    if (!currentUser && allUsers && storedUserId && pathname !== "/") {
      const selectedUser = allUsers.find((user) => user.id === storedUserId)!;

      setCurrenttUser(selectedUser);
    }

    if (!currentUser && allUsers && !storedUserId && pathname !== "/") {
      push("/");
    }
  }, [currentUser, allUsers, pathname, push]);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        allUsers,
        setCurrenttUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
