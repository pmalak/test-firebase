import { chatsMock } from "@/mocks";

import { NextPage } from "next";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { Messages } from "./components/messages";
import styled from "styled-components";
import { Input } from "./components/input";
import { ChatHeader } from "./components/chat-header";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { useFirebaseContext } from "@/components/firebase-context";
import { Chat } from "@/types";

const ChatPage: NextPage = ({}) => {
  const router = useRouter();
  const { chatId } = router.query;


  const [realChat, setRealChat] = useState<Chat | null>(null);


  const { db } = useFirebaseContext();

  const chastRef = collection(db, "chats");

  useEffect(() => {
    if (chatId) {
      const queryChats = doc(db, "chats", chatId as string);
      const unsubscribe = onSnapshot(queryChats, (querySnapshot) => {
        if (querySnapshot) {
          setRealChat(querySnapshot.data() as Chat);
        }
      });

      return unsubscribe;
    }
  }, [chatId]);

  if (chatId &&  realChat) {
    return (
      <Wrapper>
        {/* TODO: fix */}
        <ChatHeader chat={realChat} />
        <Messages messages={realChat?.messages ?? []} />

        <Input  />
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
