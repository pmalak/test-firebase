import { chatsMock } from "@/mocks";

import { NextPage } from "next";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { Messages } from "./components/messages";
import styled from "styled-components";
import { Input } from "./components/input";
import { ChatHeader } from "./components/chat-header";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useFirebaseContext } from "@/components/firebase-context";
import { Chat } from "@/types";

const ChatPage: NextPage = ({}) => {
  const router = useRouter();
  const { chatId } = router.query;

  const chat = chatsMock.find((chat) => chat.id === chatId);
  const [realChat, setRealChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState(chat?.messages ?? []);

  const { db } = useFirebaseContext();

  const chastRef = collection(db, "chats");

  useEffect(() => {
    const queryChats = query(chastRef, where("id", "==", chatId));
    const unsubscribe = onSnapshot(queryChats, (querySnapshot) => {
      let chat: Chat = {} as Chat ;
      querySnapshot.forEach((doc) => {
        chat = { ...(doc.data() as Chat) };
      });

      setRealChat(chat);
      console.log("nalezen ", chat);
    });

    return unsubscribe;
  }, []);

  console.log("messages", messages);
  if (chat || realChat) {
    return (
      <Wrapper>
        {/* TODO: fix */}
        <ChatHeader chat={chat ?? realChat!} />
        <Messages messages={messages ?? realChat?.messages} />

        <Input setMessages={setMessages} />
      </Wrapper>
    );
  }

  return null;
};

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

export default ChatPage;
