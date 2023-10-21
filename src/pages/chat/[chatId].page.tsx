import { NextPage } from "next";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { Messages } from "./components/messages";
import styled from "styled-components";
import { Input } from "./components/input";
import { ChatHeader } from "./components/chat-header";
import { doc, onSnapshot } from "firebase/firestore";
import { Chat } from "@/types";
import db from "@/utils/firebase";

const ChatPage: NextPage = ({}) => {
  const router = useRouter();
  const { chatId } = router.query;

  const [realChat, setRealChat] = useState<Chat | null>(null);

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

  if (chatId && realChat) {
    return (
      <Wrapper>
        <ChatHeader chat={realChat} />
        <Messages messages={realChat?.messages ?? []} />

        <Input />
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
