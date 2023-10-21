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

const Dashboard: NextPage = ({}) => {
  const router = useRouter();
  
  const [realChats, setRealChats] = useState<Chat[]>([]);

  const chastRef = collection(db, "chats");

  const createNewChat = async () => {
    const newChat: Omit<Chat, "id"> = {
      messages: [],
      lastMessage: null,
      members: [users[0]],
      chatName: "Dalsi test",
      avatar: users[1].avatarUrl,
    };

    try {
      const docRef = await addDoc(chastRef, newChat);

      router.push(`/chat/${docRef.id}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleClick = () => {
    createNewChat();
  };

  useEffect(() => {
    const queryChats = query(
      collection(db, "chats"),
      where(documentId(), "in", [
        "9r2d6rvu8Kyt03wTml2D",
        "Y5y4lw5AjGHhLWuZzPnK",
      ])
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
  }, []);

  return (
    <>
      <DashboardHeader />

      <FavoriteContacts />
      
      <Chats chats={realChats} />

      <Button onClick={handleClick}>new</Button>
    </>
  );
};

export default Dashboard;
