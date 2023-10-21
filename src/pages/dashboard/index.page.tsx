import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Chats } from "./components/chats";
import { users } from "@/mocks";
import { Button } from "@material-ui/core";
import { Chat } from "@/types";
import {
  FieldPath,
  addDoc,
  collection,
  documentId,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { DashboardHeader } from "./components/header";
import db from "@/utils/firebase";

import { FavoriteContacts } from "./components/favorite-contact";
import { useUserContext } from "@/components/user-context";

const Dashboard: NextPage = ({}) => {
  const router = useRouter();
  const { currentUser } = useUserContext();

  const [realChats, setRealChats] = useState<Chat[]>([]);

  useEffect(() => {
    console.log("currentUser?.chats", currentUser?.chats)
    if (!!currentUser?.chats.length) {
      const queryChats = query(
        collection(db, "chats"),
        where(documentId(), "in", currentUser?.chats ?? [""])
      );

      const unsubscribe = onSnapshot(queryChats, (querySnapshot) => {
        const chats: Chat[] = [];
        querySnapshot.forEach((doc) => {
          const x = {};

          chats.push({ id: doc.id, ...doc.data() } as Chat);
        });
        setRealChats(chats);
      });

      return unsubscribe;
    }
  }, [currentUser?.chats]);

  return (
    <>
      <DashboardHeader />

      <FavoriteContacts chats={realChats} />

      <Chats chats={realChats} />
    </>
  );
};

export default Dashboard;
