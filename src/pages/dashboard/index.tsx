import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Chats } from "./components/chats";
import { chatsMock, users } from "@/mocks";
import { Layout } from "@/components/layout";
import { Button, Typography } from "@material-ui/core";
import { Chat } from "@/types";
import { useFirebaseContext } from "@/components/firebase-context";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";

const Dashboard: NextPage = ({}) => {
  const [realChats, setRealChats] = useState<Chat[]>([]);

  const { db } = useFirebaseContext();

  const chastRef = collection(db, "chats");

  const createNewChat = async () => {
    // if (newChatName && newChatMessages.length > 0) {
    // Create a new chat room
    const newChat: Chat = {
      id: `chat${new Date().getTime()}`,
      messages: [],
      lastMessage: null,
      members: [users[0]],
      chatName: "karl",
      avatar: users[0].avatarUrl,
    };

    try {
      const docRef = await addDoc(chastRef, newChat);
      console.log("Document written with ID: ", docRef.id);
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
        chats.push({...doc.data()});
      });
      setRealChats(chats);
      console.log("Current chats in CA: ", chats);
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
