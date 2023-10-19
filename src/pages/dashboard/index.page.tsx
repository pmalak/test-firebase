import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Chats } from "./components/chats";
import { chatsMock, users } from "@/mocks";
import { Layout } from "@/components/layout";
import { Button, Typography } from "@material-ui/core";
import { Chat } from "@/types";
import { useFirebaseContext } from "@/components/firebase-context";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { useRouter } from "next/router";

const Dashboard: NextPage = ({}) => {
  const router = useRouter();

  const [realChats, setRealChats] = useState<Chat[]>([]);

  const { db } = useFirebaseContext();

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
    const queryChats = query(chastRef);
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
      <Typography variant="h4" gutterBottom>
        Header
      </Typography>

      <Chats chats={[...chatsMock, ...realChats]} />

      <Button onClick={handleClick}>new</Button>
    </>
  );
};

export default Dashboard;