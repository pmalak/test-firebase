import { User } from "@/types";
import db from "@/utils/firebase";

import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useContext } from "react";

type Context = {
  currentUser: User | null;
  allUsers: User[];
  setCurrenttUser: Dispatch<SetStateAction<User | null>>;
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

  const [currentUser, setCurrenttUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
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
